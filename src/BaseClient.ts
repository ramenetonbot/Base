import { Client, ClientOptions } from 'oceanic.js';

export default abstract class BaseClient extends Client {
	protected constructor(options?: ClientOptions) {
		super(options);
	}
}