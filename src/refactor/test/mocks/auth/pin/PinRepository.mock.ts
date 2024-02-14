import { IPinRepository } from "refactor/domain/adapter/repository/IPinRepository";
import MethodMock from "refactor/test/utils/MethodMock";
import createMock from "refactor/test/utils/createMock";

export default createMock<IPinRepository>({
    setPin: new MethodMock("mockResolvedValue"),
    getPin: new MethodMock("mockResolvedValue", "123456"),
    removePin: new MethodMock("mockResolvedValue"),
});
