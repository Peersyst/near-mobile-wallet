import { TextLogoRoot, TextLogoIcon, TextRoot, TextLogoFont, TextLogoBold } from "./TextLogo.style";
import { TextLogoProps } from "./TextLogo.types";

const TextLogo = ({appearance="light"}: TextLogoProps): JSX.Element => {
    return (
        <TextLogoRoot>
            <TextLogoIcon appearance={appearance} />
            <TextRoot accessibilityRole="text">
                <TextLogoFont>
                    CK<TextLogoBold>BULL</TextLogoBold>
                </TextLogoFont>
            </TextRoot>
        </TextLogoRoot>
    );
};

export default TextLogo;
