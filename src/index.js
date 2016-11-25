#!/usr/bin/env node
// @flow
/**
 * Created by Freax on 16-11-22.
 * @Blog http://www.myfreax.com/
 */

import program from 'commander'
import {ls,current,add,use,del} from './actions'
import {printMsg}from './unit'
const  pkg = require('./package.json');


program
    .version(pkg.version);

program
    .command('current')
    .description('Show current registry name')
    .action(current);

program
    .command('ls')
    .description('List all the registries')
    .action(ls);


program
    .command('use <registryName>')
    .description('Change registry to registry')
    .action(use);

program
    .command('add <registryName> <url> [home]')
    .description('Add one custom registry')
    .action(add);

program
    .command('del <registryName>')
    .description('Delete one custom registry')
    .action(del);

program
    .command('*')
    .action(function(command){
       printMsg(`Error: command ${command} not found`);
    });


program.parse(process.argv);

if (process.argv.length === 2) {
    program.outputHelp();
}
