import SecureStorageRepository from "refactor/data-access/repository/common/SecureStorageRepository";
import MethodMock from "../../../utils/MethodMock";
import createGlobalMock from "../../../utils/createGlobalMock";

export default createGlobalMock(SecureStorageRepository.prototype as unknown as { get: () => any; set: () => any; clear: () => any }, {
    get: new MethodMock("mockResolvedValue", "test"),
    set: new MethodMock("mockResolvedValue"),
    clear: new MethodMock("mockResolvedValue"),
});
