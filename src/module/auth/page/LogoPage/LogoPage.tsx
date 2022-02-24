import { Text } from "react-native";
import BasePage from "module/common/component/layout/BasePage/BasePage";

const LogoPage = (): JSX.Element => {
    return (
        <BasePage appearance="dark" header={false}>
            <Text style={{ color: "white" }}>Hola</Text>
        </BasePage>
    );
};

export default LogoPage;
