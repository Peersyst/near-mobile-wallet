import { atom } from "recoil";

export interface PinConfirmedState {
    pinConfirmed: boolean;
    hasNewPin: boolean;
}

const pinConfirmedState = atom<PinConfirmedState>({
    key: "settings",
    default: { pinConfirmed: false, hasNewPin: false },
});

export default pinConfirmedState;
