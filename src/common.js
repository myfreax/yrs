// @flow
/**
 * Created by Freax on 16-11-22.
 * @Blog http://www.myfreax.com/
 */
import * as keys from './config/keys'
import Grid from 'term-grid'
import {writeFile} from 'fs'
import {exec} from 'child_process'
import appConfig from './config/app'



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
                return false;
            }
            resolve(stdout);
            return true;
        });
    }).catch((err) => {
        console.log(err.stack);
    });
};

export let registerFilter = (registries: Array<Object>,condition: any): Array<Object> => {
    let registry = registries.filter(value => {
        return condition(value);
    });
    return registry;
};

export let  writeFilePromise = (content: string, path: string = appConfig.savePath): Promise<*> =>   {
    return new Promise((resolve, reject) => {
        writeFile(path,`export default ${content}`,'utf8',(err,data) => {
            if (err){
                reject(err);
            }
            resolve(data);
        })
    }).catch( err => {
        console.log(err.stack);
    }).then(() =>{
        return true;
    })
};

export let trim = (str: string): string => {
    return str.toString().trim();
};