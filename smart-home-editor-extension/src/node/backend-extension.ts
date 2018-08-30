import { ContainerModule } from "inversify";
import { ConnectionHandler, JsonRpcConnectionHandler } from "@theia/core";
import { IYoClient, IYoServer, yoPath } from "../common/scaffolding-protocol";
import { SmartHomeYoServer } from "./yo-server";

export default new ContainerModule(bind => {
    bind(IYoServer).to(SmartHomeYoServer).inSingletonScope()
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler<IYoClient>(yoPath, client => {
            const YoServer = ctx.container.get<IYoServer>(IYoServer);
            YoServer.setClient(client);
            return YoServer;
        })
    ).inSingletonScope();
});