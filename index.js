#!/usr/bin/env node
'use strict';

var _commander;

function _load_commander() {
    return _commander = _interopRequireDefault(require('commander'));
}

var _actions;

function _load_actions() {
    return _actions = require('./actions');
}

var _unit;

function _load_unit() {
    return _unit = require('./unit');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pkg = require('./package.json');
/**
 * Created by Freax on 16-11-22.
 * @Blog http://www.myfreax.com/
 */

(_commander || _load_commander()).default.version(pkg.version);

(_commander || _load_commander()).default.command('current').description('Show current registry name').action((_actions || _load_actions()).current);

(_commander || _load_commander()).default.command('ls').description('List all the registries').action((_actions || _load_actions()).ls);

(_commander || _load_commander()).default.command('use <registryName>').description('Change registry to registry').action((_actions || _load_actions()).use);

(_commander || _load_commander()).default.command('add <registryName> <url> [home]').description('Add one custom registry').action((_actions || _load_actions()).add);

(_commander || _load_commander()).default.command('del <registryName>').description('Delete one custom registry').action((_actions || _load_actions()).del);

(_commander || _load_commander()).default.command('*').action(function (command) {
    (0, (_unit || _load_unit()).printMsg)(`Error: command ${ command } not found`);
});

(_commander || _load_commander()).default.parse(process.argv);

if (process.argv.length === 2) {
    (_commander || _load_commander()).default.outputHelp();
}