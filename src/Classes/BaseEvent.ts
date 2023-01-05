
import { BaseClient, BaseModule } from '../index';
import { ClientEvents } from 'oceanic.js';


export abstract class BaseEvent {
	protected client: BaseClient;
	protected module: BaseModule;
	protected constructor(client: BaseClient, module: BaseModule) {
		this.client = client;
		this.module = module;
	}

	abstract run(...args: ClientEvents[keyof ClientEvents]): void

}
