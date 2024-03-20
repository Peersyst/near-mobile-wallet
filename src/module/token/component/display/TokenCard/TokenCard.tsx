import { useModal } from "@peersyst/react-native-components";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { Token } from "near-peersyst-sdk";
import DetailsTokenModal from "../../core/DetailsTokenModal/DetailsTokenModal";
import { TouchableWithoutFeedback } from "react-native";
import TokenBalance from "../TokenBalance/TokenBalance";
import TokenHeader from "../TokenHeader/TokenHeader";

export interface TokenCardProps {
    token: Token;
}

const TokenCard = ({ token }: TokenCardProps): JSX.Element => {
    const { showModal } = useModal();

    return (
        <TouchableWithoutFeedback onPress={() => showModal(DetailsTokenModal, { token: token })}>
            <MainListCard alignItems="center" justifyContent="space-between">
                <TokenHeader token={token} />
                <TokenBalance token={token} variant="body3Strong" />
            </MainListCard>
        </TouchableWithoutFeedback>
    );
};

export default TokenCard;
