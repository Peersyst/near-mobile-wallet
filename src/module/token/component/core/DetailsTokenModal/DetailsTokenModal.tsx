import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import Typography from "module/common/component/display/Typography/Typography";
import { useControlled } from "@peersyst/react-hooks";
import { Token } from "near-peersyst-sdk";
import { capitalize } from "@peersyst/react-utils";
import TokenBalance from "../../display/TokenBalance/TokenBalance";
import useGetSwapLink from "module/common/hook/useGetSwapLink";
import { Linking } from "react-native";
import { useModal } from "@peersyst/react-native-components";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { AssetType } from "module/wallet/wallet.types";
import TokenDetailsCard from "../../display/TokenDetailsCard/TokenDetailsCard";
import TokenNameWithIcon from "../../display/TokenNameWithIcon/TokenNameWithIcon";
import useTranslate from "module/common/hook/useTranslate";

export interface DetailsTokenModalProps extends ExposedBackdropProps {
    token: Token;
}

const DetailsTokenModal = createBackdrop<DetailsTokenModalProps>(({ token, open: openProp, defaultOpen = true, ...rest }) => {
    const translate = useTranslate();
    const [open, setOpen] = useControlled(defaultOpen, openProp);
    const uriSwap = useGetSwapLink();
    const { showModal } = useModal();
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
