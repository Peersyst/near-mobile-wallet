import { EventEmitter } from "refactor/common/events";

type WalletEvents = {
    recover: () => void;
    create: () => void;
};

const WalletEventEmitter = new EventEmitter<WalletEvents>();

export default WalletEventEmitter;
