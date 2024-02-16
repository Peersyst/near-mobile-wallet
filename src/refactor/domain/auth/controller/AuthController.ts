import { IAuthController } from "refactor/ui/adapter/controllers/IAuthController";
import State from "refactor/domain/common/State";
import { IAuthState } from "../state/authState";
import { IPinController } from "refactor/ui/adapter/controllers/IPinController";
import { IMnemonicController } from "refactor/ui/adapter/controllers/IMnemonicController";
import DomainError from "refactor/domain/error/DomainError";
import AuthErrorCodes from "../AuthErrorCodes";

export default class AuthController implements IAuthController {
    constructor(
        public readonly authState: State<IAuthState>,
        public readonly pinController: IPinController,
        public readonly mnemonicController: IMnemonicController,
    ) {}

    async signUp(mnemonic: string[], pin: string): Promise<void> {
        // TODO : cuando cree el wallet controller, se deberia de setear el mnemonic
        await this.mnemonicController.setMnemonic(mnemonic.join(" "));
        //Save the pin into the storage
        await this.pinController.setPin(pin);
        //TODO:Create the wallets with the WalletController
        //Set the isAuthenticated to true
        this.authState.setState({ isAuthenticated: true });
    }

    async login(pin?: string): Promise<void> {
        //Check if the pin is valid
        if (pin) {
            const isPinValid = await this.pinController.checkPin(pin);
            if (!isPinValid) throw new DomainError(AuthErrorCodes.PIN_IS_NOT_SET);
        }
        // TODO: revisar biometrics como lo tiene cbcd, de momento, funciona por que es el callback de onBiometricsSuccess
        //Recover the wallets with the WalletController?
        //TODO
        this.authState.setState({ isAuthenticated: true });
    }

    async logout(): Promise<void> {
        //Set the isAuthenticated to false
        //TODO: borrar el pin, mnemmonic y lo que sea necesario...
        this.authState.setState({ isAuthenticated: false });
    }
}
