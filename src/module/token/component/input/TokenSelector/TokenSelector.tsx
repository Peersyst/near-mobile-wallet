import { TokenSelectorProps } from "module/token/component/input/TokenSelector/TokenSelector.types";
import { useConfig } from "@peersyst/react-native-components";
import { TokenSelectorRoot } from "module/token/component/input/TokenSelector/TokenSelector.styles";
import { useTranslate } from "module/common/hook/useTranslate";

const TokenSelector = ({
    defaultToken,
    token,
    tokens,
    onTokenChange,
    variant = "body1Strong",
    ...otherSelectProps
}: TokenSelectorProps): JSX.Element => {
    const translate = useTranslate();

    const nativeToken = useConfig("tokenName");
    const tokensList = [nativeToken, ...tokens];

    return (
        <TokenSelectorRoot
            name="token"
            variant={variant}
            defaultValue={defaultToken || nativeToken}
            value={token}
            options={tokensList.map((token) => ({ label: token, value: token }))}
            onChange={onTokenChange}
            title={translate("selectAToken")}
            {...otherSelectProps}
        />
    );
};

export default TokenSelector;
