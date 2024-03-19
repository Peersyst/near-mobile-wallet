import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { Row, useConfig, useModal } from "@peersyst/react-native-components";
import ReceiveModal from "module/transaction/component/core/ReceiveModal/ReceiveModal";
import useTranslate from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import useIsMainnet from "module/settings/hook/useIsMainnet";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import { Linking } from "react-native";
import { config } from "config";
import { ArrowReceiveIcon, ArrowSendIcon, BuyIcon, SwapIcon } from "icons";
import LabeledIconButton from "module/common/component/input/LabeledIconButton/LabeledIconButton";

const WalletCardButtons = (): JSX.Element => {
    const { showModal } = useModal();
    const translate = useTranslate();
    const navigate = useNavigation();
    const enableBuy = useConfig("enableBuy");
    const isMainnet = useIsMainnet();
    const showBuyButton = enableBuy && isMainnet;
    const uriSwap = isMainnet ? config.mainnetSwapUrl : config.testnetSwapUrl;
    return (
        <Row gap={4}>
            {showBuyButton && (
                <LabeledIconButton
                    label={capitalize(translate("buy"))}
                    Icon={<BuyIcon />}
                    onPress={() => navigate.navigate(MainScreens.FIAT_ORDERS)}
                />
            )}
            <LabeledIconButton
                variant="secondary"
                label={capitalize(translate("send"))}
                Icon={<ArrowSendIcon />}
                onPress={() => showModal(SendModal)}
            />
            <LabeledIconButton
                variant="secondary"
                label={capitalize(translate("receive"))}
                Icon={<ArrowReceiveIcon />}
                onPress={() => showModal(ReceiveModal)}
            />
            <LabeledIconButton label={capitalize(translate("swap"))} Icon={<SwapIcon />} onPress={() => Linking.openURL(uriSwap)} />
        </Row>
    );
};

export default WalletCardButtons;
