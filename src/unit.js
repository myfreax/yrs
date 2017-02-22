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

/**
 * 调试条件
 * @returns {boolean}
 */
function isDebug() {
    return process.env.YRS === 'dev';
}

/**
 * 删除左右的空格
 * @param str
 * @returns {string}
 */
export let trim = (str: string): string => {
    return String(str).trim();
};

/**
 * 打印消息
 * @param msg
 */
export let printMsg = (msg: string) => {
    console.log(`\n\r ${trim(msg)} \n\r `);
};

/**
 * 格式化输出
 * @param registries
 * @returns {boolean}
 */
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

/**
 * 运行命令
 * @param command
 * @returns {Promise.<T>}
 */
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

/**
 * 设置自定义Registry
 * @param content
 * @param path
 * @returns {Promise.<TResult>}
 */
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
/**
 * 获取自定义Registries
 * @param path
 * @returns {Promise.<T>}
 */
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

/**
 * Registry 过滤器
 * @param condition
 * @param all
 * @returns {Promise.<Array.<Object>>}
 */
export let registryFilter = async(condition: any, all: boolean = true) => {

    let customRegistries: Array<Object> = [];

    customRegistries = await getCustomRegistries();


    if (all) {
        customRegistries = customRegistries.concat(registries);
    }

    return customRegistries.filter(value => {
        return condition(value);
    });

};

/**
 * 测试URL
 * @param str
 * @returns {boolean}
 */
export let isUrl = (str: string): boolean => {
    return /^http|https:\/\/[a-z]+\.[a-z\d]+\.[a-z]+$/i.test(trim(str));
};