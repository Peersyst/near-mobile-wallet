import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { Token } from "near-peersyst-sdk";
import TokenNameWithIcon from "../../display/TokenNameWithIcon/TokenNameWithIcon";
import TokenDetailsModalContent from "./TokenDetailsModalContent";
import { useControlled } from "@peersyst/react-hooks";

export interface TokenDetailsModalProps extends ExposedBackdropProps {
    token: Token;
}

const TokenDetailsModal = createBackdrop<TokenDetailsModalProps>(
    ({ token, open: openProp, defaultOpen, onClose: onCloseProp, ...rest }) => {
        const [open, setOpen] = useControlled(defaultOpen, openProp, onCloseProp);

        const handleOnClose = () => {
            setOpen(false);
        };
        return (
            <CardNavigatorModal
                closable
                navbar={{
                    back: true,
                    title: <TokenNameWithIcon token={token} variant="body1Strong" style={{ flex: 1, maxWidth: "75%" }} />,
                    titlePosition: "left",
                }}
                open={open}
                onClose={handleOnClose}
                {...rest}
            >
                <TokenDetailsModalContent token={token} onClose={handleOnClose} />
            </CardNavigatorModal>
        );
    },
);

export default TokenDetailsModal;
