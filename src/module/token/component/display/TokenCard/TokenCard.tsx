import { useModal } from "@peersyst/react-native-components";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { Token } from "near-peersyst-sdk";
import { TouchableWithoutFeedback } from "react-native";
import TokenBalance from "../TokenBalance/TokenBalance";
import TokenNameWithIcon from "../TokenNameWithIcon/TokenNameWithIcon";
import TokenDetailsModal from "../../core/TokenDetailsModal/TokenDetailsModal";

export interface TokenCardProps {
    token: Token;
}

const TokenCard = ({ token }: TokenCardProps): JSX.Element => {
    const { showModal } = useModal();

    return (
        <TouchableWithoutFeedback onPress={() => showModal(TokenDetailsModal, { token })}>
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
    );
};

export default TokenCard;
