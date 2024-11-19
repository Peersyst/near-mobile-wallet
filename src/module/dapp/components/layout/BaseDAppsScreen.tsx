import { ScrollView } from "@peersyst/react-native-components";
import { BaseDAppsScreenRoot } from "./BaseDAppsScreen.styles";

export interface BaseDAppsScreenProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onRefresh?: () => void;
}

const BaseDAppsScreen = ({ children, onRefresh, ...rest }: BaseDAppsScreenProps): JSX.Element => {
    return (
        <BaseDAppsScreenRoot {...rest}>
            <ScrollView onRefresh={() => Promise.resolve(onRefresh)} contentContainerStyle={{ paddingBottom: 20 }}>
                {children}
            </ScrollView>
        </BaseDAppsScreenRoot>
    );
};

export default BaseDAppsScreen;
