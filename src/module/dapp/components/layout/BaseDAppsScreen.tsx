import { ScrollView } from "@peersyst/react-native-components";
import { BaseDAppsScreenRoot } from "./BaseDAppsScreen.styles";

export interface BaseDAppsScreenProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const BaseDAppsScreen = ({ children, ...rest }: BaseDAppsScreenProps): JSX.Element => {
    return (
        <BaseDAppsScreenRoot {...rest}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>{children}</ScrollView>
        </BaseDAppsScreenRoot>
    );
};

export default BaseDAppsScreen;
