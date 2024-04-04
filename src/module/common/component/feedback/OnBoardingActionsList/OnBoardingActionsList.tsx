import { Col, Typography, useModal } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../input/Button/Button";
import AddNearModal from "module/transaction/component/core/AddNearModal/AddNearModal";
import { capitalize } from "@peersyst/react-utils";
import { OnBoardingActionsListRoot } from "./OnBoardingActionList.styles";
import WalletsBackupModal from "module/wallet/component/core/WalletsBackupModal/WalletsBackupModal";
import useIsBackupDone from "module/settings/hook/useIsBackupDone";

const OnBoardingActionsList = (): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const isBackupDone = useIsBackupDone();
    
    return (
        <OnBoardingActionsListRoot gap="6%">
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
                        {capitalize(translate("backupWalletCallToActionTextDescription"))}
                    </Typography>
                </Col>
            )}
        </OnBoardingActionsListRoot>
    );
};

export default OnBoardingActionsList;
