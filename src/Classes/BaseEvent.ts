
import { BaseClient } from '../index';

export abstract class BaseEvent {
	protected client: BaseClient;
	protected constructor(client: BaseClient) {
		this.client = client;

	}
}
