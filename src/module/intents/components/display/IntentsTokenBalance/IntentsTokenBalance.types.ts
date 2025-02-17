import { IntentsTokenBalance } from "near-peersyst-sdk";
import { FiatBalanceProps } from "module/wallet/component/display/FiatBalance/FiatBalance";
import { DimensionValue, FlexAlignType, ViewStyle } from "react-native";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";

export interface IntentsTokenBalanceProps {
    token: IntentsTokenBalance;
    alignItems?: FlexAlignType | undefined;
    gap?: DimensionValue | undefined;
    balanceProps?: Omit<BalanceProps, "balance">;
    fiatBalanceProps?: Omit<FiatBalanceProps, "balance">;
    style?: ViewStyle;
}
