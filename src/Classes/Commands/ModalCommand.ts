import { BaseCommand } from './index';
import { BaseClient } from '../../index';
import { ModalSubmitInteraction } from 'oceanic.js';

export abstract class BaseModalCommand extends BaseCommand {
	protected constructor(client: BaseClient) {
		super(client);
	}

    abstract run (interaction: ModalSubmitInteraction): void
}
