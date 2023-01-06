import {
	BaseApplicationCommand,
	BaseAutoCompleteCommand,
	BaseComponentCommand,
	BaseModalCommand, CommandType,
	BaseEvent,
	BaseClient, Logger
} from '../index';
import { ClientEvents } from 'oceanic.js';

export type BaseModuleOptions = {
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
	private readonly options: BaseModuleOptions;
	protected eventsCache: Map<keyof ClientEvents, BaseEvent>;

	// TODO make manual Command registering
	protected applicationCommands: Map<string, BaseApplicationCommand>;
	protected autoCompleteCommands: Map<string, BaseAutoCompleteCommand>;
	protected componentCommands: Map<string, BaseComponentCommand>;
	protected modalCommands: Map<string, BaseModalCommand>;

	protected constructor(client: BaseClient, options: BaseModuleOptions) {
		this.client = client;
		this.options = options;
		this.name = options.name;
		this.events = options.events;
		this.eventsCache = new Map();
	}

	protected getClient(): BaseClient {
		return this.client;
	}

	public getName(): string {
		return this.name;
	}

	public getOptions<OptionsType>(): BaseModuleOptions & OptionsType {
		return <BaseModuleOptions & OptionsType>(this.options);
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
			event.run(...args);
		}
	}

	protected abstract registerEvents(): void

}
