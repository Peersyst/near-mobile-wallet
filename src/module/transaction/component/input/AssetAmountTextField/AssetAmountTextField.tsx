import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { Asset } from "module/wallet/component/input/WalletAssetSelect/WalletAssetSelect.types";
import { AssetType } from "module/wallet/wallet.types";
import NEARAmountTextField from "./NEARAmountTextField/NEARAmountTextField";
import NftAmountTextField from "./NftAmountTextField/NftAmountTextField";
import TokenAmountTextField from "./TokenAmountTextField/TokenAmountTextField";

export interface AssetAmountTextFieldProps extends Omit<TextFieldProps, "keyboardType" | "validators"> {
    asset: Asset;
    index?: number;
}

const AssetAmountTextField = ({ asset, index = 0, onChange, value, ...rest }: AssetAmountTextFieldProps) => {
    return (
        <>
            {asset.type === AssetType.TOKEN && <NEARAmountTextField onChange={onChange} value={value} index={index} {...rest} />}
            {asset.type === AssetType.FT && <TokenAmountTextField onChange={onChange} value={value} ft={asset.ft!} {...rest} />}
            {asset.type === AssetType.NFT && <NftAmountTextField {...rest} />}
        </>
    );
};

export default AssetAmountTextField;
