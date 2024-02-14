import { IAuthState } from "refactor/domain/auth/state/authState";
import State from "refactor/domain/common/State";
import MethodMock from "refactor/test/utils/MethodMock";
import createMock from "refactor/test/utils/createMock";

export const AuthStateMock = createMock<State<IAuthState>>({
    getState: new MethodMock("mockReturnValue", { isLoggedIn: false }),
    setState: new MethodMock("mockReturnValue"),
    subscribe: new MethodMock("mockReturnValue"),
});
