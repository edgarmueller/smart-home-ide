import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";

export const SmartHomeEditorCommand = {
    id: 'SmartHomeEditor.command',
    label: "Shows a message"
};

@injectable()
export class SmartHomeEditorCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(SmartHomeEditorCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class SmartHomeEditorMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: SmartHomeEditorCommand.id,
            label: 'Say Hello'
        });
    }
}