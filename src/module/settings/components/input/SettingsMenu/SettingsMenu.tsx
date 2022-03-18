import styled from "@peersyst/react-native-styled";
import { ChevronRightIcon } from "icons";
import useNavigation from "module/common/hook/useNavigation";
import { TouchableHighlight } from "react-native";
import { Row, Typography } from "react-native-components";
import { RootStackParamsList } from "stack-navigator";

interface SettingsMenuProps {
    label: string;
    location: keyof RootStackParamsList;
}

const ArrowRightIcon = styled(ChevronRightIcon)(({ theme }) => ({
    fontSize: 11,
    color: theme.palette.black,
}));

const SettingsMenuRoot = styled(Row, { justifyContent: "space-between", alignItems: "center" })(({ theme }) => ({
    backgroundColor: theme.palette.lighterGray,
    height: 60,
}));

const SettingsMenu = ({ label, location }: SettingsMenuProps): JSX.Element => {
    const navigation = useNavigation();
    return (
        <TouchableHighlight activeOpacity={0.94} onPress={() => navigation.navigate(location)}>
            <SettingsMenuRoot>
                <Typography variant="body1">{label}</Typography>
                <ArrowRightIcon />
            </SettingsMenuRoot>
        </TouchableHighlight>
    );
};

export default SettingsMenu;
