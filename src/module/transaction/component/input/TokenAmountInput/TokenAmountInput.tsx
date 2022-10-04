import { CKBBalance } from "ckb-peersyst-sdk";
import { Dispatch, SetStateAction } from "react";
import { NumericInput, Typography } from "@peersyst/react-native-components";
import { SendSetAmountScreenProps } from "module/transaction/screen/SendSetAmountScreen/SendSetAmountScreen";
import { config } from "config";
import { useTranslate } from "module/common/hook/useTranslate";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { TokenAmountInputRoot } from "module/transaction/component/input/TokenAmountInput/TokenAmountInput.styles";

interface CKBAmountInputProps {
    amount: string;
    setAmount: Dispatch<SetStateAction<string>>;
    freeBalance: CKBBalance["freeBalance"];
    fee: number;
    type?: SendSetAmountScreenProps["type"];
}

const TokenAmountInput = ({ amount, setAmount, freeBalance, fee, type = "send" }: CKBAmountInputProps): JSX.Element => {
    const isDAO = type === "dao";
    const translate = useTranslate();

    const formattedFee = useFormatNumber(fee);
    const formattedMinTx = useFormatNumber((isDAO ? config.minimumDaoDeposit : config.minimumTransactionAmount).toString());
    return (
        <TokenAmountInputRoot
            hint={translate("transaction_fee", { fee: formattedFee, token: config.tokenName })}
            value={amount}
            onChange={setAmount}
            name="amount"
            required
            validators={{
                gte: [
                    Number(isDAO ? config.minimumDaoDeposit : config.minimumTransactionAmount),
                    translate("minimum_transaction_amount_text", {
                        amount: formattedMinTx,
                        token: config.tokenName,
                    }),
                ],
                lte: [Number(freeBalance) - fee, translate("insufficient_balance")],
            }}
            suffix={<Typography variant="body1Strong">{config.tokenName}</Typography>}
            input={NumericInput}
            placeholder={translate("enter_amount")}
        />
    );
};

export default TokenAmountInput;
