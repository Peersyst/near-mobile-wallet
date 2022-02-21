import { NavbarProps } from "./Navbar.types";
import { LeftRoot, RightRoot, NavbarRoot } from "./Navbar.styles";

const Navbar = ({ leftChildren, centerChildren, rightChildren }: NavbarProps): JSX.Element => {
    return (
        <NavbarRoot>
            <LeftRoot>{leftChildren}</LeftRoot>
            {centerChildren}
            <RightRoot>{rightChildren}</RightRoot>
        </NavbarRoot>
    );
};

export default Navbar;
