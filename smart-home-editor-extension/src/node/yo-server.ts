import { IYoServer, IYoClient, ScaffoldingOptions } from "../common/scaffolding-protocol";
import { injectable } from "inversify";
import { createSmartAppProject } from "./scaffolding";

export namespace YoTypes {
    export const WORKFLOW_ANALYSIS_HTML = "wfanalysis"
}

@injectable()
export class SmartHomeYoServer implements IYoServer {
    protected client?: IYoClient;

    requestYo(options: ScaffoldingOptions): void {
        console.log('TRIGGERED!');
        console.log('Scaffolding options to the backend', options)
        createSmartAppProject(options);
    }
    dispose(): void {
        //no-op
    }
    setClient(client?: IYoClient): void {
        this.client = client
    }
}