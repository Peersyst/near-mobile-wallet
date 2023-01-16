import { NavbarProps } from "./Navbar.types";
import { NavbarRoot, BackIconRoot } from "./Navbar.styles";
import { BackIcon } from "icons";
import useNavigation from "module/common/hook/useNavigation";
import { Col } from "@peersyst/react-native-components";
import Steps from "module/common/component/display/Steps/Steps";
import { NavbarTitle } from "./NavbarTitle";

const Navbar = ({ back, title, onBack, steps }: NavbarProps): JSX.Element => {
    const navigation = useNavigation();

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <NavbarRoot>
            {back && (
                <BackIconRoot onPress={onBack || goBack}>
                    <BackIcon />
                </BackIconRoot>
            )}
            <Col alignItems="center">
                {title && <NavbarTitle title={title} textTransform="uppercase" />}
                {steps && <Steps index={steps.index} length={steps.length} />}
            </Col>
        </NavbarRoot>
    );
};

export default Navbar;
