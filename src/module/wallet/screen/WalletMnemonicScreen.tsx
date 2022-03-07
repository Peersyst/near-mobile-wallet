import generateMnemonic from "module/wallet/mock/generateMnemonic";
import { Col, Typography, useTabs } from "react-native-components";
import Card from "module/common/component/surface/Card/Card";
import { translate } from "locale";
import { FlatList } from "react-native";
import Chip from "module/common/component/display/Chip/Chip";
import Button from "module/common/component/input/Button/Button";
import useCreateWalletState from "module/wallet/hook/useCreateWalletState";
import { CreateWalletScreens } from "module/wallet/CreateWalletNavigatorGroup";

const WalletMnemonicScreen = (): JSX.Element => {
    const setTab = useTabs()[1];
    const { setMnemonic } = useCreateWalletState();

    const handleNext = () => {
        setMnemonic(mnemonic);
        setTab(CreateWalletScreens.ENTER_WALLET_MNEMONIC);
    };

    const mnemonic = generateMnemonic();

    return (
        <Col flex={1} gap={30} justifyContent="flex-end">
            <Card>
                <Col gap={30}>
                    <Typography variant="h3" fontWeight="bold" textTransform="uppercase" textAlign="center">
                        {translate("keep_this_safe")}
                    </Typography>
                    <FlatList
                        data={mnemonic}
                        renderItem={({ item, index }) => <Chip label={item} style={{ marginLeft: index % 3 === 0 ? 0 : 15 }} />}
                        keyExtractor={(item) => item}
                        style={{ overflow: "visible" }}
                        numColumns={3}
                        columnWrapperStyle={{ marginBottom: 15, justifyContent: "center" }}
                    />
                </Col>
            </Card>
            <Button fullWidth variant="outlined" style={{ marginHorizontal: 20 }} onPress={handleNext}>
                {translate("next")}
            </Button>
        </Col>
    );
};

export default WalletMnemonicScreen;
