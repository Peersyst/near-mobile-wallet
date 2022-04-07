import { InfoIcon } from "icons";
import { IconButton, Row, Typography } from "react-native-components";
import { Linking } from "react-native";
import { theme } from "module/common/style/theme";
import { ThemeProvider } from "@peersyst/react-native-styled";
import SelectDAOWallet from "./SelectDAOWallet/SelectDAOWallet";

export const DAO_INFO_URL = "https://www.nervos.org/";

const DAOCardHeader = (): JSX.Element => {
    return (
        <Row justifyContent="space-between">
            <IconButton style={{ fontSize: 22 }} onPress={() => Linking.openURL(DAO_INFO_URL)}>
                <InfoIcon />
            </IconButton>
            <Typography fontWeight="bold" variant="h2">
                Nervos DAO
            </Typography>
            <ThemeProvider theme={theme}>
                <SelectDAOWallet />
            </ThemeProvider>
        </Row>
    );
};
export default DAOCardHeader;
