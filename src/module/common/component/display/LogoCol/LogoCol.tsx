import { Col } from "react-native-components";
import Logotip from "../Logotip/Logotip";
import Isotip from "../Isotip/Isotip";
import { AppearanceProps, SizeType } from "module/common/types";
import { IsotipSizeType } from "../Isotip/Isotip.types";

export type LogoColSizeType = "md" | "lg";

export interface LogoColProps extends Partial<AppearanceProps> {
    size: LogoColSizeType;
}

const LogoColRelations: Record<LogoColSizeType, { gap: number; isotipSize: IsotipSizeType; logotipSize: SizeType }> = {
    lg: {
        isotipSize: "xl",
        logotipSize: "lg",
        gap: 28,
    },
    md: {
        isotipSize: "lg",
        logotipSize: "sm",
        gap: 17,
    },
};

const LogoCol = ({ appearance = "dark", size }: LogoColProps): JSX.Element => {
    const { isotipSize, logotipSize, gap } = LogoColRelations[size];
    return (
        <Col alignItems={"center"} justifyContent={"center"} gap={gap}>
            <Isotip size={isotipSize} appearance={appearance} />
            <Logotip size={logotipSize} appearance={appearance} />
        </Col>
    );
};

export default LogoCol;
