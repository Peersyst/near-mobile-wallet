import { translate } from "i18n-js";
import { Row } from "react-native-components";
import { FavouriteIcon, AccountCardTitle, CopyIcon } from "../AccountCard.styles";

interface AccountCardHeaderProps {
    address: string;
}

const AccountCardHeader = ({ address }: AccountCardHeaderProps): JSX.Element => {
    return (
        <Row justifyContent="space-between" alignItems="center">
            <FavouriteIcon />
            <AccountCardTitle variant="h3">{translate("my_account")}</AccountCardTitle>
            <CopyIcon text={address} scaleStart={0.6} withAnimation={true} duration={700} color2="transparent" />
        </Row>
    );
};

export default AccountCardHeader;
