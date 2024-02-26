import MnemonicRepositoryMock from "refactor/test/domain/mocks/wallet/mnemonic/MnemonicRepository.mock";
import MnemonicController from "refactor/domain/wallet/mnemonic/MnemonicController";
import { Bip39GlobalMock } from "refactor/test/mocks/auth/bip39/Bip39.globalMock";

describe("MnemonicController", () => {
    let mnemonicController: MnemonicController;
    const bip39GlobalMock = new Bip39GlobalMock();

    const mnemonicRepositoryMock = new MnemonicRepositoryMock();

    beforeEach(() => {
        bip39GlobalMock.clearMocks();
        mnemonicRepositoryMock.clearMocks();
        mnemonicController = new MnemonicController(mnemonicRepositoryMock);
    });

    describe("generateMnemonic", () => {
        test("Generates mnemonic", async () => {
            const mnemonicMock = "word1 word2 word3";
            bip39GlobalMock.generateMnemonic.mockReturnValue(mnemonicMock);
            const result = mnemonicController.generateMnemonic();
            expect(result).toEqual(mnemonicMock);
        });
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
            bip39GlobalMock.validateMnemonic.mockReturnValue(true);
            const result = await mnemonicController.validateMnemonic(mnemonicMock);

            expect(result).toEqual(true);
        });

        test("Pin is incorrect", async () => {
            const mnemonicMock = "word1 word2 word3";
            mnemonicRepositoryMock.getMnemonic.mockResolvedValue(mnemonicMock);
            bip39GlobalMock.validateMnemonic.mockReturnValue(false);
            const result = await mnemonicController.validateMnemonic(mnemonicMock);

            expect(result).toEqual(false);
        });
    });
});
