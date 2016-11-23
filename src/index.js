#!/usr/bin/env node
/**
 * Created by Freax on 16-11-22.
 * @Blog http://www.myfreax.com/
 */


import registries from './config/registryies'
import program from 'commander'
import {drawGrid,run} from './common'


program
    .version('0.0.1');


program
    .command('current')
    .description('Show current registry name')
    .action(async() => {
        let currentRegistry = await  run('yarn config get registry');
        currentRegistry = currentRegistry.toString().replace(/\s/, '');

        if (currentRegistry === 'undefined' || !currentRegistry) {
            return new Grid(terminalConfig).draw();
        }

        let currentRegistries = (registries || []).filter(value => {
            return value.registry === currentRegistry;
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
    .action(async(env, options)=> {
        //设置
        let result = await run(`yarn config set registry  https://registry.npmjs.org`);

    });

program
    .command('add <registry> [registryName]')
    .description('Add one custom registry')
    .action((env, options)=> {
        //添加
        console.info(env, options);

    });

program
    .command('del <registry> [registryName]')
    .description('Delete one custom registry')
    .action((env, options)=> {
        //删除

    });


program.parse(process.argv);