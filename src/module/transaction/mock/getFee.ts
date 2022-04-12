import { FeeRate, FeeType } from "module/settings/state/SettingsState";

export default function (feeType: FeeType): Promise<string> {
    return new Promise((resolve) =>
        setTimeout(() => {
            if (feeType === FeeRate.SLOW) resolve("5");
            else if (feeType === FeeRate.AVERAGE) resolve("10");
            else resolve("20");
        }, 1000),
    );
}
