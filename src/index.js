#!/usr/bin/env node
// @flow
/**
 * Created by Freax on 16-11-22.
 * @Blog http://www.myfreax.com/
 */

import registries from './config/registries'
import program from 'commander'
import {drawGrid, run, filterRegister, writeFilePromise} from './common'
import {NAME, HOME, REGISTRY} from './config/keys'
import tosource from 'tosource'


program
    .version('0.0.1');


program
    .command('current')
    .description('Show current registry name')
    .action(async() => {
        let registry = await  run('yarn config get registry');

        registry = registry.toString().replace(/\s/, '');

        if (registry === 'undefined' || !registry) {
            drawGrid();
        }

        let currentRegistries = filterRegister(registries, function (value) {
            return value.registry === registry;
        });

        drawGrid(currentRegistries);

        return true;
    });

program
    .command('ls')
    .description('List all the registries')
    .action(() => {
        drawGrid(registries);
    });


program
    .command('use <registryName>')
    .description('Change registry to registry')
    .action(async(env, options) => {

        let registry = filterRegister(registries, function (registry) {
            return registry.name.toString().trim() === env.toString().trim();
        });

        if (registry.length === 0) {
            console.info('--help');
            return true;
        }

        let result = await run(`yarn config set registry  ${registry[0][REGISTRY]}`);
        console.info(result);
        return true;
    });

program
    .command('add <registry> [registryName]')
    .description('Add one custom registry')
    .action(async(env, options) => {

        let registry = filterRegister(registries, function (registry) {
            return registry.name.toString().trim() === env.toString().trim();
        });

        options = options.toString().trim();

        if (!/^http|https:\/\/[a-z]+\.[a-z\d]+\.[a-z]+$/i.test(options)) {
            console.info(`incorrect registry ${options}`);
            return true;
        }


        if (registry.length !== 0) {
            console.info(`The registryName ${env} already exists`);
            return true;
        }

        let temp = {};
        temp[NAME] = env;
        temp[REGISTRY] = options;
        registries.push(temp);


        let result = await writeFilePromise('config/registries.js', tosource(registries));
        console.info(tosource(result));

        return true;
    });

program
    .command('del <registryName>')
    .description('Delete one custom registry')
    .action(async(env) => {

        console.info(registries);
        let registry = filterRegister(registries, function (registry) {
            return registry.name.toString().trim() === env.toString().trim();
        });

        if (registry.length  === 0){
            console.info(`The registryName ${env} is not exists`);
            return true;
        }

        registries.splice(registries.indexOf(registry[0],1));


        console.info(registries);

        let result = await writeFilePromise('config/registries.js', tosource(registries));

        console.info(tosource(result));
        console.info(tosource(result));

        return true;
    });


program.parse(process.argv);