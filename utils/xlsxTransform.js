import { readFile, writeFile, stat, readdir } from 'fs/promises';
import * as XLSX from 'xlsx';
import { join, extname, dirname } from 'path';

// const { readFile, writeFile, stat, readdir } = require('fs/promises');
// const XLSX = require('xlsx');
// const { join, extname, dirname } = require('path');

async function read(xlsxPath) {
    const xlsxFileBuffer = await readFile(xlsxPath);
    const xlsx = XLSX.read(xlsxFileBuffer, {type: 'buffer'});
    const sheets = xlsx.Sheets;
    const data = {};
    for(const sheetName in sheets) {
        const sheetRawData = sheets[sheetName];
        if(!sheetRawData['!ref']) break;
        data[sheetName] = XLSX.utils.sheet_to_json(sheetRawData);
    }
    return data;
}

async function write(sheets) {
    for(const sheetName in sheets) {
        const { dirname, data, source } = sheets[sheetName];
        const savePath = join(dirname, `${sheetName}.json`);
        console.info('[Transform] XLSX(', source.map(([p, s])=>`${p}:${s}`).join('\n\t\t  '), `) \n\t -> JSON( ${savePath} )`);
        await writeFile(
            savePath,
            JSON.stringify(data, null, 4),
        )
    }
}

function format(rawSheet, isArray, xlsxPath, rawSheetName) {
    const newSheet = isArray?[]:{};
    rawSheet.shift();
    for(const index in rawSheet) {
        const row = rawSheet[index];
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
        if(isArray) {
            newSheet.push(rowData);
            continue;
        }
        if(mainKey===undefined) {
            console.warn(`[WARN][No Main Key] ${xlsxPath}:${rawSheetName}`, parseInt(index)+3, rowData);
            continue;
        }
        if(newSheet[mainKey]) console.warn(`[WARN][Duplicate Key] ${mainKey} ${xlsxPath}:${rawSheetName}`, parseInt(index), '\n\t', JSON.stringify(newSheet[mainKey]), '\n\t', JSON.stringify(rowData));
        newSheet[mainKey] = rowData;
    }
    return newSheet;
}

function merge(original, rawData, isMerge, isArray, xlsxPath, rawSheetName) {
    if(!original)
        return {
            isMerge,
            isArray,
            source: [[xlsxPath, rawSheetName]],
            data: format(rawData, isArray, xlsxPath, rawSheetName)
        };


    if(!isMerge) {
        if(original) {
            console.warn(`[WARN][Sheet Duplicate] ${xlsxPath}:${rawSheetName}\n\t\t${original.source[0][0]}:${original.source[0][1]}`)
            return original;
        }
    }

    if(!original.isMerge) {
        console.warn(`[WARN][Sheet Duplicate] ${xlsxPath}:${rawSheetName}\n\t\t${original.source[0][0]}:${original.source[0][1]}`)
        return original;
    }

    if(original.isArray != isArray) {
        console.warn(`[WARN][Sheet Format not pair] ${xlsxPath}:${rawSheetName}\n\t\t${original.source[0][0]}:${original.source[0][1]}`)
        return original;
    }

    const formatData = format(rawData, isArray, xlsxPath, rawSheetName);

    original.source.push([xlsxPath, rawSheetName]);

    if(isArray) {
        original.data = original.data.concat(formatData)
    } else {
        for(const key in formatData) {
            if(original.data[key]) {
                console.warn(`[WARN][Duplicate key] ${key} ${xlsxPath}:${rawSheetName} ${JSON.stringify(formatData[key])}\n\t\t${original.source[0][0]}:${original.source[0][1]} ${JSON.stringify(original.data[key])}`);
                continue;
            }
            original.data[key] = formatData[key];
        }
    }

    return original;
}

function transform(rawSheets) {
    const sheets = {};
    for(const xlsxPath in rawSheets) {
        const {dirname: d, data: rawSheetsData} = rawSheets[xlsxPath];
        for(const rawSheetName in rawSheetsData) {
            const rawData = rawSheetsData[rawSheetName];
            if(rawSheetName[0] === "#") continue;
            let sheetName = rawSheetName;
            const isArray = rawSheetName.substr(-5) === "<arr>";
            if(isArray) sheetName = sheetName.substring(0, sheetName.length - 5);
            const isMerge = rawSheetName[0] === ">";
            if(isMerge) sheetName = sheetName.substr(1);
            sheets[sheetName] = merge(
                sheets[sheetName],
                rawData,
                isMerge,
                isArray,
                xlsxPath,
                rawSheetName
            );
            sheets[sheetName].dirname = d;
        }
    }

    return sheets;
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
    const sheets = {};
    for(const p of xlsxs) {
        const data = await read(p);
        const d = dirname(p);
        sheets[p] = {
            dirname: d,
            data
        };
    }
    await write(
        transform(sheets)
    );
    console.info(`
------------------------
|  Transform Complete  |
------------------------
`);
    setTimeout(()=>{}, 1000);
}

main();