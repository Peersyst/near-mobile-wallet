import { TouchableWithoutFeedback } from "react-native";
import { Col } from "react-native-components";
import useNativeNavigation from "../../hooks/useNavigation";
import { BottomBarLinkProps } from "../BottomBar.types";
import { LinkIcon, LinkText } from "./BottomBarLink.styles";

const BottomBarLink = ({ label, Icon, link }: BottomBarLinkProps): JSX.Element => {
    const navigation = useNativeNavigation();
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate(link)}>
            <Col alignItems="center" gap={2}>
                <LinkIcon>{Icon}</LinkIcon>
                <LinkText variant="caption">{label}</LinkText>
            </Col>
        </TouchableWithoutFeedback>
    );
};

export default BottomBarLink;
