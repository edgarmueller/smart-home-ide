import { injectable, inject } from "inversify";
import { OpenHandler, OpenerOptions } from "@theia/core/lib/browser";
import URI from "@theia/core/lib/common/uri";
import { MaybePromise } from "@theia/core";
import { MiniBrowserOpenHandler } from "@theia/mini-browser/lib/browser/mini-browser-open-handler";

@injectable()
export class JUnitResultOpenHandler implements OpenHandler {

    readonly id = "anaylsis-opener"
    label = "Workflow Analysis Editor"
    iconClass = "analysis-icon"

    constructor(@inject(MiniBrowserOpenHandler) private readonly openHandler: MiniBrowserOpenHandler) { }

    canHandle(uri: URI, options?: OpenerOptions): MaybePromise<number> {
        if (uri.path.ext == '.html') {
            return 1000;
        }
        return 0;
    }

    open(uri: URI, options?: OpenerOptions): MaybePromise<object | undefined> {
        return this.openHandler.open(uri)
    }
}