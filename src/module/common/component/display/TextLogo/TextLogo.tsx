import { TextLogoRoot, TextLogoIcon, TextRoot, TextLogoFont, TextLogoBold } from "./TextLogo.style";

const TextLogo = (): JSX.Element => {
    return (
        <TextLogoRoot>
            <TextLogoIcon />
            <TextRoot>
                <TextLogoFont>CK</TextLogoFont>
                <TextLogoBold>BULL</TextLogoBold>
            </TextRoot>
        </TextLogoRoot>
    );
};

export default TextLogo;
