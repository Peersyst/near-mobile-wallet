import { MINIMUM_TRANSACTION_AMOUNT } from "@env";
import { translate } from "locale";
import TextField from "module/common/component/input/TextField/TextField";
import { CKBBalance } from "module/common/service/mock/CkbServiceMock.types";
import { FeeType } from "module/settings/state/SettingsState";
import { Dispatch, SetStateAction } from "react";
import { NumericInput, Typography } from "react-native-components";

interface CKBAmountInputProps {
    amount: string;
    setAmount: Dispatch<SetStateAction<string>>;
    balance?: CKBBalance;
    fee?: string;
}

const CKBAmountInput = ({ amount, setAmount, balance, fee }: CKBAmountInputProps): JSX.Element => {
    return (
        <TextField
            variant="underlined"
            size="lg"
            hint={translate("transaction_fee", { fee: fee || "-" })}
            value={amount}
            onChange={setAmount}
            name="amount"
            validators={`not-null|gte${MINIMUM_TRANSACTION_AMOUNT}:${translate("minimum_transaction_amount_text", {
                amount: MINIMUM_TRANSACTION_AMOUNT,
            })}|lte${Number(balance?.freeBalance) - Number(fee)}:${translate("insufficient_balance")}`}
            suffix={
                <Typography variant="h2" fontWeight="bold">
                    CKB
                </Typography>
            }
            errorElement={<></>}
            input={NumericInput}
            placeholder={translate("enter_amount")}
        />
    );
};

export default CKBAmountInput;
