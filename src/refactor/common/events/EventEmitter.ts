import Emitter from "events";

export default class EventEmitter<EventsDef extends Record<string, (...args: any[]) => any>> {
    private emitter = new Emitter();

    emit<Event extends keyof EventsDef>(event: Event, ...args: Parameters<EventsDef[Event]>): boolean {
        return this.emitter.emit(event as string, ...args);
    }

    once<Event extends keyof EventsDef>(event: Event, listener: EventsDef[Event]): () => void {
        this.emitter.once(event as string, listener);
        return () => this.off(event, listener);
    }

    on<Event extends keyof EventsDef>(event: Event, listener: EventsDef[Event]): () => void {
        this.emitter.on(event as string, listener);
        return () => this.off(event, listener);
    }

    off<Event extends keyof EventsDef>(event: Event, listener: EventsDef[Event]): void {
        this.emitter.off(event as string, listener);
    }
}
