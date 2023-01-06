import * as chalk from 'chalk';

export type LogType = 'debug' | 'error' | 'warn' | 'log' | 'module' | 'client' | 'command';

export class Logger {
	public static log (content: string, type: LogType = 'log') {
		switch (type) {
			case 'log':
				return console.log(this.formatLog(content, type, chalk.bgBlue));
			case 'warn':
				return console.log(this.formatLog(content, type, chalk.black.bgYellow));
			case 'error':
				return console.log(this.formatLog(content, type, chalk.bgRed));
			case 'debug':
				return console.log(this.formatLog(content, type, chalk.green));
			case 'module':
				return console.log(this.formatLog(content, type, chalk.bgGreen.black));
			case 'command':
				return console.log(this.formatLog(content, type, chalk.black.bgCyan));
			case 'client':
				return console.log(this.formatLog(content, type, chalk.blue.bgBlack));
		}
	}

	public static error (content: string) {
		return this.log(content, 'error');
	}
	public static warn (content: string) {
		return this.log(content, 'warn');
	}
	public static debug (content: string) {
		return this.log(content, 'debug');
	}

	// Output: (2023/01/02-14:11:42) [ LOG ] Hello World
	private static formatLog (content: string, type: LogType, func: (...strings: Array<unknown>) => string): string {
		return `(${chalk.yellow(this.formatDate())}) [${func(' ' + type.toUpperCase() + ' ')}] ${content}`;
	}

	// Output: 2023/01/02-04:05:26
	private static formatDate (date?: Date): string {
		if (!date) date = new Date();
		return `${date.getFullYear()}/${this.formatNumber(date.getMonth() + 1)}/${this.formatNumber(date.getDay() + 1)}-${this.formatNumber(date.getHours())}:${this.formatNumber(date.getMinutes())}:${this.formatNumber(date.getSeconds())}`;
	}

	// old -> 2023/1/2-4:5:26
	// new -> 2023/01/02-04:05:26
	private static formatNumber (n: number): string {
		return n.toString().length === 1 ? '0' + n : n.toString();
	}

}
