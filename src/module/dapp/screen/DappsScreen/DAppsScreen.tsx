import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";

import DisconnectableDApp from "module/signer/components/feedback/DisconnectableDApp/DisconnectableDApp";
import { DAppTag } from "module/signer/types";

const DAppsScreen = (): JSX.Element => {
    return (
        <BaseMainScreen>
            <DisconnectableDApp
                dapp={{
                    name: "Coinbase",
                    description:
                        "Ref Finance is a community-led, multi-purpose Decentralized Finance (DeFi) platform built on NEAR Protocol.",
                    url: "https://google.com",
                    logoUrl:
                        "data:image/png;base64,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",
                    tag: DAppTag.DEX,
                }}
            />
        </BaseMainScreen>
    );
};

export default DAppsScreen;
