import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { Asset } from "module/wallet/component/input/WalletAssetSelect/WalletAssetSelect.types";
import { AssetType } from "module/wallet/wallet.types";
import NEARAmountInput from "./NEARAmountInput/NEARAmountInput";
import TokenAmountInput from "./TokenAmountInput/TokenAmountInput";

export interface AssetAmountInputProps extends Omit<TextFieldProps, "keyboardType" | "validators"> {
    asset: Asset;
    index?: number;
}

const AssetAmountInput = ({ asset, index = 0, ...rest }: AssetAmountInputProps) => {
    return (
        <>
            {asset.type === AssetType.TOKEN && <NEARAmountInput index={index} {...rest} />}
            {asset.type === AssetType.FT && <TokenAmountInput ft={asset.ft!} {...rest} />}
        </>
    );
};

export default AssetAmountInput;
