export interface IQueueItem {
    url: string;
    responseBody: string;
    statusCode: number | string;
    errorCount: number;
    headers: Array<any>;
    depth: number;
    findUrls: Array<string>;
}