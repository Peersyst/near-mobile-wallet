import { DAOIcon, FilledDAOIcon } from "icons";
import { Row, Typography } from "react-native-components";
import { DaoCardIcon } from "../DaoAccountCard.styles";
import { Linking } from "react-native";

export const DAO_INFO_URL = "https://www.nervos.org/"

const DaoCardHeader = (): JSX.Element => {
    return (
        <Row justifyContent="space-between">
            <DaoCardIcon onPress={()=> Linking.openURL(DAO_INFO_URL)}>
                <DAOIcon />
            </DaoCardIcon>
            <Typography fontWeight="bold" variant="h2">
                Nervos DAO
            </Typography>
            <DaoCardIcon>
                <FilledDAOIcon />
            </DaoCardIcon>
        </Row>
    );
};
export default DaoCardHeader;
