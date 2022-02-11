import { TextLogoRoot, TextLogoIcon, TextRoot, TextLogoFont } from "./TextLogo.style";

const TextLogo = (): JSX.Element => {
    return (
        <TextLogoRoot>
            <TextLogoIcon />
            <TextRoot>
                <TextLogoFont>CK</TextLogoFont>
                <TextLogoFont style={{ fontWeight: "bold", marginLeft: 1 }}>BULL</TextLogoFont>
            </TextRoot>
        </TextLogoRoot>
    );
};

export default TextLogo;
