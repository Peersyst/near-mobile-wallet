import Factory from "refactor/common/utils/Factory";
import AuthController from "refactor/domain/auth/controller/AuthController";
import { IAuthController } from "./controllers/IAuthController";
import authState from "refactor/domain/auth/state/authState";
import { IPinController } from "./controllers/IPinController";
import PinController from "refactor/domain/auth/controller/PinController";
import RepositoryFactory from "refactor/domain/adapter/RepositoryFactory";
import { IMnemonicController } from "./controllers/IMnemonicController";
import MnemonicController from "refactor/domain/auth/controller/MnemonicController";

export interface IControllerFactory {
    authController: IAuthController;
    pinController: IPinController;
    mnemonicController: IMnemonicController;
}

export default Factory<IControllerFactory>({
    authController: (resolve) => new AuthController(authState, resolve.pinController),
    pinController: () => new PinController(RepositoryFactory.pinRepository),
    mnemonicController: () => new MnemonicController(RepositoryFactory.mnemonicRepository),
});
