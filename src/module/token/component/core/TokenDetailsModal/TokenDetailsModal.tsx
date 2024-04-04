import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { Token } from "near-peersyst-sdk";
import TokenNameWithIcon from "../../display/TokenNameWithIcon/TokenNameWithIcon";
import TokenDetailsModalContent from "./TokenDetailsModalContent";

export interface TokenDetailsModalProps extends ExposedBackdropProps {
    token: Token;
}

const TokenDetailsModal = createBackdrop<TokenDetailsModalProps>(({ token, ...rest }) => {
    return (
        <CardNavigatorModal
            closable
            navbar={{
                back: true,
                title: <TokenNameWithIcon token={token} variant="body1Strong" style={{ flex: 1, maxWidth: "75%" }} />,
                titlePosition: "left",
            }}
            {...rest}
        >
            <TokenDetailsModalContent token={token} />
        </CardNavigatorModal>
    );
});

export default TokenDetailsModal;
