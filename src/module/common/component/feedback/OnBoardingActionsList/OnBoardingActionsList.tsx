import { Col, Typography } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../input/Button/Button";
import AddNearModal from "module/transaction/component/core/AddNearModal/AddNearModal";
import { capitalize } from "@peersyst/react-utils";
import { OnBoardingActionsListRoot } from "./OnBoardingActionList.styles";
import WalletsBackupModal from "module/wallet/component/core/WalletsBackupModal/WalletsBackupModal";
import useIsBackupDone from "module/settings/hook/useIsBackupDone";
import { useState } from "react";

const OnBoardingActionsList = (): JSX.Element => {
    const translate = useTranslate();
    const isBackupDone = useIsBackupDone();
    const [openAddNearModal, setOpenAddNearModal] = useState(false);
    const [openWalletsBackupModal, setOpenWalletsBackupModal] = useState(false);

    return (
        <>
            <OnBoardingActionsListRoot gap="6%">
                <Typography variant="body3Strong" textAlign="center" style={{ width: "60%" }}>
                    {translate("noTransactionsText")}
                </Typography>
                <Button variant="primary" fullWidth onPress={() => setOpenAddNearModal(true)}>
                    {translate("addNearCallToActionText")}
                </Button>
                <Typography variant="body4Regular">{capitalize(translate("backupWallet"))}</Typography>
                {!isBackupDone && (
                    <Col gap={16} style={{ width: "100%" }}>
                        <Button variant="quinary" fullWidth onPress={() => setOpenWalletsBackupModal(true)}>
                            {translate("backupWalletCallToActionText")}
                        </Button>
                        <Typography variant="body4Regular" textAlign="center">
                            {capitalize(translate("backupWalletCallToActionTextDescription"))}
                        </Typography>
                    </Col>
                )}
            </OnBoardingActionsListRoot>
            <AddNearModal open={openAddNearModal} onClose={() => setOpenAddNearModal(false)} />
            <WalletsBackupModal open={openWalletsBackupModal} onClose={() => setOpenWalletsBackupModal(false)} />
        </>
    );
};

export default OnBoardingActionsList;
