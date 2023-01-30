import useImportWallets from "module/wallet/hook/useImportWallets";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { Keyboard } from "react-native";
import { useModal, useToast } from "@peersyst/react-native-components";
import ImportWalletModal from "../ImportWalletModal";
import { useTranslate } from "module/common/hook/useTranslate";
import { TransaltionResourceType } from "locale";

export type UseImportWalletModalReturnType = {
    handleWalletCreation: () => Promise<void>;
};

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

        //Close modal
        hideModal(ImportWalletModal.id);

        if (wallets.length !== 0) {
            setTimeout(() => {
                showToast(translate(("import_success" + (wallets.length === 1 ? "_one" : "_other")) as TransaltionResourceType), {
                    type: "success",
                });
            }, 1000);
        }
    }

    return {
        handleWalletCreation,
    };
}
