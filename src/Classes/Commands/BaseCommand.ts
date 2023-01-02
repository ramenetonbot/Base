import { BaseClient } from '../../index';

export abstract class BaseCommand {
	private readonly client: BaseClient;
	protected constructor(client: BaseClient) {
		this.client = client;
	}

	public getClient(): BaseClient {
		return this.client;
	}

	protected formatCustomID(name: string, uid: string, ...args: string[]): string {
		return `${name}:${uid}${args ? ':'+args.join(':') : ''}`;
	}
}
