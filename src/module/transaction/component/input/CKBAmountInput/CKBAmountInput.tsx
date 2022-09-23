import TextField from "module/common/component/input/TextField/TextField";
import { CKBBalance } from "ckb-peersyst-sdk";
import { Dispatch, SetStateAction } from "react";
import { NumericInput, Typography } from "@peersyst/react-native-components";
import formatNumber from "utils/formatNumber";
import { SendSetAmountScreenProps } from "module/transaction/screen/SendSetAmountScreen/SendSetAmountScreen";
import { config } from "config";
import { useTranslate } from "module/common/hook/useTranslate";

interface CKBAmountInputProps {
    amount: string;
    setAmount: Dispatch<SetStateAction<string>>;
    freeBalance: CKBBalance["freeBalance"];
    fee: number;
    type?: SendSetAmountScreenProps["type"];
}

const CKBAmountInput = ({ amount, setAmount, freeBalance, fee, type = "send" }: CKBAmountInputProps): JSX.Element => {
    const isDAO = type === "dao";
    const translate = useTranslate();
    return (
        <TextField
            size="lg"
            hint={translate("transaction_fee", { fee: formatNumber(fee) as string })}
            value={amount}
            onChange={setAmount}
            name="amount"
            required
            validators={{
                gte: [
                    Number(isDAO ? config.minimumDaoDeposit : config.minimumTransactionAmount),
                    translate("minimum_transaction_amount_text", {
                        amount: formatNumber(isDAO ? config.minimumDaoDeposit : config.minimumTransactionAmount) as string,
                    }),
                ],
                lte: [Number(freeBalance) - fee, translate("insufficient_balance")],
            }}
            suffix={
                <Typography variant="h2" fontWeight="bold">
                    CKB
                </Typography>
            }
            input={NumericInput}
            placeholder={translate("enter_amount")}
        />
    );
};

export default CKBAmountInput;
