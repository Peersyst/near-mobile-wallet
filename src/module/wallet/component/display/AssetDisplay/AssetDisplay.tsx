import Typography, { TypographyProps } from "module/common/component/display/Typography/Typography";
import { AssetType } from "module/wallet/wallet.types";
import Balance from "../Balance/Balance";
import { BalanceProps } from "../Balance/Balance.types";

export interface AssetDisplayProps extends TypographyProps {
    type: AssetType;
    name?: string; // Used for nfts
    units?: BalanceProps["units"]; // Used for ft and token (near)
    balance?: BalanceProps["balance"]; // Used for ft and token (near)
}

const AssetDisplay = ({ type, name, balance, units, ...rest }: AssetDisplayProps) => {
    return type === AssetType.NFT ? <Typography {...rest}>{name}</Typography> : <Balance units={units} balance={balance ?? 0} {...rest} />;
};

export default AssetDisplay;
