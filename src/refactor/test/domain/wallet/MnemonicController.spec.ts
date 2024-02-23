import MnemonicRepositoryMock from "refactor/test/mocks/wallet/mnemonic/MnemonicRepository.mock";
// @ts-ignore
import * as bip39 from "bip39";
import MnemonicController from "refactor/domain/wallet/mnemonic/MnemonicController";
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

    describe("setMnemonic", () => {
        test("Stores pin", async () => {
            const mnemonicMock = "word1 word2 word3";
            await mnemonicController.setMnemonic(mnemonicMock);
            expect(mnemonicRepositoryMock.setMnemonic).toHaveBeenCalledWith(mnemonicMock);
        });
    });

    describe("getMnemonic", () => {
        test("Stores get pin", async () => {
            const mnemonicMock = "word1 word2 word3";
            mnemonicRepositoryMock.getMnemonic.mockResolvedValue(mnemonicMock);
            const result = await mnemonicController.getMnemonic();
            expect(result).toEqual(mnemonicMock);
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

        test("Pin is incorrect", async () => {
            const mnemonicMock = "word1 word2 word3";
            mnemonicRepositoryMock.getMnemonic.mockResolvedValue(mnemonicMock);
            jest.spyOn(bip39, "validateMnemonic").mockReturnValue(false);
            const result = await mnemonicController.validateMnemonic(mnemonicMock);

            expect(result).toEqual(false);
        });
    });
});
