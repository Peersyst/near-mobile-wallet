import Factory from "refactor/common/utils/Factory";
import { IAuthController } from "./controllers/IAuthController";
import authState from "refactor/domain/auth/state/authState";
import { IPinController } from "./controllers/IPinController";
import RepositoryFactory from "refactor/domain/adapter/RepositoryFactory";
import { IMnemonicController } from "./controllers/IMnemonicController";
import MnemonicController from "refactor/domain/wallet/mnemonic/MnemonicController";
import PinController from "refactor/domain/auth/pin/PinController";
import AuthController from "refactor/domain/auth/auth/AuthController";
import { IWalletController } from "./controllers/IWalletController";
import WalletController from "refactor/domain/wallet/wallet/WalletController";

export interface IControllerFactory {
    authController: IAuthController;
    pinController: IPinController;
    mnemonicController: IMnemonicController;
    walletController: IWalletController;
}

export default Factory<IControllerFactory>({
    walletController: (resolve) => new WalletController(resolve.mnemonicController),
    authController: (resolve) => new AuthController(authState, resolve.pinController, resolve.mnemonicController, resolve.walletController),
    pinController: () => new PinController(RepositoryFactory.pinRepository),
    mnemonicController: () => new MnemonicController(RepositoryFactory.mnemonicRepository),
});
