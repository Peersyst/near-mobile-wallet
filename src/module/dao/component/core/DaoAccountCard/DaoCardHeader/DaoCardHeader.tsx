import { FilledWalletIcon, InfoIcon } from "icons";
import { IconButton, Row, Typography } from "react-native-components";
import { Linking } from "react-native";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { ThemeProvider } from "@peersyst/react-native-styled";
import { theme } from "module/common/style/theme";

export const DAO_INFO_URL = "https://www.nervos.org/";

const DaoCardHeader = (): JSX.Element => {
    return (
        <Row justifyContent="space-between">
            <IconButton style={{ fontSize: 22 }} onPress={() => Linking.openURL(DAO_INFO_URL)}>
                <InfoIcon />
            </IconButton>
            <Typography fontWeight="bold" variant="h2">
                Nervos DAO
            </Typography>
            <ThemeProvider theme={theme}>
                <WalletSelector updateSelectedWalletOnClose DisplayComponent={<FilledWalletIcon style={{ fontSize: 26, color: "#fff" }} />} />
            </ThemeProvider>
        </Row>
    );
};
export default DaoCardHeader;
