import { Client, ClientOptions } from 'oceanic.js';
import { BaseModule } from '../index';
import { Logger } from './Logger';

export abstract class BaseClient extends Client {
	protected modules: Map<string, BaseModule>;
	protected logger: Logger;
	protected constructor(options?: ClientOptions) {
		super(options);
		this.logger = Logger;
	}

	protected registerModules(modules: Array<BaseModule>): void {
		modules.forEach((module) => {
			console.log(`Successfully registered ${module.getName()} module`);
			this.modules.set(module.getName(), module);
		});
	}

	public getLogger(): Logger {
		return this.logger;
	}
}
