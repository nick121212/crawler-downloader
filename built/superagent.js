"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SuperAgentDownloader = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _superagent = require("superagent");

var _superagent2 = _interopRequireDefault(_superagent);

var _superagentPromise = require("superagent-promise");

var _superagentPromise2 = _interopRequireDefault(_superagentPromise);

var _superagentDefaults = require("superagent-defaults");

var _superagentDefaults2 = _interopRequireDefault(_superagentDefaults);

var _superagentProxy = require("superagent-proxy");

var _superagentProxy2 = _interopRequireDefault(_superagentProxy);

var _superagentRetry = require("superagent-retry");

var _superagentRetry2 = _interopRequireDefault(_superagentRetry);

var _superagentCharset = require("superagent-charset");

var _superagentCharset2 = _interopRequireDefault(_superagentCharset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SuperAgentDownloader = exports.SuperAgentDownloader = function () {
    function SuperAgentDownloader() {
        (0, _classCallCheck3.default)(this, SuperAgentDownloader);

        this.request = _superagent2.default; //superAgentDefaults();
        (0, _superagentProxy2.default)(this.request);
        (0, _superagentRetry2.default)(this.request);
        (0, _superagentCharset2.default)(this.request);
    }

    /**
     * 设置代理
     */


    (0, _createClass3.default)(SuperAgentDownloader, [{
        key: "setProxy",
        value: function setProxy(options) {
            if (!options || !options.useProxy) {
                return;
            }

            options.httpProxy && this.request.proxy(options.httpProxy);
        }

        /**
         * 设置重试次数
         */

    }, {
        key: "setRetry",
        value: function setRetry(options) {
            if (!options) return;
            this.request.retry(options.count || 1);
        }

        /**
         * 设置编码
         */

    }, {
        key: "setCharset",
        value: function setCharset(options) {
            if (!options) return;
            this.request.charset(options.charset || 1);
        }
    }, {
        key: "setTimeout",
        value: function setTimeout(options) {
            if (!options) return;
            this.request.charset(options.timeout || 5000);
        }

        /**
         * 发送get请求
         */

    }, {
        key: "fetch",
        value: function fetch(uri) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            this.setProxy(options.proxy);
            this.setRetry(options.retry);
            this.setCharset(options.charset);
            this.setTimeout(options.timeout);

            var request = (0, _superagentPromise2.default)(this.request, _promise2.default);

            return request("GET", uri).end();
        }
    }]);
    return SuperAgentDownloader;
}();

exports.default = new SuperAgentDownloader();