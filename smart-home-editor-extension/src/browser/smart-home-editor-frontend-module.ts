/**
 * Generated using theia-extension-generator
 */

import { SmartHomeEditorCommandContribution, SmartHomeEditorMenuContribution } from './smart-home-editor-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";
import { ContainerModule } from "inversify";
import { WidgetFactory } from "@theia/core/lib/browser";
import { ResourceProvider } from "@theia/core/lib/common";
import { TreeEditorWidget, TreeEditorWidgetOptions } from "theia-tree-editor";
import URI from "@theia/core/lib/common/uri";
import App, {initStore} from "../App";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    
    bind(CommandContribution).to(SmartHomeEditorCommandContribution);
    bind(MenuContribution).to(SmartHomeEditorMenuContribution);
    bind<WidgetFactory>(WidgetFactory).toDynamicValue(ctx => ({
       id: 'theia-tree-editor',
       async createWidget(uri: string): Promise<TreeEditorWidget> {
         const { container } = ctx;
         const resource = await container.get<ResourceProvider>(ResourceProvider)(new URI(uri));
         const store = await initStore();
         const child = container.createChild();
         child.bind<TreeEditorWidgetOptions>(TreeEditorWidgetOptions)
           .toConstantValue({ resource, store, EditorComponent: App, fileName: new URI(uri).path.base});
         return child.get(TreeEditorWidget);
       }
    }));    
});
