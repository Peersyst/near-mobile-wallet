import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import Typography from "module/common/component/display/Typography/Typography";
import { Token } from "near-peersyst-sdk";
import TokenDetailsCard from "../../display/TokenDetailsCard/TokenDetailsCard";
import TokenNameWithIcon from "../../display/TokenNameWithIcon/TokenNameWithIcon";

export interface DetailsTokenModalProps extends ExposedBackdropProps {
    token: Token;
}

const DetailsTokenModal = createBackdrop<DetailsTokenModalProps>(({ token, ...rest }) => {
    return (
        <CardNavigatorModal
            closable
            navbar={{
                back: true,
                title: <TokenNameWithIcon token={token} variant="body1Strong" style={{ maxWidth: "80%" }} />,
                titlePosition: "left",
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
