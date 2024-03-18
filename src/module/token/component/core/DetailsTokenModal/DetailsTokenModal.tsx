import { createBackdrop, ExposedBackdropProps, Row } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import useTranslate from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import { useControlled } from "@peersyst/react-hooks";
import { DetailsTokenButton, DetailsTokenModalWrapper } from "./DetailTokenModal.styles";
import { Token } from "near-peersyst-sdk";
import { capitalize } from "@peersyst/react-utils";
import TokenBalance from "../../display/TokenBalance/TokenBalance";
import TokenHeader from "../../display/TokenHeader/TokenHeader";

export interface DetailsTokenModalProps extends ExposedBackdropProps {
    token: Token;
}

const DetailsTokenModal = createBackdrop<DetailsTokenModalProps>(({ token, open: openProp, onClose, defaultOpen = true, ...rest }) => {
    const translate = useTranslate();
    const [open, setOpen] = useControlled(defaultOpen, openProp, onClose);
    return (
        <CardNavigatorModal
            open={open}
            onClose={() => setOpen(false)}
            closable
            navbar={{ back: true, title: <TokenHeader token={token} />, style: { justifyContent: "flex-start", paddingLeft: 30 } }}
            {...rest}
        >
            <Typography textAlign="center" variant="body3Regular" color="overlay.60%">
                {token.metadata.reference}
            </Typography>
            <DetailsTokenModalWrapper gap={16} textAlign="center">
                <TokenBalance token={token} alignItems="center" />
                <Row gap={4} justifyContent="center">
                    <DetailsTokenButton variant="secondary" size="md" fullWidth>
                        {capitalize(translate("send"))}
                    </DetailsTokenButton>
                    <DetailsTokenButton variant="secondary" size="md" fullWidth>
                        {capitalize(translate("swap"))}
                    </DetailsTokenButton>
                </Row>
            </DetailsTokenModalWrapper>
        </CardNavigatorModal>
    );
});

export default DetailsTokenModal;
