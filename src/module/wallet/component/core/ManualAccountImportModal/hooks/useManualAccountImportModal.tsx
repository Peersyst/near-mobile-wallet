import { ImportAccountManuallyReturn } from "module/wallet/utils/WalletController";
import useManualAccountImport from "./useManualAccountImport";
import { ExposedBackdropProps, useToast } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import { useControlled } from "@peersyst/react-hooks";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";

export default function useManualAccountImportModal({
    defaultOpen,
    open: openProp,
    onClose,
}: Pick<ExposedBackdropProps, "open" | "defaultOpen" | "onClose">) {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { showToast } = useToast();
    const [open, setOpen] = useControlled(defaultOpen, openProp, onClose);

    const setWalletState = useSetRecoilState(walletState);

    function handleOnSuccess({ wallet, alreadyImported }: ImportAccountManuallyReturn) {
        if (wallet) {
            setWalletState((state) => ({
                ...state,
                wallets: [...state.wallets, wallet],
            }));
            showToast(translate("import_success_one"), { type: "success" });
            setOpen(false);
        } else if (alreadyImported) {
            showToast(translateError("accountAlreadyExists"), { type: "info" });
        } else {
            showToast(translateError("cantImportAccount"), { type: "warning" });
        }
    }
    const { mutate, isLoading } = useManualAccountImport({ onSuccess: handleOnSuccess });

    function handleSubmit({ account }: { account: string }) {
        mutate(account);
    }

    function handleOnBack() {
        setOpen(false);
    }

    return {
        handleSubmit,
        open,
        handleOnBack,
        isLoading,
    };
}
