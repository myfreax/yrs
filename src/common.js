/**
 * Created by Freax on 16-11-22.
 * @Blog http://www.myfreax.com/
 */
import * as keys from './config/keys'
import Grid from 'term-grid'
import terminalConfig from './config/terminal'



export let drawGrid  = registries => {
   let registryArray =  (registries || []).map((value) => {
        let temp = [];
        Object.keys(keys).forEach((key) => {
            temp.push(value[keys[key]] || '');
        });
        return temp;
    });
    new Grid(terminalConfig.concat(registryArray)).draw();
};

