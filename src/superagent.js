import superAgent from "superagent";
import superAgentPromise from "superagent-promise";
import superAgentDefaults from "superagent-defaults";
import superAgentProxy from "superagent-proxy";
import superAgentRetry from "superagent-retry";
import superAgentCharset from "superagent-charset";

export class SuperAgentDownloader {
    constructor() {
        this.request = superAgent; //superAgentDefaults();
        superAgentProxy(this.request);
        superAgentRetry(this.request);
        superAgentCharset(this.request);
    }

    /**
     * 设置代理
     */
    setProxy(options) {
        if (!options || !options.useProxy) {
            return;
        }

        options.httpProxy && this.request.proxy(options.httpProxy);
    }

    /**
     * 设置重试次数
     */
    setRetry(options) {
        if (!options) return;
        this.request.retry(options.count || 1);
    }

    /**
     * 设置编码
     */
    setCharset(options) {
        if (!options) return;
        this.request.charset(options.charset || 1);
    }

    setTimeout(options) {
        if (!options) return;
        this.request.charset(options.timeout || 5000);
    }

    /**
     * 发送get请求
     */
    fetch(uri, options = {}) {
        this.setProxy(options.proxy);
        this.setRetry(options.retry);
        this.setCharset(options.charset);
        this.setTimeout(options.timeout);

        let request = superAgentPromise(this.request, Promise);

        return request("GET", uri).end();
    }
}

export default new SuperAgentDownloader();