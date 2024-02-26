import { IAuthController } from "refactor/ui/adapter/controllers/IAuthController";
import State from "refactor/domain/common/State";
import { IAuthState } from "../state/authState";
import { IPinController } from "refactor/ui/adapter/controllers/IPinController";
import DomainError from "refactor/domain/error/DomainError";
import AuthEventEmitter from "../events/AuthEventEmitter";
import { IWalletController } from "refactor/ui/adapter/controllers/IWalletController";
import AuthErrorCodes from "../errors/AuthErrorCodes";

export default class AuthController implements IAuthController {
    private readonly authEventEmitter = AuthEventEmitter;

    constructor(
        public readonly authState: State<IAuthState>,
        public readonly pinController: IPinController,
        public readonly walletController: IWalletController,
    ) {}

    async signUp(mnemonic: string[], pin: string): Promise<void> {
        await this.pinController.setPin(pin);
        await this.walletController.createWallets(mnemonic);
        this.setIsLoggedIn();
    }

    async login(pin?: string): Promise<void> {
        if (pin) {
            const isPinValid = await this.pinController.checkPin(pin);
            if (!isPinValid) throw new DomainError(AuthErrorCodes.PIN_IS_INVALID);
        }
        await this.walletController.recoverWallets();
        this.setIsLoggedIn();
    }

    async logout(): Promise<void> {
        this.authState.setState({ isAuthenticated: false });
        this.authEventEmitter.emit("logout");
    }

    private async setIsLoggedIn(): Promise<void> {
        this.authState.setState({ isAuthenticated: true });
        this.authEventEmitter.emit("login");
    }
}
