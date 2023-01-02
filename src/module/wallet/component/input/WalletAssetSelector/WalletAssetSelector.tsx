import { Col } from "@peersyst/react-native-components";
import Container from "module/common/component/display/Container/Container";
import Typography from "module/common/component/display/Typography/Typography";
import CardNavigatorModal, { CardNavigatorModalProps } from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { useTranslate } from "module/common/hook/useTranslate";
import Fee from "module/transaction/component/display/Fee/Fee";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";

export interface ConfirmPinModalWrapperPropsRenderProps {
    showModal: () => void;
    hideModal: () => void;
}

export type WalletAssetSelectorModalProps = Omit<CardNavigatorModalProps, "open" | "children"> & {
    children: (props: ConfirmPinModalWrapperPropsRenderProps) => JSX.Element;
};

export const WalletAssetSelectorModal = ({ children, navbar, ...rest }: WalletAssetSelectorModalProps) => {
    const [open, setOpen] = useState(false);
    const translate = useTranslate();
    return (
        <>
            {children({ showModal: () => setOpen(true), hideModal: () => setOpen(false) })}
            <CardNavigatorModal
                navbar={{
                    children: <Typography variant="body1Strong">{"Título"}</Typography>,
                    ...navbar,
                }}
                {...rest}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Col>
                    <Typography variant="body2Strong">{"Seleccionar el token"}</Typography>
                </Col>
            </CardNavigatorModal>
        </>
    );
};

const WalletAssetSelector = () => {
    return (
        <WalletAssetSelectorModal>
            {({ showModal }) => (
                <TouchableWithoutFeedback onPress={showModal}>
                    <Container>
                        <Col alignItems="center" flex={1} gap="2%">
                            <Typography variant="body2Strong">{"Seleccionar el token"}</Typography>
                            <Fee tag="body2" />
                        </Col>
                    </Container>
                </TouchableWithoutFeedback>
            )}
        </WalletAssetSelectorModal>
    );
};

export default WalletAssetSelector;
