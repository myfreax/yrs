// @flow
/**
 * Created by Freax on 16-11-24.
 * @Blog http://www.myfreax.com/
 */
import {drawGrid, run, registerFilter, writeFilePromise, trim,isUrl} from './unit'
import {NAME, HOME, REGISTRY} from './config/keys'
import api from './config/api'
let  registries = require('./registries.json');


export let current = async() => {

    let currentRegistry:string = await run(api.current);

    currentRegistry = trim(currentRegistry);

    if (!isUrl(currentRegistry)) {
        drawGrid();
    }

    let currentRegistries = registerFilter(registries, registry => {
        return trim(registry[REGISTRY]) === currentRegistry;
    });


    drawGrid(currentRegistries);

    return true;
};

export let ls = () => {
    drawGrid(registries);
};

export let use = async(registryName: string) => {
    let registry = registerFilter(registries, registry => {
        return trim(registry.name) === trim(registryName);
    });

    if (registry.length === 0) {
        console.info(`The registryName ${registryName} is not exists`);
        return true;
    }

    let message = await run(api.use + ` ${registry[0][REGISTRY]}`);
    console.log(message);

    return true;
};


export let add = async(registryName: string, url: string, home: string) => {

    let registry = registerFilter(registries, registry => {
        return trim(registry.name) === trim(registryName);
    });

    let urls = registerFilter(registries, registry => {
        return trim(registry[REGISTRY]) === trim(url);
    });


    if (!isUrl(url)) {
        console.info(`Incorrect registry ${url}`);
        return false;
    }

    if (urls.length !== 0) {
        console.info(`The registryUrl ${url} already exists`);
        return false;
    }

    if (registry.length !== 0) {
        console.info(`The registryName ${registryName} already exists`);
        return false;
    }

    let temp = {};
    temp[NAME] = registryName;
    temp[REGISTRY] = url;
    temp[HOME] = home;
    registries.push(temp);

    let result = await writeFilePromise(registries);
    if (result){
        ls();
        return true;
    }else{
        console.info('Failed to add registry');
        ls();
    }

    return true;
};

export let del = async(registryName: string) => {


    let registry = registerFilter(registries, registry => {
        return trim(registry.name) === trim(registryName);
    });

    if (registry.length === 0) {
        console.info(`The registryName ${registryName} is not exists`);
        return true;
    }

    let currentRegistry = await run(api.current);

    currentRegistry = trim(currentRegistry);

    let currentRegistries = registerFilter(registries, registry => {
        return trim(registry[REGISTRY]) === currentRegistry;
    });

    if (currentRegistries.length !== 0 && trim(currentRegistries[0][NAME]) === registryName) {
        console.log(`Registry(${currentRegistry}) is in use, switch other registry can be deleted`);
        return true;
    }

    registries.splice(registries.indexOf(registry[0], 1));

    let result = await writeFilePromise(registries);

    if (result){
        ls();
    }else{
        console.info('Failed to del registry!!');
    }

    return true;
};