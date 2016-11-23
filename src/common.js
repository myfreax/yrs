/**
 * Created by Freax on 16-11-22.
 * @Blog http://www.myfreax.com/
 */
import * as keys from './config/keys'
import Grid from 'term-grid'
import {exec} from 'child_process'


export let drawGrid = registries => {
    const {NAME, HOME, REGISTRY} = keys;
    let registryArray = (registries || []).map((value) => {
        let temp = [];
        Object.keys(keys).forEach((key) => {
            temp.push(value[keys[key]] || '');
        });
        return temp;
    });
    new Grid([[NAME, REGISTRY, HOME]].concat(registryArray)).draw();
    return 0;
};

export let run = (command) => {
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

export let filterRegister = (condition)=>{
    //todo Filter by condition
};