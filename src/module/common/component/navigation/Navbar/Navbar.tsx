import { NavbarProps } from "./Navbar.types";
import { NavbarRoot, BackIconRoot } from "./Navbar.styles";
import { BackIcon } from "icons";
import useNavigation from "../../../hook/useNavigation";
import { Col, Row, Typography } from "@peersyst/react-native-components";

const Navbar = ({ back, title, onBack, length, index }: NavbarProps): JSX.Element => {
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
            <Col alignItems="center" gap={4}>
                {title && (
                    <Typography variant="body1Strong" textTransform="uppercase">
                        {title}
                    </Typography>
                )}
                {length && index !== undefined && (
                    <Row>
                        <Typography variant="body3Strong">{index + 1} /</Typography>
                        <Typography variant="body3Strong" light>
                            {` ${length}`}
                        </Typography>
                    </Row>
                )}
            </Col>
        </NavbarRoot>
    );
};

export default Navbar;
