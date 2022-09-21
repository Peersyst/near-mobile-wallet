import { NavbarProps } from "./Navbar.types";
import { NavbarRoot, BackIconRoot, Title } from "./Navbar.styles";
import LogoRow from "../../display/Logos/LogoRow/LogoRow";
import { BackIcon } from "icons";
import useNavigation from "../../../hook/useNavigation";

const Navbar = ({ back, title, logo = false, onBack }: NavbarProps): JSX.Element => {
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
            {logo && <LogoRow />}
            {title && <Title variant="h2">{title}</Title>}
        </NavbarRoot>
    );
};

export default Navbar;
