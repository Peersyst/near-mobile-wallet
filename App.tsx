import Root from "./src";
import useCachedResources from "./src/module/common/hook/useCachedResources";
// Polyfill Intl as it is not included in RN
import "intl";

//Explanation link :https://github.com/facebook/react-native/issues/12981#issuecomment-652745831
import { LogBox } from "react-native";

const App = (): JSX.Element | null => {
    const isLoadingComplete = useCachedResources();
    LogBox.ignoreLogs(["Setting a timer"]);
    return isLoadingComplete ? <Root /> : null;
};

export default App;
