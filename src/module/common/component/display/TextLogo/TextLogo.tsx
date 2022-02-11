import { TextLogoRoot, TextLogoIcon, TextRoot, TextLogoFont, TextLogoBold } from "./TextLogo.style";

const TextLogo = (): JSX.Element => {
    return (
        <TextLogoRoot>
            <TextLogoIcon accessibilityRole="image"/>
            <TextRoot accessibilityRole="text">
                <TextLogoFont>
                    CK<TextLogoBold>BULL</TextLogoBold>
                </TextLogoFont>
            </TextRoot>
        </TextLogoRoot>
    );
};

export default TextLogo;
