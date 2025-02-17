import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { IntentsTokenBalance } from "near-peersyst-sdk";
import TokenDetailsModalContent from "./IntentsTokenDetailsModalContent";
import { useControlled } from "@peersyst/react-hooks";
import IntentsTokenNameWithIcon from "../../display/IntentsTokenNameWithIcon/IntentsTokenNameWithIcon";

export interface IntentsTokenDetailsModalProps extends ExposedBackdropProps {
    token: IntentsTokenBalance;
    onWithdraw?: () => void;
    onSwap?: () => void;
}

const IntentsTokenDetailsModal = createBackdrop<IntentsTokenDetailsModalProps>(
    ({ token, open: openProp, defaultOpen, onClose: onCloseProp, onWithdraw, onSwap, ...rest }) => {
        const [open, setOpen] = useControlled(defaultOpen, openProp, onCloseProp);

        const handleOnWithdraw = () => {
            setOpen(false);
            onWithdraw?.();
        };

        const handleOnSwap = () => {
            setOpen(false);
            onSwap?.();
        };

        return (
            <CardNavigatorModal
                closable
                navbar={{
                    back: true,
                    title: (
                        <IntentsTokenNameWithIcon
                            nameChipGap={3}
                            token={token}
                            variant="body1Strong"
                            style={{ flex: 1, maxWidth: "75%" }}
                        />
                    ),
                    titlePosition: "left",
                }}
                open={open}
                onClose={() => setOpen(false)}
                {...rest}
            >
                <TokenDetailsModalContent token={token} onWithdraw={handleOnWithdraw} onSwap={handleOnSwap} />
            </CardNavigatorModal>
        );
    },
);

export default IntentsTokenDetailsModal;
