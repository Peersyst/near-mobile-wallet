import { IconButton } from "react-native-components";
import { Linking } from "react-native";
import { FAUCET_URL } from "@env";
import { FaucetIcon } from "icons";

const FaucetButton = (): JSX.Element => (
    <IconButton onPress={() => Linking.openURL(FAUCET_URL)}>
        <FaucetIcon />
    </IconButton>
);

export default FaucetButton;
