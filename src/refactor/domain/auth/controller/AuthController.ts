import { IAuthController } from "refactor/ui/adapter/controllers/IAuthController";
import State from "refactor/domain/common/State";
import { IAuthState } from "../state/authState";
import { IPinController } from "refactor/ui/adapter/controllers/IPinController";

export default class AuthController implements IAuthController {
    constructor(public readonly authState: State<IAuthState>, public readonly pinController: IPinController) {}

    async signUp(mnemonic: string[], pin: string): Promise<void> {
        //TODO:Save the mnemonic into the storage

        //Save the pin into the storage
        await this.pinController.setPin(pin);
        //TODO:Create the wallets with the WalletController
        //Set the isAuthenticated to true
        this.authState.setState({ isAuthenticated: true });
    }

    async recover(mnemonic: string[], pin: string): Promise<void> {
        //TODO: todo
        //Check if the mnemonic is valid
        //Save the mnemonic into the storage
        //Save the pin into the storage
        //Recover the wallets with the WalletController
        //Set the isAuthenticated to true
    }

    async login(pin: string): Promise<void> {
        //Check if the pin is valid
        await this.pinController.checkPin(pin);
        //Recover the wallets with the WalletController?
        //TODO
        //Set the isAuthenticated to true
        this.authState.setState({ isAuthenticated: true });
    }

    async logout(): Promise<void> {
        //Set the isAuthenticated to false
        //TODO: borrar el pin, mnemmonic y lo que sea necesario...
        this.authState.setState({ isAuthenticated: false });
    }
}
