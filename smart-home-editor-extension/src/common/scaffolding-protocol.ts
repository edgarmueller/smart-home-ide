import { JsonRpcServer } from '@theia/core/lib/common/messaging';

export const TypeNotFound="!fileTypeNotFound"
export const IYoServer= Symbol('IYoServer');
export const yoPath= '/services/yorequest'

export interface IYoServer extends JsonRpcServer<IYoClient> {
    requestYo(options: ScaffoldingOptions): void
}

export const IYoClient = Symbol('IYoClient');

export interface IYoClient {

}

export interface ScaffoldingOptions {
    appName?: string;
    appDescription?: string;
    appNameSpace?: string;
    authorName?: string;
    destinationPath?: string;
}