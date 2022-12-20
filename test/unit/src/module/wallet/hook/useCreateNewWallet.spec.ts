import WalletController from "module/wallet/utils/WalletController";
import { Chains } from "near-peersyst-sdk";
import { CreateWalletStateMock, UseCreateWalletMock, UseServiceInstanceMock, UseWalletStateMock, WalletMock } from "test-mocks";
import { renderHook } from "test-utils";
import useCreateNewWallet from "module/wallet/hook/useCreateNewWallet";
import { WalletUtils } from "module/wallet/utils/WalletUtils";

export const renderUseCreateNewWallet = () => {
    return renderHook(() => {
        return useCreateNewWallet();
    }).result.current;
};

describe("UseImportWallets test", () => {
    const name = "newWallet";

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Creates wallets and sets state", async () => {
        new UseServiceInstanceMock();
        new UseCreateWalletMock({ state: new CreateWalletStateMock({ name }) });
        const { setState, state } = new UseWalletStateMock();
        const newWallet = new WalletMock({
            account: name,
            index: state.wallets.length,
            colorIndex: WalletUtils.getWalletColor(name),
        });
        jest.spyOn(WalletController, "createNewWallet").mockResolvedValue(newWallet);
        const create = renderUseCreateNewWallet();
        const w = await create(Chains.TESTNET);
        expect(setState).toHaveBeenCalled();
        expect(w).toEqual(newWallet);
    });

    test("Return undefined if service creation fails", async () => {
        new UseServiceInstanceMock();
        new UseCreateWalletMock({ state: new CreateWalletStateMock({ name }) });
        const { setState } = new UseWalletStateMock();
        jest.spyOn(WalletController, "createNewWallet").mockResolvedValue(undefined);
        const create = renderUseCreateNewWallet();
        const w = await create(Chains.TESTNET);
        expect(setState).not.toHaveBeenCalled();
        expect(w).toEqual(undefined);
    });

    test("Return undefined if saving the new account fails", async () => {
        const { serviceInstance } = new UseServiceInstanceMock();
        new UseCreateWalletMock({ state: new CreateWalletStateMock({ name }) });
        const { setState } = new UseWalletStateMock();
        jest.spyOn(serviceInstance, "createNewAccountWithSameSecretKey").mockResolvedValue(undefined);
        const create = renderUseCreateNewWallet();
        const w = await create(Chains.TESTNET);
        expect(setState).not.toHaveBeenCalled();
        expect(w).toEqual(undefined);
    });
});
