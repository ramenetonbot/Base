import { BaseCommand } from './index';
import { BaseClient } from '../../index';
import { AutocompleteInteraction } from 'oceanic.js';

export abstract class BaseAutoCompleteCommand extends BaseCommand {
	protected constructor(client: BaseClient) {
		super(client);
	}

    abstract run (interaction: AutocompleteInteraction): void
}
