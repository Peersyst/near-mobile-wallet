import { IAuthState } from "refactor/domain/auth/state/authState";
import { ControllerWithState } from "refactor/domain/common/State";

export interface IAuthController extends ControllerWithState<{ auth: IAuthState }> {
    signUp(mnemonic: string[], pin: string): Promise<void>;
    recover(mnemonic: string[], pin: string): Promise<void>;
    login(pin: string): Promise<void>;
    logout(): Promise<void>;
}
