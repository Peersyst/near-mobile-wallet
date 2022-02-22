import { Col, Row } from "react-native-components";
import { LogoRoot, sizeRelations } from "./Logo.style";
import { LogoProps } from "./Logo.types";
import Logotip from "../Logotip/Logotip";

const Logo = ({ appearance = "dark", showText = true, direction, size }: LogoProps): JSX.Element => {
    const Wrapper = direction === "horizontal" ? Row : Col;
    const { logoSize, gap } = sizeRelations[direction][size];

    return (
        <Wrapper alignItems={"center"} justifyContent={"center"} gap={gap}>
            <LogoRoot appearance={appearance} fontSize={logoSize} />
            {showText && <Logotip appearance={appearance} size={"sm"} />}
        </Wrapper>
    );
};

export default Logo;
