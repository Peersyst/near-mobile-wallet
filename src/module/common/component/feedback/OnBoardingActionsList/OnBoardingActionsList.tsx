import { Col, Typography, useModal } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../input/Button/Button";
import AddNearModal from "module/transaction/component/core/AddNearModal/AddNearModal";
import useWalletState from "module/wallet/hook/useWalletState";
import { capitalize } from "@peersyst/react-utils";
import { OnBoardingActionsListRoot } from "./OnBoardingActionList.styles";
import WalletsBackupModal from "module/wallet/component/core/WalletsBackupModal/WalletsBackupModal";

const OnBoardingActionsList = (): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const {
        state: { isBackupDone },
    } = useWalletState();
    return (
        <OnBoardingActionsListRoot>
            <Typography variant="body3Strong" textAlign="center" style={{ width: "60%" }}>
                {translate("noTransactionsText")}
            </Typography>
            <Button variant="primary" fullWidth onPress={() => showModal(AddNearModal)}>
                {translate("addNearCallToActionText")}
            </Button>
            <Typography variant="body4Regular">{capitalize(translate("backupWallet"))}</Typography>
            {!isBackupDone && (
                <Col gap={16} style={{ width: "100%" }}>
                    <Button variant="quinary" fullWidth onPress={() => showModal(WalletsBackupModal)}>
                        {translate("backupWalletCallToActionText")}
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
