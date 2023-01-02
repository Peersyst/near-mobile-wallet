import { TokenSelectorProps } from "module/token/component/input/TokenSelector/TokenSelector.types";
import { Modal, useConfig } from "@peersyst/react-native-components";
import { TokenSelectorRoot } from "module/token/component/input/TokenSelector/TokenSelector.styles";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";

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
        <Modal>
            <Typography variant="body2Strong">{translate("select_token")}</Typography>
        </Modal>
    );
};

export default TokenSelector;
