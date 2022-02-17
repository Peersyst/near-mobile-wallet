import { AppearanceProps } from "module/common/types";
import { Col, Row } from "react-native-components";
import { LogoRoot } from "./Logo.style";
import TextLogo from "module/common/component/display/TextLogo/TextLogo";

export type LogoProps = Partial<AppearanceProps> & {
    showText?: boolean;
    direction: "horizontal" | "vertical";
    size: "sm" | "md" | "lg";
};

const sizeRelations = {
    horizontal: {
        sm: {
            logoSize: 12,
            textSize: 12,
            gap: 2,
        },
        md: {
            logoSize: 23,
            textSize: 23,
            gap: 4,
        },
        lg: {
            logoSize: 42,
            textSize: 42,
            gap: 8,
        },
    },
    vertical: {
        sm: {
            logoSize: 50,
            textSize: 12,
            gap: 2,
        },
        md: {
            logoSize: 90,
            textSize: 23,
            gap: 4,
        },
        lg: {
            logoSize: 150,
            textSize: 42,
            gap: 10,
        },
    },
};

const Logo = ({ appearance = "dark", showText = true, direction, size }: LogoProps): JSX.Element => {
    const Wrapper = direction === "horizontal" ? Row : Col;
    const { logoSize, textSize, gap } = sizeRelations[direction][size];

    return (
        <Wrapper alignItems={"center"} justifyContent={"center"} gap={gap}>
            <LogoRoot appearance={appearance} fontSize={logoSize} />
            {showText && <TextLogo appearance={appearance} fontSize={textSize} />}
        </Wrapper>
    );
};

export default Logo;
