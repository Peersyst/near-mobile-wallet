import { MINIMUM_TRANSACTION_AMOUNT } from "@env";
import { translate } from "locale";
import TextField from "module/common/component/input/TextField/TextField";
import { CKBBalance } from "@peersyst/ckb-peersyst-sdk";
import { Dispatch, SetStateAction } from "react";
import { NumericInput, Typography } from "react-native-components";
import formatNumber from "utils/formatNumber";

interface CKBAmountInputProps {
    amount: string;
    setAmount: Dispatch<SetStateAction<string>>;
    freeBalance: CKBBalance["freeBalance"];
    fee: number;
}

const CKBAmountInput = ({ amount, setAmount, freeBalance, fee }: CKBAmountInputProps): JSX.Element => {
    return (
        <TextField
            variant="underlined"
            size="lg"
            hint={translate("transaction_fee", { fee: formatNumber(fee) as string })}
            value={amount}
            onChange={setAmount}
            name="amount"
            validators={{
                required: true,
                gte: [
                    Number(MINIMUM_TRANSACTION_AMOUNT),
                    translate("minimum_transaction_amount_text", {
                        amount: formatNumber(MINIMUM_TRANSACTION_AMOUNT) as string,
                    }),
                ],
                lte: [Number(freeBalance) - Number(fee), translate("insufficient_balance")],
            }}
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
