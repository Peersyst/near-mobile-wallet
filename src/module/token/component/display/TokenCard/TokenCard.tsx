import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { Token } from "near-peersyst-sdk";
import TokenDetailsModal from "../../core/TokenDetailsModal/TokenDetailsModal";
import { TouchableWithoutFeedback } from "react-native";
import TokenBalance from "../TokenBalance/TokenBalance";
import TokenNameWithIcon from "../TokenNameWithIcon/TokenNameWithIcon";
import { Fragment, useState } from "react";

export interface TokenCardProps {
    token: Token;
}

const TokenCard = ({ token }: TokenCardProps): JSX.Element => {
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TouchableWithoutFeedback onPress={() => setOpen(true)}>
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
            <TokenDetailsModal token={token} open={open} onClose={() => setOpen(false)} />
        </Fragment>
    );
};

export default TokenCard;
