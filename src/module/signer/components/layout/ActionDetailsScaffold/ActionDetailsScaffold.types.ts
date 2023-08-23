import { ReactChild } from "@peersyst/react-types";
import { PropsWithChildren } from "react";

export interface ActionDetailsScaffoldProps extends PropsWithChildren {
    header: ReactChild;
    description?: ReactChild;
}
