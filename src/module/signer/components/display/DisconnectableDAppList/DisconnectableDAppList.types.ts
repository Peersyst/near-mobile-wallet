import { ListProps } from "@peersyst/react-native-components";
import { DApp } from "module/signer/types";

export interface DisconnectableDAppListProps extends Omit<ListProps, "data" | "renderItem"> {
    dapps: DApp[] | undefined;
}
