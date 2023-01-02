import { NavbarProps } from "./Navbar.types";
import { NavbarRoot, BackIconRoot } from "./Navbar.styles";
import { BackIcon } from "icons";
import useNavigation from "module/common/hook/useNavigation";
import { Col, Typography } from "@peersyst/react-native-components";
import Steps from "module/common/component/display/Steps/Steps";

const Navbar = ({ back, title, onBack, steps, children }: NavbarProps): JSX.Element => {
    const navigation = useNavigation();

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };
    if (children) return <NavbarRoot>{children}</NavbarRoot>;
    return (
        <NavbarRoot>
            {back && (
                <BackIconRoot onPress={onBack || goBack}>
                    <BackIcon />
                </BackIconRoot>
            )}
            <Col alignItems="center">
                {title && (
                    <Typography variant="body1Strong" textTransform="uppercase">
                        {title}
                    </Typography>
                )}
                {steps && <Steps index={steps.index} length={steps.length} />}
            </Col>
        </NavbarRoot>
    );
};

export default Navbar;
