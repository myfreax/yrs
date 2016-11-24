// @flow
/**
 * Created by Freax on 16-11-24.
 * @Blog http://www.myfreax.com/
 */
import {drawGrid, run, registerFilter, writeFilePromise, trim, getRegistries} from './unit'
import {NAME, HOME, REGISTRY} from './config/keys'
import api from './config/api'

let  registries = require('./registries.json');



export let current = async() => {

    let currentRegistry: string = await run(api.current);

    currentRegistry = trim(currentRegistry);

    if (currentRegistry === 'undefined' || !currentRegistry) {
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


    if (!/^http|https:\/\/[a-z]+\.[a-z\d]+\.[a-z]+$/i.test(url)) {
        console.info(`Incorrect registry ${url}`);
        return true;
    }

    if (urls.length !== 0) {
        console.info(`The registryUrl ${url} already exists`);
        return true;
    }

    if (registry.length !== 0) {
        console.info(`The registryName ${registryName} already exists`);
        return true;
    }

    let temp = {};
    temp[NAME] = registryName;
    temp[REGISTRY] = url;
    temp[HOME] = home;
    registries.push(temp);

    await writeFilePromise(registries);

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

    await writeFilePromise(registries);

    return true;
};