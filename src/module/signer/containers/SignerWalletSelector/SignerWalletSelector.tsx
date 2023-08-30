import { useTranslate } from "module/common/hook/useTranslate";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { useRecoilValue, useSetRecoilState } from "recoil";
import signRequestState from "module/signer/state/SignRequestState";
import { useState } from "react";

const SignerWalletSelector = (): JSX.Element => {
    const translate = useTranslate();

    const setSignRequestState = useSetRecoilState(signRequestState);
    const { signerWalletIndex } = useRecoilValue(signRequestState);

    const [selectedWalletIndex, setSelectedWalletIndex] = useState(signerWalletIndex);

    const handleWalletChange = (index: number) => {
        setSelectedWalletIndex(index);
        setSignRequestState((prevState) => ({ ...prevState, signerWalletIndex: index }));
    };

    return <WalletSelector label={translate("signWith")} value={selectedWalletIndex} onChange={handleWalletChange} />;
};

export default SignerWalletSelector;
