import Breadcrumb from "module/common/component/display/Breadcrumb/Breadcrumb";
import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";

const DashboardScreen = ({ navigation }: any): JSX.Element => {
    return (
        <BasePage appearance="light" showIcons>
            <Button onPress={() => navigation.navigate("Login")}>Login</Button>
            <Breadcrumb numberOfActive={1} length={6} />
        </BasePage>
    );
};

export default DashboardScreen;
