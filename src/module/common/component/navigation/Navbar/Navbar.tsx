import { NavbarProps } from "./Navbar.types";
import { NavbarRoot, BackIconRoot, NavbarContent } from "./Navbar.styles";
import { BackIcon } from "icons";
import useNavigation from "module/common/hook/useNavigation";
import Steps from "module/common/component/display/Steps/Steps";
import { NavbarTitle } from "./NavbarTitle";
import { Col } from "@peersyst/react-native-components";

const Navbar = ({ back, title, onBack, steps, style, titlePosition = "center" }: NavbarProps): JSX.Element => {
    const navigation = useNavigation();

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };
    return (
        <NavbarRoot style={style} titlePosition={titlePosition}>
            {back && (
                <BackIconRoot onPress={onBack || goBack} titlePosition={titlePosition}>
                    <BackIcon />
                </BackIconRoot>
            )}
            <NavbarContent titlePosition={titlePosition}>
                {steps ? (
                    <Col alignItems="center">
                        <NavbarTitle title={title} />
                        <Steps index={steps.index} length={steps.length} />
                    </Col>
                ) : (
                    <NavbarTitle title={title} />
                )}
            </NavbarContent>
        </NavbarRoot>
    );
};

export default Navbar;
