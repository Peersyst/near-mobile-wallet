import { PropsWithChildren } from "react";
import { useRefetchHandler } from "./hooks/useRefetchHandler";
import { usePrefetchQueries } from "./hooks/usePrefetchQueries";

export default function RefetchHandler({ children }: PropsWithChildren): JSX.Element {
    useRefetchHandler();
    usePrefetchQueries();

    return <>{children}</>;
}
