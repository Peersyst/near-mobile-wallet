import { AppCurrency } from "../Balance.types";
import { config } from "config";

export const getCurrencyUnit: Record<AppCurrency, string> = {
    token: config.tokenName,
    cny: "¥",
    usd: "$",
    eur: "€",
    jpy: "¥",
    gbp: "£",
};
