import { Col, Typography, useModal } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../input/Button/Button";
import AddNearModal from "module/transaction/component/core/AddNearModal/AddNearModal";
import useWalletState from "module/wallet/hook/useWalletState";
import { capitalize } from "@peersyst/react-utils";
import { OnBoardingActionsListRoot } from "./OnBoardingActionList.styles";
import WalletsBackupModal from "module/wallet/component/core/WalletsBackupModal/WalletsBackupModal";

const OnBoardingActionsList = () => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const {
        state: { isBackupDone },
    } = useWalletState();
    return (
        <OnBoardingActionsListRoot>
            <Typography variant="body3Strong" numberOfLines={2} textAlign="center" style={{ width: "60%" }}>
                {translate("theresNotTransactionsYetMeanwhileYouCan")}
            </Typography>
            <Button variant="primary" fullWidth onPress={() => showModal(AddNearModal)}>
                {translate("addNearButton")}
            </Button>
            <Typography variant="body4Regular">{capitalize(translate("andThisYouWillBeAbleToStartUsingTheWallet"))}</Typography>
            {!isBackupDone && (
                <Col gap={16} style={{ width: "100%" }}>
                    <Button variant="quinary" fullWidth onPress={() => showModal(WalletsBackupModal)}>
                        {translate("backupWallet")}
                    </Button>
                    <Typography variant="body4Regular" textAlign="center">
                        {capitalize(translate("andThisYouWillBeAbleToRecoverYourWalletWhenYouNeedItWithoutLosingYourNear"))}
                    </Typography>
                </Col>
            )}
        </OnBoardingActionsListRoot>
    );
};

export default OnBoardingActionsList;
