import superAgent from "./superagent";
import _ from "lodash";

export default (options) => {
    return async(ctx, next) => {
        let res = await superAgent.fetch(ctx.queueItem.url, ctx.options.downloader || {});

        ctx.downloadRes = res.res;
        _.extend(ctx.queueItem, {
            responseBody: res.text,
            statusCode: res.statusCode
        });
        ctx.status.downloader = true;

        await next();
    };
}