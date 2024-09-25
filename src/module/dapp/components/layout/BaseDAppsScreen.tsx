import { BaseDAppsScreenRoot } from "./BaseDAppsScreen.styles";

export interface BaseDAppsScreenProps {
    children?: React.ReactNode;
}

const BaseDAppsScreen = ({ children }: BaseDAppsScreenProps): JSX.Element => {
    return <BaseDAppsScreenRoot>{children}</BaseDAppsScreenRoot>;
};

export default BaseDAppsScreen;
