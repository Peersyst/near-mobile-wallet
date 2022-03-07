import CopyToClipboardIcon from "module/common/component/base/input/CopyToClipboardIcon/CopyToClipboardIcon";
import { Row } from "react-native-components";
import { AccountCardRoot, AccountCardTitle, CopyIcon, FavouriteIcon } from "./AccountCard.styles";

interface AccountCardProps {
    backgroundColor?: string;
}

const AccountCard = ({ backgroundColor }: AccountCardProps): JSX.Element => {
    return (
        <AccountCardRoot>
            <Row justifyContent="space-between" alignItems="center">
                <FavouriteIcon />
                <AccountCardTitle variant="h2">MY ACCOUNT</AccountCardTitle>
                <CopyIcon text="ckbull to the moon" />
            </Row>
        </AccountCardRoot>
    );
};

export default AccountCard;
