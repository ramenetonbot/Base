import { Client, ClientOptions } from 'oceanic.js';
import { BaseModule, Logger } from '../index';

export abstract class BaseClient extends Client {
	protected modules: Map<string, BaseModule>;
	protected constructor(options?: ClientOptions) {
		super(options);

		this.modules = new Map();
	}

	public registerModules(modules: Array<BaseModule>): void {
		modules.forEach((module) => {
			Logger.log(`Successfully registered ${module.getName()} module`, 'module');
			this.modules.set(module.getName(), module);
		});
	}
}
