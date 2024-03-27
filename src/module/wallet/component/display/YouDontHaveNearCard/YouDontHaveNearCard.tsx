import { Typography } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { DescriptionTypography, YouDontHaveNearCardCardRoot } from "./YouDontHaveNearCard.styles";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";

function YouDontHaveNearCard(): JSX.Element {
    const translate = useTranslate();
    const navigate = useNavigation();
    return (
        <YouDontHaveNearCardCardRoot variant="blue">
            <Typography variant="body1Strong" textAlign="center">
                {translate("youHave0NEAR")}
            </Typography>
            <DescriptionTypography variant="body4Strong">{translate("youHave0NEARDescription")}</DescriptionTypography>
            <DescriptionTypography variant="body4Regular">{translate("youHave0NEARDescription2")}</DescriptionTypography>
            <Button variant="primary" onPress={() => navigate.navigate(MainScreens.FIAT_ORDERS)}>
                {translate("addNearNow")}
            </Button>
        </YouDontHaveNearCardCardRoot>
    );
}

export default YouDontHaveNearCard;
