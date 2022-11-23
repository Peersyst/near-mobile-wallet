import { InfoIcon } from "icons";
import { IconButton, Row, Typography } from "@peersyst/react-native-components";
import { Linking } from "react-native";
import { ThemeProvider } from "@peersyst/react-native-styled";
import SelectDAOWallet from "./SelectDAOWallet/SelectDAOWallet";
import lightTheme from "config/theme/lightTheme";

export const DAO_INFO_URL = "https://medium.com/nervosnetwork/nervos-dao-explained-95e33898b1c";

const DAOCardHeader = (): JSX.Element => {
    return (
        <Row justifyContent="space-between">
            <IconButton style={{ fontSize: 22 }} onPress={() => Linking.openURL(DAO_INFO_URL)}>
                <InfoIcon />
            </IconButton>
            <Typography fontWeight="bold" variant="h2">
                Nervos DAO
            </Typography>
            <ThemeProvider theme={lightTheme}>
                <SelectDAOWallet />
            </ThemeProvider>
        </Row>
    );
};
export default DAOCardHeader;
