import useImportWallets from "module/wallet/hook/useImportWallets";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { Keyboard } from "react-native";
import { useModal, useToast } from "@peersyst/react-native-components";
import ImportWalletModal from "../ImportWalletModal";
import useTranslate from "module/common/hook/useTranslate";
import { ErrorResourceType, TransaltionResourceType } from "locale";
import useCreateWallet from "module/wallet/hook/useCreateWallet";

export type UseImportWalletModalReturnType = {
    handleWalletCreation: () => Promise<void>;
};

export const IMPORT_WALLET_TOAST_DELAY = 1000;

export default function useImportWalletModal(): UseImportWalletModalReturnType {
    const importWallet = useImportWallets();
    const { network } = useRecoilValue(settingsState);
    const { hideModal } = useModal();
    const { showToast } = useToast();
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const {
        state: { mnemonic },
    } = useCreateWallet();

    async function handleWalletCreation() {
        //Close keyboard
        Keyboard.dismiss();

        //Import wallet/s
        const wallets = await importWallet(network);

        //Close modal
        hideModal(ImportWalletModal.id);

        if (wallets.length !== 0) {
            setTimeout(() => {
                showToast(translate(("import_success" + (wallets.length === 1 ? "_one" : "_other")) as TransaltionResourceType), {
                    type: "success",
                });
            }, IMPORT_WALLET_TOAST_DELAY);
        } else {
            const localeKey = ((mnemonic ? "mnemonic" : "private_key") + "_already_exists") as ErrorResourceType;
            setTimeout(() => {
                showToast(translateError(localeKey), { type: "info" });
            }, IMPORT_WALLET_TOAST_DELAY);
        }
    }

    return {
        handleWalletCreation,
    };
}
