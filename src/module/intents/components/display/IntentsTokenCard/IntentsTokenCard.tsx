import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import { TouchableWithoutFeedback } from "react-native";
import { Fragment, useState } from "react";
import IntentsTokenBalance from "../IntentsTokenBalance/IntentsTokenBalance";
import { IntentsTokenBalance as IIntentsTokenBalance } from "near-peersyst-sdk";
import IntentsTokenNameWithIcon from "../IntentsTokenNameWithIcon/IntentsTokenNameWithIcon";
import IntentsTokenDetailsModal from "../../feedback/IntentsTokenDetailsModal/IntentsTokenDetailsModal";

export interface IntentsTokenCardProps {
    token: IIntentsTokenBalance;
}

const IntentsTokenCard = ({ token }: IntentsTokenCardProps): JSX.Element => {
    const [openTokenModal, setOpenTokenModal] = useState(false);

    return (
        <Fragment>
            <TouchableWithoutFeedback onPress={() => setOpenTokenModal(true)}>
                <MainListCard alignItems="center" justifyContent="space-between">
                    <IntentsTokenNameWithIcon token={token} variant="body3Strong" typographyStyle={{ flex: 0.6 }} style={{ flex: 1 }} />
                    <IntentsTokenBalance
                        balanceProps={{ variant: "body3Strong", textAlign: "right" }}
                        fiatBalanceProps={{ variant: "body4Strong" }}
                        token={token}
                        style={{ flex: 1 }}
                    />
                </MainListCard>
            </TouchableWithoutFeedback>
            <IntentsTokenDetailsModal token={token} open={openTokenModal} onClose={() => setOpenTokenModal(false)} />
        </Fragment>
    );
};

export default IntentsTokenCard;
