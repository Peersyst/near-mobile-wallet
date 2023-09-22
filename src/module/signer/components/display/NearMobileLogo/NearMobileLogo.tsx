import useWalletGradient from "module/wallet/hook/useWalletGradient";
import { NearMobileLogoRoot, NearLogo } from "./NearMobileLogo.styles";

const NearMobileLogo = (): JSX.Element => {
    const gradient = useWalletGradient();
    return (
        <NearMobileLogoRoot colors={gradient} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
            <NearLogo />
        </NearMobileLogoRoot>
    );
};

export default NearMobileLogo;
