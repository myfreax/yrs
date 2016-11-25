'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isUrl = exports.registryFilter = exports.getCustomRegistries = exports.setCustomRegistry = exports.run = exports.drawGrid = exports.printMsg = exports.trim = undefined;

var _asyncToGenerator2;

function _load_asyncToGenerator() {
    return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

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

var _userHome;

function _load_userHome() {
    return _userHome = _interopRequireDefault(require('user-home'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Freax on 16-11-22.
 * @Blog http://www.myfreax.com/
 */
const registries = require('./registries.json');
const savePath = (0, (_path || _load_path()).join)((_userHome || _load_userHome()).default, '.yrs.json');

function isDebug() {
    return process.env.YRS === 'dev';
}

let trim = exports.trim = str => {
    return String(str).trim();
};

let printMsg = exports.printMsg = msg => {
    console.log(`\n\r ${ trim(msg) } \n\r `);
};

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
            throw new Error(error.stack);
        }
        return '';
    });
};

let setCustomRegistry = exports.setCustomRegistry = function setCustomRegistry(content) {
    let path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : savePath;

    return new Promise((resolve, reject) => {
        (0, (_fs || _load_fs()).writeFile)(path, JSON.stringify(content), 'utf8', (error, data) => {
            if (error) {
                reject(error);
                return undefined;
            }
            resolve(data);
        });
    }).then(() => {
        return true;
    }).catch(error => {
        if (isDebug()) {
            throw new Error(error.stack);
        }
        return false;
    });
};

let getCustomRegistries = exports.getCustomRegistries = function getCustomRegistries() {
    let path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : savePath;

    return new Promise((resolve, reject) => {
        (0, (_fs || _load_fs()).readFile)(path, 'utf8', (error, data) => {
            if (error) {
                return reject(error);
            }
            try {
                resolve(JSON.parse(data));
            } catch (e) {
                resolve([]);
                if (isDebug()) {
                    throw new Error(e.stack);
                }
            }
        });
    }).catch(error => {
        if (isDebug()) {
            throw new Error(error.stack);
        }
        return [];
    });
};

let registryFilter = exports.registryFilter = (() => {
    var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* (condition) {
        let customRegistries = yield getCustomRegistries();
        return customRegistries.concat(registries).filter(function (value) {
            return condition(value);
        });
    });

    return function registryFilter(_x4) {
        return _ref.apply(this, arguments);
    };
})();

let isUrl = exports.isUrl = str => {
    return (/^http|https:\/\/[a-z]+\.[a-z\d]+\.[a-z]+$/i.test(trim(str))
    );
};