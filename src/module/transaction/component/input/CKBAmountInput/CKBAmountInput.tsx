import { MINIMUM_DAO_DEPOSIT, MINIMUM_TRANSACTION_AMOUNT } from "@env";
import { translate } from "locale";
import TextField from "module/common/component/input/TextField/TextField";
import { CKBBalance } from "ckb-peersyst-sdk";
import { Dispatch, SetStateAction } from "react";
import { NumericInput, Typography } from "react-native-components";
import formatNumber from "utils/formatNumber";
import { SendSetAmountScreenProps } from "module/transaction/screen/SendSetAmountScreen/SendSetAmountScreen";

interface CKBAmountInputProps {
    amount: string;
    setAmount: Dispatch<SetStateAction<string>>;
    freeBalance: CKBBalance["freeBalance"];
    fee: number;
    type?: SendSetAmountScreenProps["type"];
}

const CKBAmountInput = ({ amount, setAmount, freeBalance, fee, type = "send" }: CKBAmountInputProps): JSX.Element => {
    const isDAO = type === "dao";
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
                    Number(isDAO ? MINIMUM_DAO_DEPOSIT : MINIMUM_TRANSACTION_AMOUNT),
                    translate("minimum_transaction_amount_text", {
                        amount: formatNumber(isDAO ? MINIMUM_DAO_DEPOSIT : MINIMUM_TRANSACTION_AMOUNT) as string,
                    }),
                ],
                lte: [Number(freeBalance) - fee, translate("insufficient_balance")],
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
