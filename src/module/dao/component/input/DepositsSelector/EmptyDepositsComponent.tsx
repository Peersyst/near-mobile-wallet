import { translate } from "locale";
import { Typography } from "react-native-components";

export const EmptyDepositsComponent = () => {
    return (
        <Typography variant="body1" textAlign="center" fontWeight="bold" style={{ marginVertical: 4 }}>
            {translate("no_deposits")}
        </Typography>
    );
};
