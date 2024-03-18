import { createBackdrop, ExposedBackdropProps, IconButton } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import useTranslate from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import { useControlled } from "@peersyst/react-hooks";
import { DetailsTokenModalWrapper } from "./DetailTokenModal.styles";
import { Token } from "near-peersyst-sdk";
import Button from "module/common/component/input/Button/Button";
import { capitalize } from "@peersyst/react-utils";
import TokenBalance from "../../display/TokenBalance/TokenBalance";
import ExternalLinkButton from "module/common/component/input/ExternalLinkButton/ExternalLinkButton";
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
            navbar={{ back: true, title: <TokenHeader token={token} /> }}
            {...rest}
        >
            <Typography textAlign="center" variant="body3Regular" color="overlay.60%">
                {token.metadata.reference}
            </Typography>
            <DetailsTokenModalWrapper gap={16} textAlign="center">
                <TokenBalance token={token} alignItems="center" />
                <Button variant="primary" fullWidth>
                    {capitalize(translate("send"))}
                </Button>
                <Button variant="primary" fullWidth>
                    {capitalize(translate("buy"))}
                </Button>
                <Button variant="primary" fullWidth>
                    {capitalize(translate("swap"))}
                </Button>
                <ExternalLinkButton label={translate("viewTokenInExplorer")} showIcon={true} positionIcon="right" url={""} {...rest} />
            </DetailsTokenModalWrapper>
        </CardNavigatorModal>
    );
});

export default DetailsTokenModal;
