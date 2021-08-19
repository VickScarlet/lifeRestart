import { readFile, writeFile, stat, readdir } from 'fs/promises';
import * as XLSX from 'xlsx';
import { join, extname, dirname } from 'path';

// const { readFile, writeFile, stat, readdir } = require('fs/promises');
// const XLSX = require('xlsx');
// const { join, extname, dirname } = require('path');

async function transform(filePath) {
    const xlsxFileBuffer = await readFile(filePath);
    const xlsx = XLSX.read(xlsxFileBuffer, {type: 'buffer'});
    const sheets = xlsx.Sheets;

    const data = {};
    for(const sheetName in sheets) {
        const sheetRawData = sheets[sheetName];
        if(!sheetRawData['!ref']) break;
        const rawData = XLSX.utils.sheet_to_json(sheetRawData);
        const newData = {};
        data[sheetName] = newData;
        rawData.shift();
        for(const row of rawData) {
            const rowData = {};
            let mainKey;
            for(let key in row) {
                const cell = row[key];
                if(key[0] == "$") {
                    key = key.substr(1);
                    mainKey = cell;
                }
                if(key.includes(':')) {
                    const keys = key.split(':');
                    const lastKey = keys.pop();
                    let temp = rowData;
                    for(const subKey of keys) {
                        if(!temp[subKey]) temp[subKey] = {};
                        temp = temp[subKey];
                    }
                    if(lastKey.includes('[]')) {
                        const aKey = lastKey.split('[]')[0];
                        if(!temp[aKey]) temp[aKey] = [cell];
                        else temp[aKey].push(cell);
                    } else {
                        temp[lastKey] = cell;
                    }
                } else if(key.includes('[]')) {
                    const aKey = key.split('[]')[0];
                    if(!rowData[aKey]) rowData[aKey] = [cell];
                    else rowData[aKey].push(cell);
                } else {
                    rowData[key] = cell;
                }
            }
            if(mainKey===undefined) return console.error('No Main Key', rowData);
            newData[mainKey] = rowData;
        }
    }
    return data;
}

async function walk(filePath) {
    const xlsxPaths = [];
    if(Array.isArray(filePath)) {
        for(const subPath of filePath)
            xlsxPaths.push(await walk(subPath));
        return xlsxPaths.flat();
    }
    const fileStat = await stat(filePath);
    if(!fileStat.isDirectory()) {
        const ext = extname(filePath);
        if( ext=='.xls' || ext=='.xlsx' ) xlsxPaths.push(filePath);
        return xlsxPaths;
    }

    const dirData = await readdir(filePath);
    for(const subPath of dirData)
        xlsxPaths.push(await walk(join(filePath, subPath)));
    return xlsxPaths.flat();
}

async function main() {
    const filePaths = process.argv.slice(2);
    if(filePaths.length<0) process.exit(0);
    const xlsxs = await walk(filePaths);
    for(const p of xlsxs) {
        const data = await transform(p);
        const d = dirname(p);
        for(const sheetName in data) {
            const savePath = join(d, `${sheetName}.json`);
            console.info(`[Transform] XLSX(${p}:${sheetName}) -> JSON(${savePath})`);
            await writeFile(
                savePath,
                JSON.stringify(data[sheetName], null, 4),
            );
        }
    }
    console.info(`
------------------------
|  Transform Complete  |
------------------------
`);
    setTimeout(()=>{}, 1000);
}

main();