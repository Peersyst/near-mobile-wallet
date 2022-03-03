import { Text } from "react-native";
import { useLogoPageFlex } from "module/common/component/layout/LogoPage/LogoPageContext";

const ImportWalletPage = (): JSX.Element => {
    useLogoPageFlex(0.1);

    return <Text style={{ color: "white" }}>Import wallet page</Text>;
};

export default ImportWalletPage;
