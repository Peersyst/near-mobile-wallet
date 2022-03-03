import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import Breadcrumbs from "module/common/component/display/Breadcrumbs/Breadcrumbs";
import { useAuth } from "module/auth/hook/useAuth";

const HomePage = (): JSX.Element => {
    const { logout } = useAuth();

    return (
        <BasePage appearance="light" showIcons>
            <Button onPress={logout}>Log out</Button>
            <Breadcrumbs index={2} length={6} />
        </BasePage>
    );
};

export default HomePage;
