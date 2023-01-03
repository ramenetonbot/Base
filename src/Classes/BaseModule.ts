import {
	BaseApplicationCommand,
	BaseAutoCompleteCommand,
	BaseComponentCommand,
	BaseModalCommand, CommandType
} from './Commands/';
import { BaseClient, Logger } from '../index';
import { ClientEvents } from 'oceanic.js';
import { BaseEvent } from './BaseEvent';

export type BaseModuleDatas = {
	name: string,
	events: Array<keyof ClientEvents>
}

export type ModuleCommandRegisterData<Command> = {
	name: string
	command: Command
}

export type ModuleCommandsRegisterDatas = {
	application: Array<ModuleCommandRegisterData<BaseApplicationCommand>>
	autoCompletes: Array<ModuleCommandRegisterData<BaseAutoCompleteCommand>>
	components: Array<ModuleCommandRegisterData<BaseComponentCommand>>,
	modals: Array<ModuleCommandRegisterData<BaseModalCommand>>
}

export abstract class BaseModule {
	protected name: string;
	protected events: Array<keyof ClientEvents>;
	private readonly client: BaseClient;
	protected eventsCache: Map<keyof ClientEvents, BaseEvent>;

	// TODO make manual Command registering
	protected applicationCommands: Map<string, BaseApplicationCommand>;
	protected autoCompleteCommands: Map<string, BaseAutoCompleteCommand>;
	protected componentCommands: Map<string, BaseComponentCommand>;
	protected modalCommands: Map<string, BaseModalCommand>;

	protected constructor(client: BaseClient, datas: BaseModuleDatas) {
		this.client = client;
		this.name = datas.name;
		this.events = datas.events;
		this.eventsCache = new Map();
	}

	protected getClient(): BaseClient {
		return this.client;
	}

	public getName(): string {
		return this.name;
	}

	protected getEvents(): Array<keyof ClientEvents> {
		return this.events;
	}

	protected makeCacheCommands ({ application, autoCompletes, components, modals }: ModuleCommandsRegisterDatas): void {

		if (application && application.length) {
			application.forEach((command) => {
				this.registerCacheCommands<BaseApplicationCommand>(command, this.applicationCommands);
			});
		}

		if (autoCompletes && autoCompletes.length) {
			autoCompletes.forEach((command) => {
				this.registerCacheCommands<BaseAutoCompleteCommand>(command, this.autoCompleteCommands);
			});
		}

		if (components && components.length) {
			components.forEach((command) => {
				this.registerCacheCommands<BaseComponentCommand>(command, this.componentCommands);
			});
		}

		if (modals && modals.length) {
			modals.forEach((command) => {
				this.registerCacheCommands<BaseModalCommand>(command, this.modalCommands);
			});
		}
	}

	private registerCacheCommands<Command extends CommandType> ({ name, command }: ModuleCommandRegisterData<Command>, collection: Map<string, Command>): void {
		Logger.log(`Registering command ${name} on module ${this.name}`, 'command');
		collection.set(name, command);
	}

	public handleEvent(name: keyof ClientEvents, args: ClientEvents[keyof ClientEvents]): void {
		const event = this.eventsCache.get(name);
		if (event) {
			event.run(args);
		}
	}

	protected abstract registerEvents(): void

}
