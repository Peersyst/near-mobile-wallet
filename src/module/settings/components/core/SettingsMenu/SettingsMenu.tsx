import styled from "@peersyst/react-native-styled";
import { ArrowIcon, BackIcon } from "icons";
import { ChevronDownIcon } from "module/common/component/base/assets/icons";
import useNavigation from "module/common/hook/useNavigation";
import { TouchableHighlight } from "react-native";
import { Row, Typography } from "react-native-components";
import { RootStackParamsList } from "stack-navigator";

interface SettingsMenuProps {
    label: string;
    location: keyof RootStackParamsList;
}

const ArrowRightIcon = styled(ChevronDownIcon)(({ theme }) => ({
    fontSize: 14,
    transform: [{ rotate: "45deg" }],
}));

const SettingsMenu = ({ label, location }: SettingsMenuProps): JSX.Element => {
    const navigation = useNavigation();
    return (
        <TouchableHighlight onPress={() => navigation.navigate(location)}>
            <Row justifyContent="space-between" alignItems="center">
                <Typography variant="body1">{label}</Typography>
                <ArrowRightIcon />
            </Row>
        </TouchableHighlight>
    );
};

export default SettingsMenu; 
