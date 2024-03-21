import { useModal } from "@peersyst/react-native-components";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { Token } from "near-peersyst-sdk";
import DetailsTokenModal from "../../core/DetailsTokenModal/DetailsTokenModal";
import { TouchableWithoutFeedback } from "react-native";
import TokenBalance from "../TokenBalance/TokenBalance";
import TokenNameWithIcon from "../TokenNameWithIcon/TokenNameWithIcon";

export interface TokenCardProps {
    token: Token;
}

const TokenCard = ({ token }: TokenCardProps): JSX.Element => {
    const { showModal } = useModal();

    return (
        <TouchableWithoutFeedback onPress={() => showModal(DetailsTokenModal, { token: token })}>
            <MainListCard alignItems="center" justifyContent="space-between">
                <TokenNameWithIcon
                    token={token}
                    gap={16}
                    typographyProps={{ variant: "body3Strong", numberOfLines: 1, style: { flex: 0.6 } }}
                />
                <TokenBalance
                    balanceProps={{ variant: "body3Strong", textAlign: "right" }}
                    fiatBalanceProps={{ variant: "body4Strong", light: true }}
                    token={token}
                    style={{ flex: 1 }}
                />
            </MainListCard>
        </TouchableWithoutFeedback>
    );
};

export default TokenCard;
