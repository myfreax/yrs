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

var _lodash;

function _load_lodash() {
    return _lodash = require('lodash');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            return false;
        }

        let currentRegistries = yield (0, (_unit || _load_unit()).registryFilter)(function (registry) {
            return (0, (_unit || _load_unit()).trim)(registry[(_keys || _load_keys()).REGISTRY]) === currentRegistry;
        });

        (0, (_unit || _load_unit()).drawGrid)(currentRegistries);

        return true;
    });

    return function current() {
        return _ref.apply(this, arguments);
    };
})();

let ls = exports.ls = (() => {
    var _ref2 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* () {
        let registries = yield (0, (_unit || _load_unit()).registryFilter)(function () {
            return true;
        });
        (0, (_unit || _load_unit()).drawGrid)(registries);
    });

    return function ls() {
        return _ref2.apply(this, arguments);
    };
})();

let use = exports.use = (() => {
    var _ref3 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* (registryName) {

        let registry = yield (0, (_unit || _load_unit()).registryFilter)(function (registry) {
            return (0, (_unit || _load_unit()).trim)(registry.name) === (0, (_unit || _load_unit()).trim)(registryName);
        });

        if (registry.length === 0) {
            (0, (_unit || _load_unit()).printMsg)(`The registryName <${ registryName }> is not exists`);
            return true;
        }

        let message = yield (0, (_unit || _load_unit()).run)((_api || _load_api()).default.use + ` ${ registry[0][(_keys || _load_keys()).REGISTRY] }`);
        console.log(message);
        return true;
    });

    return function use(_x) {
        return _ref3.apply(this, arguments);
    };
})();

let add = exports.add = (() => {
    var _ref4 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* (registryName, url, home) {

        let customRegistries = yield (0, (_unit || _load_unit()).getCustomRegistries)();

        let registry = yield (0, (_unit || _load_unit()).registryFilter)(function (registry) {
            return (0, (_unit || _load_unit()).trim)(registry.name) === (0, (_unit || _load_unit()).trim)(registryName);
        });

        let urls = yield (0, (_unit || _load_unit()).registryFilter)(function (registry) {
            return (0, (_unit || _load_unit()).trim)(registry[(_keys || _load_keys()).REGISTRY]) === (0, (_unit || _load_unit()).trim)(url);
        });

        if (!(0, (_unit || _load_unit()).isUrl)(url)) {
            (0, (_unit || _load_unit()).printMsg)(`Incorrect registry <${ url }>`);
            return false;
        }

        if (urls.length !== 0) {
            (0, (_unit || _load_unit()).printMsg)(`The registryUrl <${ url }> already exists`);
            return false;
        }

        if (registry.length !== 0) {
            (0, (_unit || _load_unit()).printMsg)(`The registryName <${ registryName }> already exists`);
            return false;
        }

        let temp = {};
        temp[(_keys || _load_keys()).NAME] = registryName;
        temp[(_keys || _load_keys()).REGISTRY] = url;
        temp[(_keys || _load_keys()).HOME] = home;
        customRegistries.unshift(temp);

        let result = yield (0, (_unit || _load_unit()).setCustomRegistry)(customRegistries);

        if (result) {
            (0, (_unit || _load_unit()).printMsg)(`Add registry <${ registryName }> success`);
            return true;
        } else {
            (0, (_unit || _load_unit()).printMsg)(`Add registry <${ registryName }> failed`);
        }

        return true;
    });

    return function add(_x2, _x3, _x4) {
        return _ref4.apply(this, arguments);
    };
})();

let del = exports.del = (() => {
    var _ref5 = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* (registryName) {

        registryName = (0, (_unit || _load_unit()).trim)(registryName);

        let customRegistries = yield (0, (_unit || _load_unit()).getCustomRegistries)();

        let currentRegistry = yield (0, (_unit || _load_unit()).run)((_api || _load_api()).default.current);

        currentRegistry = (0, (_unit || _load_unit()).trim)(currentRegistry);

        let currentRegistries = yield (0, (_unit || _load_unit()).registryFilter)(function (registry) {
            return (0, (_unit || _load_unit()).trim)(registry[(_keys || _load_keys()).REGISTRY]) === currentRegistry;
        }, false);

        if (currentRegistries.length === 0) {

            (0, (_unit || _load_unit()).printMsg)(`Delete registry <${ registryName }> failed`);

            return false;
        }

        if (currentRegistries.length !== 0 && (0, (_unit || _load_unit()).trim)(currentRegistries[0][(_keys || _load_keys()).NAME]) === registryName) {
            (0, (_unit || _load_unit()).printMsg)(`Registry <${ currentRegistry }> is in use, switch other registry can be deleted`);
            return true;
        }

        customRegistries.splice((0, (_lodash || _load_lodash()).findIndex)(customRegistries, function (registry) {
            return registry[(_keys || _load_keys()).NAME] == registryName;
        }), 1);

        let result = yield (0, (_unit || _load_unit()).setCustomRegistry)(customRegistries);

        if (result) {
            (0, (_unit || _load_unit()).printMsg)(`Delete registry <${ registryName }> success`);
        } else {
            (0, (_unit || _load_unit()).printMsg)(`Delete registry <${ registryName }> failed`);
        }

        return true;
    });

    return function del(_x5) {
        return _ref5.apply(this, arguments);
    };
})();