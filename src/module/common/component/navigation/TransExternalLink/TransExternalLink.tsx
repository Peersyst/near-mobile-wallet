import ExternalLink from "../ExternalLink/ExternalLink";
import { TransExternalLinkProps } from "./TransExternalLink.types";

function TransExternalLink({ children, ...rest }: TransExternalLinkProps): JSX.Element {
    return <ExternalLink {...rest}>{children?.[0] ?? ""}</ExternalLink>;
}

export default TransExternalLink;
