import { Col } from "@peersyst/react-native-components";
import SearchBar from "module/common/component/input/SearchBar/SearchBar";
import useNavigation from "module/common/hook/useNavigation";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";

const SearchScreen = (): JSX.Element => {
    const { navigate } = useNavigation();

    return (
        <Col justifyContent="center" flex={1}>
            <SearchBar
                onSubmitEditing={({ nativeEvent }) => {
                    navigate(DAppScreens.WEBVIEW, { url: nativeEvent.text });
                }}
            />
        </Col>
    );
};

export default SearchScreen;
