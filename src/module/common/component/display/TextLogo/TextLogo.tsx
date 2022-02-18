import { AppearanceProps } from "module/common/types";
import { TextRoot, TextLogoFont } from "./TextLogo.style";

const TextLogo = ({ appearance = "dark", fontSize = 23 }: Partial<AppearanceProps & { fontSize?: number }>): JSX.Element => {
    return (
        <TextRoot accessibilityRole="text">
            <TextLogoFont appearance={appearance} fontSize={fontSize}>
                CK
            </TextLogoFont>
            <TextLogoFont style={{ fontWeight: "bold", fontSize }} appearance={appearance} fontSize={fontSize}>
                BULL
            </TextLogoFont>
        </TextRoot>
    );
};

export default TextLogo;
