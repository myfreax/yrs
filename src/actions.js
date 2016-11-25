// @flow
/**
 * Created by Freax on 16-11-24.
 * @Blog http://www.myfreax.com/
 */
import {drawGrid, run, registerFilter, setCustomRegistry, getCustomRegistries, trim, isUrl, printMsg} from './unit'
import {NAME, HOME, REGISTRY} from './config/keys'
import api from './config/api'
import {findIndex} from 'lodash'


export let current = async() => {

    let currentRegistry: string = await run(api.current);

    currentRegistry = trim(currentRegistry);

    if (!isUrl(currentRegistry)) {
        drawGrid();
    }

    let currentRegistries: Array<Object> = await registerFilter(registry => {
        return trim(registry[REGISTRY]) === currentRegistry;
    });

    drawGrid(currentRegistries);

    return true;
};

export let ls = async() => {
    let registries: Array<Object> = await registerFilter(() => true);
    drawGrid(registries);
};

export let use = async(registryName: string) => {

    let registry: Array<Object> = await registerFilter(registry => {
        return trim(registry.name) === trim(registryName);
    });

    if (registry.length === 0) {
        printMsg(`The registryName <${registryName}> is not exists`);
        return true;
    }

    let message = await run(api.use + ` ${registry[0][REGISTRY]}`);
    console.log(message);
    return true;
};


export let add = async(registryName: string, url: string, home: string) => {

    let customRegistries: Array<Object> = await getCustomRegistries();

    let registry: Array<Object> = await registerFilter(registry => {
        return trim(registry.name) === trim(registryName);
    });

    let urls: Array<Object> = await registerFilter(registry => {
        return trim(registry[REGISTRY]) === trim(url);
    });


    if (!isUrl(url)) {
        printMsg(`Incorrect registry <${url}>`);
        return false;
    }

    if (urls.length !== 0) {
        printMsg(`The registryUrl <${url}> already exists`);
        return false;
    }

    if (registry.length !== 0) {
        printMsg(`The registryName <${registryName}> already exists`);
        return false;
    }

    let temp = {};temp[NAME] = registryName;temp[REGISTRY] = url;temp[HOME] = home;customRegistries.unshift(temp);

    let result: boolean = await setCustomRegistry(customRegistries);

    if (result) {
        printMsg(`Add registry <${registryName}> success`);
        return true;
    } else {
        printMsg(`Add registry <${registryName}> failed`);
    }

    return true;
};

export let del = async(registryName: string) => {

    registryName = trim(registryName);

    let customRegistries: Array<Object> = await getCustomRegistries();

    let registry: Array<Object> = customRegistries.filter((registry)=>{
        return trim(registry.name) === registryName;
    });


    if (registry.length === 0) {
        printMsg(`The registryName <${registryName}> is not exists`);
        return true;
    }

    let currentRegistry: string = await run(api.current);

    currentRegistry = trim(currentRegistry);

    let currentRegistries: Array<Object> = await registerFilter(registry => {
        return trim(registry[REGISTRY]) === currentRegistry;
    });

    if (currentRegistries.length !== 0 && trim(currentRegistries[0][NAME]) === registryName) {
        printMsg(`Registry <${currentRegistry}> is in use, switch other registry can be deleted`);
        return true;
    }

    customRegistries.splice(findIndex(customRegistries, registry =>  { return registry[NAME] == registryName}), 1);

    let result: boolean = await setCustomRegistry(customRegistries);

    if (result) {
        printMsg(`Delete registry <${registryName}> success`);
    } else {
        printMsg(`Delete registry <${registryName}> failed`);
    }

    return true;
};