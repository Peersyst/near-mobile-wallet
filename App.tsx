import Root from "./src";
import useCachedResources from "./src/module/common/hook/useCachedResources";

const App = (): JSX.Element | null => {
    const isLoadingComplete = useCachedResources();

    return isLoadingComplete ? <Root /> : null;
};

export default App;
