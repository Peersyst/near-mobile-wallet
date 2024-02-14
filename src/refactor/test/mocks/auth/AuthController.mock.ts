import MethodMock from "refactor/test/utils/MethodMock";
import createMock from "refactor/test/utils/createMock";
import { IAuthController } from "refactor/ui/adapter/controllers/IAuthController";
import { AuthStateMock } from "./authState.mock";

export default createMock<IAuthController>({
    signUp: new MethodMock("mockResolvedValue", true),
    recover: new MethodMock("mockResolvedValue", true),
    login: new MethodMock("mockResolvedValue", true),
    logout: new MethodMock("mockResolvedValue", true),
    authState: new AuthStateMock(),
});
