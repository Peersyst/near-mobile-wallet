import { LoadingIcon, LoadingRoot } from "./Loading.styles";
import { LoadingProps } from "./Loading.types";

export function Loading({ size = "lg" }: LoadingProps): JSX.Element {
    return (
        <LoadingRoot size={size}>
            <LoadingIcon />
        </LoadingRoot>
    );
}
