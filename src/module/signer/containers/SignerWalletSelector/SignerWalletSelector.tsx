import { useTranslate } from "module/common/hook/useTranslate";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";

import { useSignerWalletIndex } from "../../context/SignerModalContext";

const SignerWalletSelector = (): JSX.Element => {
    const translate = useTranslate();

    const [signerWalletIndex, setSignerWalletIndex] = useSignerWalletIndex();

    const handleWalletChange = (index: number) => {
        setSignerWalletIndex(index);
    };

    return <WalletSelector label={translate("signWith")} value={signerWalletIndex} onChange={handleWalletChange} />;
};

export default SignerWalletSelector;
