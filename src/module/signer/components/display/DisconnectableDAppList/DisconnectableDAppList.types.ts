import { DApp } from "module/signer/types";

export interface DisconnectableDAppListProps {
    dapps: DApp[] | undefined;
    loading?: boolean;
}
