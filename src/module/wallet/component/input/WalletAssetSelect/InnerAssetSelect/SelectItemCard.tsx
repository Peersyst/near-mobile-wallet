import { useTheme } from "@peersyst/react-native-components";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { ReactNode } from "react";
import { TouchableHighlight } from "react-native";

export interface SelectItemCardProps {
    children: ReactNode;
    onPress: () => void;
}

const SelectItemCard = ({ children, onPress }: SelectItemCardProps): JSX.Element => {
    const { palette } = useTheme();
    return (
        <TouchableHighlight activeOpacity={1} underlayColor={palette.gray["100"]} onPress={onPress}>
            <MainListCard alignItems="center" gap="5%">
                {children}
            </MainListCard>
        </TouchableHighlight>
    );
};

export default SelectItemCard;
