import { BaseCommand } from './index';
import { BaseClient } from '../../index';
import { ComponentInteraction } from 'oceanic.js';

export abstract class BaseComponentCommand extends BaseCommand {
	protected constructor(client: BaseClient) {
		super(client);
	}

    abstract run (interaction: ComponentInteraction, args: string[]): void
}
