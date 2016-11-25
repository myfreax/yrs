// @flow
/**
 * Created by Freax on 16-11-22.
 * @Blog http://www.myfreax.com/
 */
import * as keys from './config/keys'
import Grid from 'term-grid'
import {writeFile,readFileSync} from 'fs'
import {exec} from 'child_process'
import {join} from 'path'

const savePath = join(__dirname,'registries.json');

function isDebug() {
    return process.env.YRS === 'dev';
}

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

export let run = (command: string): Promise<*> =>  {
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
       if (isDebug()){
           console.log(error.stack);
           return '';
       }
       return '';
    });
};

export let registerFilter = (registries: Array<Object>,condition: any): Array<Object> => {
    return registries.filter(value => {
        return condition(value);
    });
};

export let  writeFilePromise = (content: Array<Object>, path: string = savePath): Promise<*> =>   {
    return new Promise((resolve, reject) => {
        writeFile(path,JSON.stringify(content),'utf8',(error,data) => {
            if (error){
                reject(error);
            }
            resolve(data);
        })
    }).catch((error) => {
        if (isDebug()){
            console.log(error.stack);
            return false;
        }
        return false;
    }).then(() =>{
        return true;
    });
};

export let trim = (str: string): string => {
    return str.toString().trim();
};

export let isUrl = (str: string): boolean => {
    return /^http|https:\/\/[a-z]+\.[a-z\d]+\.[a-z]+$/i.test(trim(str));
};