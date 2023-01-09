import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { Asset } from "module/wallet/component/input/WalletAssetSelect/WalletAssetSelect.types";
import { AssetType } from "module/wallet/wallet.types";
import NEARAmountInput from "./NEARAmountInput/NEARAmountInput";
import NftAmountInput from "./NftAmountInput/NftAmountInput";
import TokenAmountInput from "./TokenAmountInput/TokenAmountInput";

export interface AssetAmountInputProps extends Omit<TextFieldProps, "keyboardType" | "validators"> {
    asset: Asset;
    index?: number;
}

const AssetAmountInput = ({ asset, index = 0, onChange, value, ...rest }: AssetAmountInputProps) => {
    return (
        <>
            {asset.type === AssetType.TOKEN && <NEARAmountInput onChange={onChange} value={value} index={index} {...rest} />}
            {asset.type === AssetType.FT && <TokenAmountInput onChange={onChange} value={value} ft={asset.ft!} {...rest} />}
            {asset.type === AssetType.NFT && <NftAmountInput {...rest} />}
        </>
    );
};

export default AssetAmountInput;
