import Typography, { TypographyProps } from "module/common/component/display/Typography/Typography";
import Balance from "module/wallet/component/display/Balance/Balance";
import useGetBalance from "module/wallet/query/useGetBalance";
import { AssetType } from "module/wallet/wallet.types";
import { useAssetSelect } from "../hook/useAssetSelect";

export interface AssetSelectDisplayProps {
    onPress: () => void;
}

export type AssetValueDisplayProps = Omit<TypographyProps, "children">;

export const AssetValueDisplay = ({ ...rest }: AssetValueDisplayProps): JSX.Element => {
    const { index, asset } = useAssetSelect();
    const { data: { available } = { available: "0" } } = useGetBalance(index);
    const { type, nft, ft } = asset ?? {};
    return (
        <>
            {type === AssetType.NFT && (
                <Typography numberOfLines={1} {...rest}>
                    {nft?.metadata.title}
                </Typography>
            )}
            {type === AssetType.FT && <Balance units={ft?.metadata.symbol} balance={ft?.balance ?? "0"} {...rest} />}
            {type === AssetType.TOKEN && <Balance units="token" balance={available} {...rest} />}
        </>
    );
};

export default AssetValueDisplay;
