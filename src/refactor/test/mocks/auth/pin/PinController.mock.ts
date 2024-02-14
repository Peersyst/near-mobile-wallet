import MethodMock from "refactor/test/utils/MethodMock";
import createMock from "refactor/test/utils/createMock";
import { IPinController } from "refactor/ui/adapter/controllers/IPinController";

export const PinControllerMock = createMock<IPinController>({
    setPin: new MethodMock("mockResolvedValue"),
    checkPin: new MethodMock("mockResolvedValue", true),
    isPinSet: new MethodMock("mockResolvedValue", true),
    removePin: new MethodMock("mockResolvedValue"),
});
