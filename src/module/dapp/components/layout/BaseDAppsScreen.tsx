import { BaseDAppsScreenRoot } from "./BaseDAppsScreen.styles";

export interface BaseDAppsScreenProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const BaseDAppsScreen = ({ children, ...rest }: BaseDAppsScreenProps): JSX.Element => {
    return <BaseDAppsScreenRoot {...rest}>{children}</BaseDAppsScreenRoot>;
};

export default BaseDAppsScreen;
