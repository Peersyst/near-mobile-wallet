import { translate } from "locale";
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
            <CopyIcon text={address} message={translate("address_copied")} />
        </Row>
    );
};

export default AccountCardHeader;
