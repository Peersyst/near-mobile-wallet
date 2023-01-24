import useImportWallets from "module/wallet/hook/useImportWallets";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { Keyboard } from "react-native";
import { useModal, useToast } from "@peersyst/react-native-components";
import ImportWalletModal from "../ImportWalletModal";
import { useTranslate } from "module/common/hook/useTranslate";

export const IMPORT_WALLET_MODAL_CLOSE_TIMEOUT = 500;

export type UseImportWalletModalReturnType = () => Promise<void>;

export default function useImportWalletModal(): UseImportWalletModalReturnType {
    const importWallet = useImportWallets();
    const { network } = useRecoilValue(settingsState);
    const { hideModal } = useModal();
    const { showToast } = useToast();
    const translate = useTranslate();

    async function handleWalletCreation() {
        //Close keyboard
        Keyboard.dismiss();
        //Import wallet/s
        const wallets = await importWallet(network);

        setTimeout(() => {
            hideModal(ImportWalletModal.id);
            if (wallets.length === 1) {
                showToast(translate("import_success" + (wallets.length === 1 ? "_one" : "_other")), { type: "success" });
            }
        }, IMPORT_WALLET_MODAL_CLOSE_TIMEOUT);
    }
    return handleWalletCreation;
}
