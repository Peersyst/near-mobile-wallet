import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { Token } from "near-peersyst-sdk";
import TokenDetailsModal from "../../core/TokenDetailsModal/TokenDetailsModal";
import { TouchableWithoutFeedback } from "react-native";
import TokenBalance from "../TokenBalance/TokenBalance";
import TokenNameWithIcon from "../TokenNameWithIcon/TokenNameWithIcon";
import { Fragment, useState } from "react";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import { AssetType } from "module/wallet/wallet.types";

export interface TokenCardProps {
    token: Token;
}

const TokenCard = ({ token }: TokenCardProps): JSX.Element => {
    const [openTokenModal, setOpenTokenModal] = useState(false);
    const [openSendModal, setOpenSendModal] = useState(false);

    return (
        <Fragment>
            <TouchableWithoutFeedback onPress={() => setOpenTokenModal(true)}>
                <MainListCard alignItems="center" justifyContent="space-between">
                    <TokenNameWithIcon token={token} variant="body3Strong" typographyStyle={{ flex: 0.6 }} />
                    <TokenBalance
                        balanceProps={{ variant: "body3Strong", textAlign: "right" }}
                        fiatBalanceProps={{ variant: "body4Strong" }}
                        token={token}
                        style={{ flex: 1 }}
                    />
                </MainListCard>
            </TouchableWithoutFeedback>
            <TokenDetailsModal
                token={token}
                open={openTokenModal}
                onClose={() => setOpenTokenModal(false)}
                onSend={() => setOpenSendModal(true)}
            />
            <SendModal defaultAsset={{ type: AssetType.FT, ft: token }} open={openSendModal} onClose={() => setOpenSendModal(false)} />
        </Fragment>
    );
};

export default TokenCard;
