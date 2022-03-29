import { DAOIcon } from "icons";
import { Row, Typography } from "react-native-components";
import { DaoCardIcon } from "../DaoAccountCard.styles";

const DaoCardHeader = (): JSX.Element => {
    return (
        <Row justifyContent="space-between">
            <DaoCardIcon>
                <DAOIcon />
            </DaoCardIcon>
            <Typography fontWeight="bold" variant="h2">
                Nervos DAO
            </Typography>
            <DaoCardIcon>
                <DAOIcon />
            </DaoCardIcon>
        </Row>
    );
};
export default DaoCardHeader;
