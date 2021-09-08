import { readFile } from 'fs/promises';
import Life from '../src/life.js'

global.json = async fileName => JSON.parse(await readFile(`data/${fileName}.json`));

async function debug() {

    const life = new Life();
    await life.initial();

    life.restart({
        CHR: 2000,                     // 颜值 charm CHR
        INT: 2000,                     // 智力 intelligence INT
        STR: 2000,                     // 体质 strength STR
        MNY: 2000,                     // 家境 money MNY
        SPR: 2000,                     // 快乐 spirit SPR
        AGE: 100,
        TLT: [1134, 1048, 1009],    // 天赋 talent TLT
    });
    const lifeTrajectory = [];
    let trajectory;
    do{
        try{
            trajectory = life.next();
        } catch(e) {
            console.error(e);
            // debugger
            throw e;
        }
        lifeTrajectory.push(lifeTrajectory);
        const { age, content } = trajectory;
        console.debug(
            `---------------------------------`,
            `\n-- ${age} 岁\n   `,
            content.map(
                ({type, description, rate, name, postEvent}) => {
                    switch(type) {
                        case 'TLT':
                            return `天赋【${name}】发动：${description}`;
                        case 'EVT':
                            return description + (postEvent?`\n    ${postEvent}`:'');
                    }
                }
            ).join('\n    ')
        );
        if(age == 99) debugger
    } while(!trajectory.isEnd)
    // debugger;
}

debug();