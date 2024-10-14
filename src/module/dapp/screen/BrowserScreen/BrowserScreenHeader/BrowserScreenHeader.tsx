import { BrowserScreenHeaderCancelButton, BrowserScreenHeaderRoot } from "./BrowserScreenHeader.styles";
import { IconButton, Row } from "@peersyst/react-native-components";
import { ChevronRightIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import useNavigation from "module/common/hook/useNavigation";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import BrowserScreenHeaderInput from "./BrowserScreenHeaderInput/BrowserScreenHeaderInput";
import { BrowserScreenHeaderProps } from "./BrowserScreenHeader.types";

function BrowserScreenHeader({ url, onGoBack, canGoForward, onGoForward, onSearch }: BrowserScreenHeaderProps): JSX.Element {
    const translate = useTranslate();
    const { navigate } = useNavigation();

    function handleOnCancel() {
        navigate(DAppScreens.HOME);
    }

    return (
        <BrowserScreenHeaderRoot>
            <Row gap={2}>
                <IconButton style={{ paddingHorizontal: 0, transform: [{ rotate: "180deg" }] }} onPress={onGoBack}>
                    <ChevronRightIcon />
                </IconButton>
                <IconButton style={{ paddingHorizontal: 0 }} disabled={!canGoForward} onPress={onGoForward}>
                    <ChevronRightIcon />
                </IconButton>
            </Row>
            <BrowserScreenHeaderInput url={url} onSearch={onSearch} />
            <BrowserScreenHeaderCancelButton onPress={handleOnCancel}>{translate("close")}</BrowserScreenHeaderCancelButton>
        </BrowserScreenHeaderRoot>
    );
}

export default BrowserScreenHeader;
