import Factory from "refactor/common/utils/Factory";
import AuthController from "refactor/domain/auth/controller/AuthController";
import { IAuthController } from "./controllers/IAuthController";
import authState from "refactor/domain/auth/state/authState";
import { IPinController } from "./controllers/IPinController";
import PinController from "refactor/domain/auth/controller/PinController";
import RepositoryFactory from "refactor/domain/adapter/RepositoryFactory";

export interface IControllerFactory {
    authController: IAuthController;
    pinController: IPinController;
}

export default Factory<IControllerFactory>({
    authController: (resolve) => new AuthController(authState, resolve.pinController),
    pinController: () => new PinController(RepositoryFactory.pinRepository),
});
