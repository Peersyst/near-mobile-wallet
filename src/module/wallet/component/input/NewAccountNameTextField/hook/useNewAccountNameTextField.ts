import { useTranslate } from "module/common/hook/useTranslate";
import { useDebounce } from "@peersyst/react-hooks";
import useCheckNameAvailability from "module/wallet/query/useCheckNameIdAvailability";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import useGetSuffix from "module/wallet/hook/useGetSuffix";
import { addSuffix, removeSuffix } from "../util/accountNameUtils";
import { useState } from "react";
import useIsChildAccountValid from "./useIsChildAccountValid";
import { isAccountValid } from "../util/isAccountValid";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import useWalletState from "module/wallet/hook/useWalletState";
import { WalletUtils } from "module/wallet/utils/WalletUtils";

export interface UseNewAccountNameTextFieldParams {
    defaultValue?: string;
    walletIndex?: number;
}

export type UseNewAccountNameTextFieldReturn = {
    value: string;
    onChange: (value: string) => void;
    error: TextFieldProps["error"];
    hint: TextFieldProps["hint"];
    suffix: string;
    hideError: TextFieldProps["hideError"];
    showValid: TextFieldProps["showValid"];
    loading: boolean;
};

export default function useNewAccountNameTextField({
    defaultValue,
    walletIndex,
}: UseNewAccountNameTextFieldParams = {}): UseNewAccountNameTextFieldReturn {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { network } = useRecoilValue(settingsState);
    const suffix = useGetSuffix();
    const {
        state: { wallets },
    } = useWalletState();

    const finalWalletIndex = walletIndex !== undefined ? walletIndex : 0;
    const currentWallet = WalletUtils.getWallet(finalWalletIndex, wallets);

    //Debounced value in order to avoid making a request on each onChange of the TextField
    const name = defaultValue || "";
    const [valueChanged, setValueChanged] = useState(false);
    const { value, handleChange, debouncedValue, debouncing } = useDebounce(removeSuffix(name, suffix));
    const finalName = addSuffix(debouncedValue, suffix); //name to name.testnet or name.near

    function onChange(value: string) {
        handleChange(value);
        if (!valueChanged) setValueChanged(true);
    }

    //Check if name is a valid address
    const validAddress = isAccountValid(finalName, network);
    const invalidAddressError = !validAddress;
    const finalInvalidAddressError: TextFieldProps["error"] = invalidAddressError
        ? [invalidAddressError, translateError("invalid_address")]
        : undefined;

    //Check if name is a valid child
    const checkValidChild = useIsChildAccountValid(finalWalletIndex);
    const validChild = checkValidChild(finalName);
    const invalidChildError = !validChild;
    const finalValidChildError: TextFieldProps["error"] = invalidChildError
        ? [invalidChildError, translateError("invalid_child_account", { nameID: finalName, currentAccount: currentWallet?.account })]
        : undefined;

    //Check if name is available
    const { data: available = false, isLoading: nameLoading } = useCheckNameAvailability(finalName);
    const availableError = !available;
    const finalAvailableError: TextFieldProps["error"] = availableError
        ? [availableError, translateError("invalid_name_ID", { nameID: finalName })]
        : undefined;

    //Error handling
    const finalLoding = debouncing || nameLoading;
    const finalError: TextFieldProps["error"] = finalInvalidAddressError || finalValidChildError || finalAvailableError;
    const success = !finalLoding && finalError === undefined && finalName !== name;

    //Hint
    const hint = success ? translate("name_available", { name: finalName }) : undefined;

    return {
        value: value,
        onChange,
        error: finalError,
        hint,
        suffix,
        hideError: finalLoding || !valueChanged,
        showValid: success,
        loading: finalLoding,
    };
}
