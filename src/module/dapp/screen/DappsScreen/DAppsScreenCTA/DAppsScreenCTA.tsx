import Typography from "module/common/component/display/Typography/Typography";
import { nebula } from "images";
import useNavigation from "module/common/hook/useNavigation";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import { DAppsScreenCTAContent, DAppsScreenCTAImageBackground, DAppsScreenCTARoot } from "./DAppsScreenCTA.styles";
import { DAppsScreenCTAImage } from "./DAppsScreenCTAImage";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import useDAppsExploreLink from "./hooks/useDAppsExploreLink";

const DAppsScreenCTA = (): JSX.Element => {
    const { navigate } = useNavigation();
    const translate = useTranslate();
    const exploreDAppsUrl = useDAppsExploreLink();

    function handleOnPress() {
        navigate(DAppScreens.WEBVIEW, { url: exploreDAppsUrl });
    }

    return (
        <DAppsScreenCTARoot>
            <DAppsScreenCTAContent>
                <DAppsScreenCTAImage />
                <Typography variant="body2Strong">{translate("dAppSelectCTA")}</Typography>
                <Button variant="primary" size="sm" onPress={handleOnPress}>
                    {translate("explore")}
                </Button>
            </DAppsScreenCTAContent>
            <DAppsScreenCTAImageBackground imageStyle={{ borderRadius: 20 }} resizeMode="contain" source={nebula} />
        </DAppsScreenCTARoot>
    );
};

export default DAppsScreenCTA;
