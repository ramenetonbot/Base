
import { BaseClient } from '../index';
import { ClientEvents } from 'oceanic.js';


export abstract class BaseEvent {
	protected client: BaseClient;
	protected constructor(client: BaseClient) {
		this.client = client;
	}

	abstract run(args: ClientEvents[keyof ClientEvents]): void

}
