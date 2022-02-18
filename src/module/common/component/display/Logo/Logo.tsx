import { Col, Row } from "react-native-components";
import { LogoRoot, sizeRelations } from "./Logo.style";
import TextLogo from "module/common/component/display/TextLogo/TextLogo";
import { LogoProps } from "./Logo.types";

const Logo = ({ appearance = "dark", showText = true, direction, size }: LogoProps): JSX.Element => {
    const Wrapper = direction === "horizontal" ? Row : Col;
    const { logoSize, fontSize, gap } = sizeRelations[direction][size];

    return (
        <Wrapper alignItems={"center"} justifyContent={"center"} gap={gap}>
            <LogoRoot appearance={appearance} fontSize={logoSize} />
            {showText && <TextLogo appearance={appearance} fontSize={fontSize} />}
        </Wrapper>
    );
};

export default Logo;
