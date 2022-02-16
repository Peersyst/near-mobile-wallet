import { AppearanceProps } from "module/common/types";
import { TextLogoRoot, TextLogoIcon, TextRoot, TextLogoFont } from "./TextLogo.style";

const TextLogo = ({ appearance = "dark" }: Partial<AppearanceProps>): JSX.Element => {
    return (
        <TextLogoRoot appearance={appearance}>
            <TextLogoIcon appearance={appearance} />
            <TextRoot accessibilityRole="text">
                <TextLogoFont appearance={appearance}>CK</TextLogoFont>
                <TextLogoFont style={{ fontWeight: "bold" }} appearance={appearance}>
                    BULL
                </TextLogoFont>
            </TextRoot>
        </TextLogoRoot>
    );
};

export default TextLogo;
