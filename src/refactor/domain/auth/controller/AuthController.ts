import { IAuthController } from "refactor/ui/adapter/controllers/IAuthController";
import { PublicState } from "refactor/domain/common/State";

export default class AuthController implements IAuthController {
    constructor(public readonly authState: PublicState<{}>) {}
}
