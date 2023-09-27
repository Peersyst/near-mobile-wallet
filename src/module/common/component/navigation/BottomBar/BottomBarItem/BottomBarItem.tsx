import { Pressable } from "react-native";
import { BottomBarItemProps } from "../BottomBar.types";
import { LinkItemIcon, LinkItemText } from "./BottomBarItem.styles";
import { Col } from "@peersyst/react-native-components";

const BottomBarItem = ({ label, Icon, isActive, onPress }: BottomBarItemProps): JSX.Element => {
    return (
        <Pressable accessibilityRole="button" onPress={onPress}>
            <Col alignItems="center" gap={2}>
                <LinkItemIcon isActive={isActive}>{Icon}</LinkItemIcon>
                <LinkItemText variant="body4Strong" isActive={isActive}>
                    {label}
                </LinkItemText>
            </Col>
        </Pressable>
    );
};

export default BottomBarItem;
