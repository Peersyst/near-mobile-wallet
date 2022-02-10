import { LogoIcon } from "icons";
import { TextLogoStyles } from "./TextLogo.style";
import { Text, View } from "react-native";

const TextLogo = (): JSX.Element => {
    const { Icon, TextLogoRoot, TextLogoFont, TextRoot, SecondText } = TextLogoStyles;
    return (
        <View style={[TextLogoRoot]}>
            <LogoIcon style={[Icon]} />
            <View style={[TextRoot]}>
                <Text style={[TextLogoFont]}>CK</Text>
                <Text style={[TextLogoFont, SecondText]}>BULL</Text>
            </View>
        </View>
    );
};

export default TextLogo;
