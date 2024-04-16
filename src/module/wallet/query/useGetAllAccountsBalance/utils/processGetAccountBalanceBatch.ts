import { BalanceOperations, convertNearToYocto, NearSDKService } from "near-peersyst-sdk";

export default async function processGetAccountBalanceBatch(instances: NearSDKService[]): Promise<string> {
    let acc = "0";

    const batchBalanceRequests = await Promise.all(
        instances.map(async (serviceInstance) => {
            try {
                const balance = await serviceInstance.getAccountBalance();
                return convertNearToYocto(balance.available);
            } catch (error) {
                return "0";
            }
        }),
    );

    for (const balanceRequest of batchBalanceRequests) {
        acc = BalanceOperations.BNAdd(balanceRequest, acc);
    }

    return acc;
}
