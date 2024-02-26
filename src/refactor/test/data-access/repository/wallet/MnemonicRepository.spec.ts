import MnemonicRepository from "refactor/data-access/repository/wallet/mnemonic/MnemonicRepository";
import SecureStorageRepositoryGlobalMock from "../../mocks/repository/SecureStorageRepository.globalMock";

describe("MnemonicRepository", () => {
    const secureStorageRepositoryGlobalMock = new SecureStorageRepositoryGlobalMock();
    const mockedMnemonic = "mnemonic";
    let mnemonicRepository: MnemonicRepository;

    beforeEach(() => {
        secureStorageRepositoryGlobalMock.clearMocks();
        mnemonicRepository = new MnemonicRepository();
    });

    describe("getMnemonic", () => {
        test("Should return mnemonics if mnemonic is stored", async () => {
            secureStorageRepositoryGlobalMock.get.mockResolvedValueOnce(mockedMnemonic);
            const result = await mnemonicRepository.getMnemonic();
            expect(result).toEqual(mockedMnemonic);
        });
    });

    describe("setMnemonic", () => {
        test("Should set mnemonic", async () => {
            await mnemonicRepository.setMnemonic(mockedMnemonic);
            expect(secureStorageRepositoryGlobalMock.set).toHaveBeenCalledWith(mockedMnemonic);
        });
    });

    describe("removeMnemonic", () => {
        test("Should remove mnemonic", async () => {
            await mnemonicRepository.removeMnemonic();
            expect(secureStorageRepositoryGlobalMock.clear).toHaveBeenCalled();
        });
    });
});
