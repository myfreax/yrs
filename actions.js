'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.del = exports.add = exports.use = exports.ls = exports.current = undefined;

var _asyncToGenerator2;

function _load_asyncToGenerator() {
    return _asyncToGenerator2 = _interopRequireDefault(require('babel-runtime/helpers/asyncToGenerator'));
}

var _unit;

function _load_unit() {
    return _unit = require('./unit');
}

var _keys;

function _load_keys() {
    return _keys = require('./config/keys');
}

var _api;

function _load_api() {
    return _api = _interopRequireDefault(require('./config/api'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let registries = require('./registries.json');
/**
 * Created by Freax on 16-11-24.
 * @Blog http://www.myfreax.com/
 */
let current = exports.current = (() => {
    var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* () {

        let currentRegistry = yield (0, (_unit || _load_unit()).run)((_api || _load_api()).default.current);

        currentRegistry = (0, (_unit || _load_unit()).trim)(currentRegistry);

        if (!(0, (_unit || _load_unit()).isUrl)(currentRegistry)) {
            (0, (_unit || _load_unit()).drawGrid)();
        }

        let currentRegistries = (0, (_unit || _load_unit()).registerFilter)(registries, function (registry) {
            return (0, (_unit || _load_unit()).trim)(registry[(_keys || _load_keys()).REGISTRY]) === currentRegistry;
        });

        (0, (_unit || _load_unit()).drawGrid)(currentRegistries);

        return true;
    });

    return function current() {
        return _ref.apply(this, arguments);
    };
})();

let ls = exports.ls = () => {
    (0, (_unit || _load_unit()).drawGrid)(registries);
};

let use = exports.use = (() => {
    var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* (registryName) {
        let registry = (0, (_unit || _load_unit()).registerFilter)(registries, function (registry) {
            return (0, (_unit || _load_unit()).trim)(registry.name) === (0, (_unit || _load_unit()).trim)(registryName);
        });

        if (registry.length === 0) {
            console.info(`The registryName ${ registryName } is not exists`);
            return true;
        }

        let message = yield (0, (_unit || _load_unit()).run)((_api || _load_api()).default.use + ` ${ registry[0][(_keys || _load_keys()).REGISTRY] }`);
        console.log(message);

        return true;
    });

    return function use(_x) {
        return _ref2.apply(this, arguments);
    };
})();

let add = exports.add = (() => {
    var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* (registryName, url, home) {

        let registry = (0, (_unit || _load_unit()).registerFilter)(registries, function (registry) {
            return (0, (_unit || _load_unit()).trim)(registry.name) === (0, (_unit || _load_unit()).trim)(registryName);
        });

        let urls = (0, (_unit || _load_unit()).registerFilter)(registries, function (registry) {
            return (0, (_unit || _load_unit()).trim)(registry[(_keys || _load_keys()).REGISTRY]) === (0, (_unit || _load_unit()).trim)(url);
        });

        if (!(0, (_unit || _load_unit()).isUrl)(url)) {
            console.info(`Incorrect registry ${ url }`);
            return false;
        }

        if (urls.length !== 0) {
            console.info(`The registryUrl ${ url } already exists`);
            return false;
        }

        if (registry.length !== 0) {
            console.info(`The registryName ${ registryName } already exists`);
            return false;
        }

        let temp = {};
        temp[(_keys || _load_keys()).NAME] = registryName;
        temp[(_keys || _load_keys()).REGISTRY] = url;
        temp[(_keys || _load_keys()).HOME] = home;
        registries.push(temp);

        let result = yield (0, (_unit || _load_unit()).writeFilePromise)(registries);
        if (result) {
            ls();
            return true;
        } else {
            console.info('Failed to add registry');
            ls();
        }

        return true;
    });

    return function add(_x2, _x3, _x4) {
        return _ref3.apply(this, arguments);
    };
})();

let del = exports.del = (() => {
    var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* (registryName) {

        let registry = (0, (_unit || _load_unit()).registerFilter)(registries, function (registry) {
            return (0, (_unit || _load_unit()).trim)(registry.name) === (0, (_unit || _load_unit()).trim)(registryName);
        });

        if (registry.length === 0) {
            console.info(`The registryName ${ registryName } is not exists`);
            return true;
        }

        let currentRegistry = yield (0, (_unit || _load_unit()).run)((_api || _load_api()).default.current);

        currentRegistry = (0, (_unit || _load_unit()).trim)(currentRegistry);

        let currentRegistries = (0, (_unit || _load_unit()).registerFilter)(registries, function (registry) {
            return (0, (_unit || _load_unit()).trim)(registry[(_keys || _load_keys()).REGISTRY]) === currentRegistry;
        });

        if (currentRegistries.length !== 0 && (0, (_unit || _load_unit()).trim)(currentRegistries[0][(_keys || _load_keys()).NAME]) === registryName) {
            console.log(`Registry(${ currentRegistry }) is in use, switch other registry can be deleted`);
            return true;
        }

        registries.splice(registries.indexOf(registry[0], 1));

        let result = yield (0, (_unit || _load_unit()).writeFilePromise)(registries);

        if (result) {
            ls();
        } else {
            console.info('Failed to del registry!!');
        }

        return true;
    });

    return function del(_x5) {
        return _ref4.apply(this, arguments);
    };
})();