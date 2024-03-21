import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import Typography from "module/common/component/display/Typography/Typography";
import { useControlled } from "@peersyst/react-hooks";
import { Token } from "near-peersyst-sdk";
import TokenDetailsCard from "../../display/TokenDetailsCard/TokenDetailsCard";
import TokenNameWithIcon from "../../display/TokenNameWithIcon/TokenNameWithIcon";

export interface DetailsTokenModalProps extends ExposedBackdropProps {
    token: Token;
}

const DetailsTokenModal = createBackdrop<DetailsTokenModalProps>(({ token, open: openProp, defaultOpen = true, ...rest }) => {
    const [open, setOpen] = useControlled(defaultOpen, openProp);
    return (
        <CardNavigatorModal
            open={open}
            onClose={() => setOpen(false)}
            closable
            navbar={{
                back: true,
                title: (
                    <TokenNameWithIcon
                        token={token}
                        gap={16}
                        typographyProps={{ variant: "body3Strong", numberOfLines: 1, style: { flex: 0.6 } }}
                    />
                ),
                align: "left",
            }}
            {...rest}
        >
            <Typography textAlign="center" variant="body3Regular" color="overlay.60%">
                {token.metadata.reference}
            </Typography>
            <TokenDetailsCard token={token} />
        </CardNavigatorModal>
    );
});

export default DetailsTokenModal;
