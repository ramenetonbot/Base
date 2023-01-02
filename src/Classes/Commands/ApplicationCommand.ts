import { BaseCommand } from './index';
import { BaseClient } from '../../index';
import { CommandInteraction } from 'oceanic.js';

export abstract class BaseApplicationCommand extends BaseCommand {
	protected constructor(client: BaseClient) {
		super(client);
	}

    abstract run (interaction: CommandInteraction): void
}
