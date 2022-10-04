import useNavigation from "module/common/hook/useNavigation";
import { TouchableOpacity } from "react-native";
import { Typography } from "@peersyst/react-native-components";
import { RootStackParamsList } from "stack-navigator";
import { SettingsMenuRoot } from "./SettingsMenu.styles";
import { ChevronRightIcon } from "icons";

interface SettingsMenuProps {
    label: string;
    location: keyof RootStackParamsList;
}

const SettingsMenu = ({ label, location }: SettingsMenuProps): JSX.Element => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate(location)}>
            <SettingsMenuRoot>
                <Typography variant="body2Strong">{label}</Typography>
                <ChevronRightIcon />
            </SettingsMenuRoot>
        </TouchableOpacity>
    );
};

export default SettingsMenu;
