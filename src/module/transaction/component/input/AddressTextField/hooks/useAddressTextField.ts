import { useRecoilValue } from "recoil";
import { useTranslate } from "module/common/hook/useTranslate";
import settingsState from "module/settings/state/SettingsState";
import useWalletState from "module/wallet/hook/useWalletState";
import { useDebounce } from "@peersyst/react-hooks";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import useCheckAccountIsValidReceiver from "module/wallet/query/useCheckAccountIsValidReceiver";
import { isAccountValid } from "module/wallet/component/input/NewAccountNameTextField/util/isAccountValid";

export interface UseAddressTextFieldParams {
    defaultValue?: string;
    senderWalletIndex?: number;
}

export interface UseAddressTextFieldResult {
    value: string;
    onChange: TextFieldProps["onChange"];
    error: TextFieldProps["error"];
    isLoading: boolean;
    hideError: TextFieldProps["hideError"];
}

export function useAddressTextField({ defaultValue = "", senderWalletIndex }: UseAddressTextFieldParams = {}): UseAddressTextFieldResult {
    const translateError = useTranslate("error");
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    const finalSenderWalletIndex = senderWalletIndex || selectedWallet;
    const { account } = wallets[finalSenderWalletIndex];

    const { network } = useRecoilValue(settingsState);
    const { value, handleChange, debouncing, debouncedValue } = useDebounce(defaultValue);

    const { data: validReceiver = false, isLoading: isLoadingNameValidity } = useCheckAccountIsValidReceiver(
        finalSenderWalletIndex,
        debouncedValue,
    );

    /**
     * Invalid account
     */
    const isValid = isAccountValid(value, network);
    const invalidAccountError: TextFieldProps["error"] = isValid ? undefined : [true, translateError("invalid_address")];

    /**
     * Invalid same account
     */
    const isSameAccount = value === account;
    const invalidSameAccountError: TextFieldProps["error"] = isSameAccount
        ? [true, translateError("invalid_send_same_account")]
        : undefined;

    /**
     * Account does not exist
     */
    const accountDoesNotExistError: TextFieldProps["error"] =
        validReceiver === false ? [true, translateError("invalid_account_or_not_active")] : undefined;

    /**
     * Final error and final loading
     */
    const error = invalidAccountError || invalidSameAccountError || accountDoesNotExistError;
    const isLoading = debouncing || isLoadingNameValidity;

    return {
        value: value,
        onChange: handleChange,
        error: error,
        isLoading,
        hideError: isLoading,
    };
}
