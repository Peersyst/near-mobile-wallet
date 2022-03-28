import { DAOIcon } from "icons";
import { Row } from "react-native-components";
import { DaoCardIcon, HeaderTitle } from "../DaoAccountCard.styles";

const DaoCardHeader = (): JSX.Element => {
    return (
        <Row justifyContent="space-between">
            <DaoCardIcon>
                <DAOIcon />
            </DaoCardIcon>
            <HeaderTitle variant="h2">Nervos DAO</HeaderTitle>
            <DaoCardIcon>
                <DAOIcon />
            </DaoCardIcon>
        </Row>
    );
};
export default DaoCardHeader;
