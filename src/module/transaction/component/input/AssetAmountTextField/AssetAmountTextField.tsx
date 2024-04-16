import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { Asset } from "module/wallet/wallet.types";
import { AssetType } from "module/wallet/wallet.types";
import NftAmountTextField from "./NftAmountTextField/NftAmountTextField";
import TokenAmountTextField from "./TokenAmountTextField/TokenAmountTextField";
import NEARAmountWithMaxTextField from "../NEARAmountWithMaxTextField/NEARAmountWithMaxTextField";

export interface AssetAmountTextFieldProps extends Omit<TextFieldProps, "keyboardType" | "validators"> {
    asset: Asset;
    index?: number;
}

const AssetAmountTextField = ({ asset, index, onChange, value, ...rest }: AssetAmountTextFieldProps) => {
    return (
        <>
            {asset.type === AssetType.NATIVE_TOKEN && (
                <NEARAmountWithMaxTextField onChange={onChange} value={value} index={index} {...rest} />
            )}
            {asset.type === AssetType.FT && <TokenAmountTextField onChange={onChange} value={value} token={asset.ft!} {...rest} />}
            {asset.type === AssetType.NFT && <NftAmountTextField {...rest} />}
        </>
    );
};

export default AssetAmountTextField;
