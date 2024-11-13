import { PropsWithChildren } from "react";
import { useRefetchHandler } from "./hooks/useRefetchHandler";
import { usePrefetchQueries } from "./hooks/usePrefetchQueries";
import { useCapture } from "./hooks/useCapture";

export default function RefetchHandler({ children }: PropsWithChildren): JSX.Element {
    useRefetchHandler();
    usePrefetchQueries();
    useCapture();
    return <>{children}</>;
}
