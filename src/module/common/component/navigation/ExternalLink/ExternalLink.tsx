import { Typography } from "@peersyst/react-native-components";
import { ExternalLinkProps } from "./ExternalLink.types";
import { Linking } from "react-native";

function ExternalLink({ to, children = "", color = "primary", ...typographyProps }: ExternalLinkProps): JSX.Element {
    const handlePress = () => {
        Linking.openURL(to ?? children);
    };

    return (
        <Typography onPress={handlePress} color={color} {...typographyProps}>
            {children}
        </Typography>
    );
}

export default ExternalLink;
