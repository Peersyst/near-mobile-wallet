import { useModal, useToast } from "@peersyst/react-native-components";
import { useState } from "react";
import useTranslate from "module/common/hook/useTranslate";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import useCreateNewWallet from "module/wallet/hook/useCreateNewWallet";
import CreateWalletModal, { CreateWalletModalTabs } from "../CreateWalletModal";

export function useCreateWalletModal() {
    const [index, setIndex] = useState(CreateWalletModalTabs.WARNING_TAB);
    const { network } = useRecoilValue(settingsState);
    const translateError = useTranslate("error");
    const createNewWallet = useCreateNewWallet();
    const { showToast } = useToast();
    const { hideModal } = useModal();

    const handleOnBack = () => setIndex((i) => i - 1);

    const handleClose = () => {
        hideModal(CreateWalletModal.id);
    };

    const handleWalletCreation = async () => {
        //Create wallet
        const wallet = await createNewWallet(network);
        if (!wallet) {
            showToast(translateError("error_creating_account"), { type: "error" });
            handleClose();
        }
    };

    return {
        index,
        setIndex,
        handleOnBack,
        handleClose,
        handleWalletCreation,
    };
}
