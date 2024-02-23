import { IconButton } from "@peersyst/react-native-components";
import { Linking } from "react-native";
import { FaucetIcon } from "icons";
import { config } from "refactor/common/config";

const FaucetButton = (): JSX.Element => (
    <IconButton onPress={() => Linking.openURL(config.faucetUrl)}>
        <FaucetIcon />
    </IconButton>
);

export default FaucetButton;
