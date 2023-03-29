import { AppCurrency } from "../Balance.types";
import { config } from "config";

export const CURRENCY_UNIT: Record<AppCurrency, string> = {
    token: config.tokenName,
    cny: "¥",
    usd: "$",
    eur: "€",
    jpy: "¥",
    gbp: "£",
    rub: "₽",
    uah: "₴",
    idr: "Rp",
};
