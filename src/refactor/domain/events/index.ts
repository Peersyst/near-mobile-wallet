import { EventsFactory } from "refactor/common/events";
import WalletEventEmitter from "../wallet/events/WalletEventEmitter";
import AuthEventEmitter from "../auth/events/AuthEventEmitter";

const DomainEvents = EventsFactory({
    wallet: WalletEventEmitter,
    auth: AuthEventEmitter,
});

export default DomainEvents;
