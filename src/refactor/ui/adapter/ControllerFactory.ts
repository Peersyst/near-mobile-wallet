import Factory from "refactor/common/utils/Factory";
import AuthController from "refactor/domain/auth/controller/AuthController";
import { IAuthController } from "./controllers/IAuthController";
import authState from "refactor/domain/auth/state/authState";
import { IPinController } from "./controllers/IPinController";
import PinController from "refactor/domain/auth/controller/PinController";
import RepositoryFactory from "refactor/domain/adapter/RepositoryFactory";
import { IMnemonicController } from "./controllers/IMnemonicController";
import MnemonicController from "refactor/domain/auth/controller/MnemonicController";
import { ISettingsController } from "./controllers/ISettingsController";
import SettingsController from "refactor/domain/settings/controller/SettingsController";

export interface IControllerFactory {
    authController: IAuthController;
    pinController: IPinController;
    mnemonicController: IMnemonicController;
    settingsController: ISettingsController;
}

export default Factory<IControllerFactory>({
    authController: (resolve) => new AuthController(authState, resolve.pinController, resolve.mnemonicController),
    pinController: () => new PinController(RepositoryFactory.pinRepository),
    mnemonicController: () => new MnemonicController(RepositoryFactory.mnemonicRepository),
    settingsController: () => new SettingsController(RepositoryFactory.settingsRepository),
});
