import { config } from "config";
import { TypographyVariant } from "config/theme/typography";
import Typography, { TypographyProps } from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import Balance from "module/wallet/component/display/Balance/Balance";

export interface FeeProps {
    typographyVariant: TypographyVariant;
    fee?: string;
    style?: TypographyProps["style"];
}

const Fee = ({ typographyVariant, fee, style }: FeeProps) => {
    const translate = useTranslate();
    return (
        <Typography variant={`${typographyVariant}Regular`} light textAlign="center" style={style}>
            {translate("transaction_fee_label")}
            {" · "}
            <Balance
                balance={fee ?? config.estimatedFee}
                variant={`${typographyVariant}Strong`}
                units="token"
                light
                options={{
                    maximumFractionDigits: config.maxNumberOfDecimals,
                    minimumFractionDigits: config.maxNumberOfDecimals,
                }}
            />
        </Typography>
    );
};

export default Fee;
