import { FeeRate } from "@peersyst/ckb-peersyst-sdk";
import { FeeType } from "module/settings/state/SettingsState";

export default function (feeType: FeeType): Promise<string> {
    return new Promise((resolve) =>
        setTimeout(() => {
            if (feeType === FeeRate.SLOW) resolve("5");
            else if (feeType === FeeRate.NORMAL) resolve("10");
            else resolve("20");
        }, 1000),
    );
}
