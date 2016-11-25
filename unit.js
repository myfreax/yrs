'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isUrl = exports.trim = exports.writeFilePromise = exports.registerFilter = exports.run = exports.drawGrid = undefined;

var _keys;

function _load_keys() {
    return _keys = _interopRequireWildcard(require('./config/keys'));
}

var _termGrid;

function _load_termGrid() {
    return _termGrid = _interopRequireDefault(require('term-grid'));
}

var _fs;

function _load_fs() {
    return _fs = require('fs');
}

var _child_process;

function _load_child_process() {
    return _child_process = require('child_process');
}

var _path;

function _load_path() {
    return _path = require('path');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const savePath = (0, (_path || _load_path()).join)(__dirname, 'registries.json');
/**
 * Created by Freax on 16-11-22.
 * @Blog http://www.myfreax.com/
 */


function isDebug() {
    return process.env.YRS === 'dev';
}

let drawGrid = exports.drawGrid = function drawGrid() {
    let registries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    const NAME = (_keys || _load_keys()).NAME,
          HOME = (_keys || _load_keys()).HOME,
          REGISTRY = (_keys || _load_keys()).REGISTRY;

    let registryArray = registries.map(value => {
        let temp = [];
        Object.keys(_keys || _load_keys()).forEach(key => {
            temp.push(value[(_keys || _load_keys())[key]] || '');
        });
        return temp;
    });
    new (_termGrid || _load_termGrid()).default([[NAME, REGISTRY, HOME]].concat(registryArray)).draw();
    return true;
};

let run = exports.run = command => {
    return new Promise((resolve, reject) => {
        (0, (_child_process || _load_child_process()).exec)(command, (error, stdout) => {
            if (error) {
                reject(error);
                return '';
            }
            resolve(stdout);
            return '';
        });
    }).catch(error => {
        if (isDebug()) {
            console.log(error.stack);
            return '';
        }
        return '';
    });
};

let registerFilter = exports.registerFilter = (registries, condition) => {
    return registries.filter(value => {
        return condition(value);
    });
};

let writeFilePromise = exports.writeFilePromise = function writeFilePromise(content) {
    let path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : savePath;

    return new Promise((resolve, reject) => {
        (0, (_fs || _load_fs()).writeFile)(path, JSON.stringify(content), 'utf8', (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    }).catch(error => {
        if (isDebug()) {
            console.log(error.stack);
            return false;
        }
        return false;
    }).then(() => {
        return true;
    });
};

let trim = exports.trim = str => {
    return str.toString().trim();
};

let isUrl = exports.isUrl = str => {
    return (/^http|https:\/\/[a-z]+\.[a-z\d]+\.[a-z]+$/i.test(trim(str))
    );
};