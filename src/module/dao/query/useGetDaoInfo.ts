import { useQuery } from "react-query";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { config } from "config";

export interface DaoInfo {
    total_deposit: string;
    depositors_count: "149";
    deposit_changes: string;
    unclaimed_compensation_changes: string;
    claimed_compensation_changes: string;
    depositor_changes: string;
    unclaimed_compensation: string;
    claimed_compensation: string;
    average_deposit_time: string;
    mining_reward: string;
    deposit_compensation: string;
    treasury_amount: string;
    estimated_apc: string;
}

export interface DaoInfoRequest {
    data: {
        id: string;
        type: string;
        attributes: DaoInfo;
    };
}

export default function () {
    const network = useSelectedNetwork();

    return useQuery(["dao-info", network], async () => {
        const api = network === "testnet" ? config.testnetExplorerApi : config.mainnetExplorerApi;
        const headers = new Headers();
        headers.append("Content-Type", "application/vnd.api+json");
        headers.append("Accept", "application/vnd.api+json");
        const res = await fetch(api + "contracts/nervos_dao", { headers });
        const data = (await res.json()) as DaoInfoRequest;
        return data.data.attributes;
    });
}
