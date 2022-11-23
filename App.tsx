import Root from "./src";
import useCachedResources from "./src/module/common/hook/useCachedResources";
import { LogBox } from "react-native";

const App = (): JSX.Element | null => {
    const isLoadingComplete = useCachedResources();
    LogBox.ignoreLogs(["Setting a timer"]); // https://github.com/facebook/react-native/issues/12981#issuecomment-652745831
    LogBox.ignoreLogs(["Require cycle:"]); // Consider refactoring to remove the need for a cycle
    LogBox.ignoreLogs(["new NativeEventEmitter"]); // Warning from expo-clipboard (React 18)
    LogBox.ignoreLogs(["Require cycles"]);
    return isLoadingComplete ? <Root /> : null;
};

export default App;
