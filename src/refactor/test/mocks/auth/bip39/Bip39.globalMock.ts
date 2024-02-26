import createGlobalMock from "refactor/test/utils/createGlobalMock";
// @ts-ignore
import * as bip39 from "bip39";
import MethodMock from "refactor/test/utils/MethodMock";

export const Bip39GlobalMock = createGlobalMock(bip39, {
    mnemonicToSeedSync: new MethodMock("mockReturnValue"),
    mnemonicToSeed: new MethodMock("mockResolvedValue"),
    mnemonicToEntropy: new MethodMock("mockReturnValue"),
    entropyToMnemonic: new MethodMock("mockReturnValue"),
    generateMnemonic: new MethodMock("mockReturnValue"),
    validateMnemonic: new MethodMock("mockReturnValue"),
    setDefaultWordlist: new MethodMock("mockReturnValue"),
    getDefaultWordlist: new MethodMock("mockReturnValue"),
});
