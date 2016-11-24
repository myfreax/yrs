#!/usr/bin/env node
// @flow
/**
 * Created by Freax on 16-11-22.
 * @Blog http://www.myfreax.com/
 */

import registries from './config/registries'
import program from 'commander'
import {drawGrid, run, registerFilter, writeFilePromise, trim} from './common'
import {NAME, HOME, REGISTRY} from './config/keys'
import toSource from 'tosource'


program
    .version('0.0.1');


program
    .command('current')
    .description('Show current registry name')
    .action(async() => {

        let currentRegistry = await run('yarn config get registry');

        currentRegistry = trim(currentRegistry);

        if (currentRegistry === 'undefined' || !currentRegistry) {
            drawGrid();
        }

        let currentRegistries = registerFilter(registries, registry => {
            return trim(registry[REGISTRY]) === currentRegistry;
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

        let registry = registerFilter(registries, registry => {
            return trim(registry.name) === trim(env);
        });

        if (registry.length === 0) {
            console.info('--help');
            return true;
        }

        await run(`yarn config set registry  ${registry[0][REGISTRY]}`);

        return true;
    });

program
    .command('add <registry> [registryName]')
    .description('Add one custom registry')
    .action(async(env, options) => {

        let registry = registerFilter(registries, registry => {
            return trim(registry.name) === trim(env);
        });

        options = trim(options);

        if (!/^http|https:\/\/[a-z]+\.[a-z\d]+\.[a-z]+$/i.test(options)) {
            console.info(`Incorrect registry ${options}`);
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

        await writeFilePromise(toSource(registries));

        return true;
    });

program
    .command('del <registryName>')
    .description('Delete one custom registry')
    .action(async(env) => {

        let registry = registerFilter(registries, registry => {
            return trim(registry.name) === trim(env);
        });

        if (registry.length === 0) {
            console.info(`The registryName ${env} is not exists`);
            return true;
        }

        registries.splice(registries.indexOf(registry[0], 1));

        await writeFilePromise(toSource(registries));

        return true;
    });


program.parse(process.argv);