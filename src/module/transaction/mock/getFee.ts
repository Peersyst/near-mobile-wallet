import { FeeRate, FeeType } from "module/settings/state/SettingsState";

export default function (feeType: FeeType): Promise<string> {
    return new Promise((resolve) =>
        setTimeout(() => {
            if (feeType === FeeRate.SLOW) resolve("500");
            else if (feeType === FeeRate.AVERAGE) resolve("500");
            else resolve("500");
        }, 1000),
    );
}
