/* eslint-disable no-console */
export enum LoggingLevel {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
}

export class Logger {
    private readonly name: string;
    private readonly loggingLevel: LoggingLevel;

    constructor(name = "", loggingLevel: LoggingLevel = LoggingLevel.INFO) {
        this.name = name;
        this.loggingLevel = loggingLevel;
    }

    static debug(message: any, name = ""): void {
        console.debug(`${name}[debug] >> `, message);
    }

    debug(message: any): void {
        if (this.loggingLevel === LoggingLevel.DEBUG) {
            Logger.debug(message, this.name);
        }
    }

    static info(message: any, name = ""): void {
        console.info(`${name}[info] >> `, message);
    }

    info(message: any): void {
        if ([LoggingLevel.DEBUG, LoggingLevel.INFO].includes(this.loggingLevel)) {
            Logger.info(message, this.name);
        }
    }

    static log(message: any, name = ""): void {
        console.log(`${name}[log] >> `, message);
    }

    log(message: any): void {
        if ([LoggingLevel.DEBUG, LoggingLevel.INFO].includes(this.loggingLevel)) {
            Logger.log(message, this.name);
        }
    }

    static warn(message: any, name = ""): void {
        console.warn(`${name}[warn] >> `, message);
    }

    warn(message: any): void {
        if ([LoggingLevel.DEBUG, LoggingLevel.INFO, LoggingLevel.WARN].includes(this.loggingLevel)) {
            Logger.warn(message, this.name);
        }
    }

    static error(message: any, name = ""): void {
        console.error(`${name}[error] >> `, message);
    }

    error(message: any): void {
        Logger.error(message, this.name);
    }
}
