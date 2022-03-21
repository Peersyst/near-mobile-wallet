import { atom } from "recoil";

export interface PinConfirmedState {
    pinConfirmed: boolean;
    hasNewPin: boolean;
}

const pinConfirmedState = atom<PinConfirmedState>({
    key: "pinConfirmedState",
    default: { pinConfirmed: false, hasNewPin: false },
});

export default pinConfirmedState;
