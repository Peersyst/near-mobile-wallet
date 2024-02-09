import useTranslate from "module/common/hook/useTranslate";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import useWalletState from "module/wallet/hook/useWalletState";

const SignerWalletSelector = (): JSX.Element => {
    const translate = useTranslate();

    const { setSelectedWallet, state } = useWalletState();

    const handleWalletChange = (index: number) => {
        setSelectedWallet(index);
    };

    return <WalletSelector label={translate("signWith")} value={state.selectedWallet} onChange={handleWalletChange} />;
};

export default SignerWalletSelector;
