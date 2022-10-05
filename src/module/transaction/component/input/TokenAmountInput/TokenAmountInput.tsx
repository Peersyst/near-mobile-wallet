import { CKBBalance } from "ckb-peersyst-sdk";
import { Dispatch, SetStateAction } from "react";
import { NumericInput } from "@peersyst/react-native-components";
import { SendSetAmountScreenProps } from "module/transaction/screen/SendSetAmountScreen/SendSetAmountScreen";
import { config } from "config";
import { useTranslate } from "module/common/hook/useTranslate";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { TokenAmountInputRoot } from "module/transaction/component/input/TokenAmountInput/TokenAmountInput.styles";
import TokenSelector from "module/token/component/input/TokenSelector/TokenSelector";
import { TokenSelectorProps } from "module/token/component/input/TokenSelector/TokenSelector.types";
import { useControlled } from "@peersyst/react-hooks";

interface AmountInputProps extends Partial<Pick<TokenSelectorProps, "defaultToken" | "token" | "tokens" | "onTokenChange">> {
    amount: string;
    setAmount: Dispatch<SetStateAction<string>>;
    freeBalance: CKBBalance["freeBalance"];
    fee: number;
    type?: SendSetAmountScreenProps["type"];
    defaultToken?: string;
    tokens?: string[];
    onTokenChange?: (token: string) => void;
}

const TokenAmountInput = ({
    amount,
    setAmount,
    freeBalance,
    fee,
    type = "send",
    defaultToken = config.tokenName,
    token: tokenProp,
    tokens = [],
    onTokenChange,
}: AmountInputProps): JSX.Element => {
    const isDAO = type === "dao";
    const translate = useTranslate();

    const [token, setToken] = useControlled(defaultToken, tokenProp, onTokenChange);

    const formattedFee = useFormatNumber(fee);
    const formattedMinTx = useFormatNumber((isDAO ? config.minimumDaoDeposit : config.minimumTransactionAmount).toString());

    return (
        <TokenAmountInputRoot
            hint={translate("transaction_fee", { fee: formattedFee, token: token })}
            value={amount}
            onChange={setAmount}
            name="amount"
            required
            validators={{
                gte: [
                    Number(isDAO ? config.minimumDaoDeposit : config.minimumTransactionAmount),
                    translate("minimum_transaction_amount_text", {
                        amount: formattedMinTx,
                        token: token,
                    }),
                ],
                lte: [Number(freeBalance) - fee, translate("insufficient_balance")],
            }}
            suffix={<TokenSelector token={token} tokens={tokens} onTokenChange={setToken} />}
            input={NumericInput}
            placeholder={translate("enter_amount")}
        />
    );
};

export default TokenAmountInput;
