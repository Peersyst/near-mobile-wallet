import MnemonicController from "refactor/domain/auth/controller/MnemonicController";
import MnemonicRepositoryMock from "refactor/test/mocks/auth/mnemonic/MnemonicRepository.mock";
// @ts-ignore
import bip39 from "bip39-light";
describe("MnemonicController", () => {
    let mnemonicController: MnemonicController;

    const mnemonicRepositoryMock = new MnemonicRepositoryMock();

    beforeEach(() => {
        mnemonicRepositoryMock.clearMocks();
        mnemonicController = new MnemonicController(mnemonicRepositoryMock);
    });

    describe("setMnemonic", () => {
        test("Stores pin", async () => {
            const mnemonicMock = "word1 word2 word3";
            await mnemonicController.setMnemonic(mnemonicMock);
            expect(mnemonicRepositoryMock.setMnemonic).toHaveBeenCalledWith(mnemonicMock);
        });
    });

    describe("validateMnemonic", () => {
        test("Pin is correct", async () => {
            const mnemonicMock = "word1 word2 word3";
            mnemonicRepositoryMock.getMnemonic.mockResolvedValue(mnemonicMock);
            jest.spyOn(bip39, "validateMnemonic").mockReturnValue(true);
            const result = await mnemonicController.validateMnemonic(mnemonicMock);

            expect(result).toEqual(true);
        });
    });
});
