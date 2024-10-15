import { PropsWithChildren } from "react";
import { useRefetchHandler } from "./hooks/useRefetchHandler";

export default function RefetchHandler({ children }: PropsWithChildren): JSX.Element {
    useRefetchHandler();
    return <>{children}</>;
}
