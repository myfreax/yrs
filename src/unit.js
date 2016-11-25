// @flow
/**
 * Created by Freax on 16-11-22.
 * @Blog http://www.myfreax.com/
 */
import * as keys from './config/keys'
import Grid from 'term-grid'
import {writeFile, readFile} from 'fs'
import {exec} from 'child_process'
import {join} from 'path'
import userHome from 'user-home'

const registries = require('./registries.json');
const savePath = join(userHome, '.yrs.json');


function isDebug() {
    return process.env.YRS === 'dev';
}

export let trim = (str: string): string => {
    return String(str).trim();
};

export let printMsg = (msg: string) => {
    console.log(`\n\r ${trim(msg)} \n\r `);
};

export let drawGrid = (registries: Array<*> = []): boolean => {
    const {NAME, HOME, REGISTRY} = keys;
    let registryArray = registries.map((value: Object) => {
        let temp = [];
        Object.keys(keys).forEach((key) => {
            temp.push(value[keys[key]] || '');
        });
        return temp;
    });
    new Grid([[NAME, REGISTRY, HOME]].concat(registryArray)).draw();
    return true;
};

export let run = (command: string): Promise<*> => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                reject(error);
                return '';
            }
            resolve(stdout);
            return '';
        });
    }).catch((error) => {
        if (isDebug()) {
            throw new Error(error.stack);
        }
        return '';
    });
};


export let setCustomRegistry = (content: Array<Object>, path: string = savePath): Promise<*> => {
    return new Promise((resolve, reject) => {
        writeFile(path, JSON.stringify(content), 'utf8', (error, data) => {
            if (error) {
                reject(error);
                return undefined;
            }
            resolve(data);
        })
    }).then(() => {
        return true;
    }).catch((error) => {
        if (isDebug()) {
            throw new Error(error.stack);
        }
        return false;
    });
};

export let getCustomRegistries = (path: string = savePath): Promise<*> => {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf8', (error, data) => {
            if (error) {
                return reject(error);
            }
            try {
                resolve(JSON.parse(data));
            } catch (e) {
                resolve([]);
                if (isDebug()) {
                    throw new Error(e.stack);
                }
            }
        })
    }).catch((error) => {
        if (isDebug()) {
            throw new Error(error.stack);
        }
        return [];
    });
};

export let registryFilter = async(condition: any) => {
    let customRegistries: Array<Object> = await getCustomRegistries();
    return customRegistries.concat(registries).filter(value => {
        return condition(value);
    });
};

export let isUrl = (str: string): boolean => {
    return /^http|https:\/\/[a-z]+\.[a-z\d]+\.[a-z]+$/i.test(trim(str));
};