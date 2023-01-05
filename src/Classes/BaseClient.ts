import { Client, ClientOptions } from 'oceanic.js';
import { BaseModule } from '../index';

export abstract class BaseClient extends Client {
	protected modules: Map<string, BaseModule>;
	protected constructor(options?: ClientOptions) {
		super(options);

		this.modules = new Map();
	}

	public registerModules(modules: Array<BaseModule>): void {
		modules.forEach((module) => {
			console.log(`Successfully registered ${module.getName()} module`);
			this.modules.set(module.getName(), module);
		});
	}
}
