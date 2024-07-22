import { ExternalLinkProps } from "../ExternalLink/ExternalLink.types";

export type TransExternalLinkProps = Omit<ExternalLinkProps, "children"> & {
    children?: string[];
};
