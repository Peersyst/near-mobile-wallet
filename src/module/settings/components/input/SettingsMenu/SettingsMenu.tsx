import useNavigation from "module/common/hook/useNavigation";
import { Row, Typography } from "@peersyst/react-native-components";
import { RootStackParamsList } from "stack-navigator";
import { ChevronRightIcon } from "icons";
import SettingsTouchableCard from "../SettingsTouchableCard/SettingsTouchableCard";

interface SettingsMenuProps {
    label: string;
    location: keyof RootStackParamsList;
}

const SettingsMenu = ({ label, location }: SettingsMenuProps): JSX.Element => {
    const navigation = useNavigation();
    return (
        <SettingsTouchableCard onPress={() => navigation.navigate(location as any)}>
            <Row justifyContent="space-between" alignItems="center" flex={1}>
                <Typography variant="body2Strong">{label}</Typography>
                <ChevronRightIcon />
            </Row>
        </SettingsTouchableCard>
    );
};

export default SettingsMenu;
