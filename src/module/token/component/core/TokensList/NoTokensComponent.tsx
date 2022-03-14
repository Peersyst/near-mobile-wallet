import { translate } from "locale";
import { Typography } from "react-native-components";

const NoTokensComponent = (): JSX.Element => {
    return <Typography variant="body1">{translate("no_currencies")}</Typography>;
};

export default NoTokensComponent;
