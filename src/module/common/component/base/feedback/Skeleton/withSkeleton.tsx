import { ComponentType } from "react";
import Skeleton from "./Skeleton";
import { WithLoading, WithSkeletonProps } from "./Skeleton.types";

// eslint-disable-next-line @typescript-eslint/ban-types
export function withSkeleton<TProps = {}>(
    WrappedComponent: ComponentType<TProps>,
    skeletonProps?: WithSkeletonProps,
): ComponentType<WithLoading<TProps>> {
    // eslint-disable-next-line react/display-name
    return ({ loading = false, ...componentProps }: WithLoading<any>) => {
        return (
            <Skeleton loading={loading} {...skeletonProps}>
                <WrappedComponent loading={loading} {...componentProps} />
            </Skeleton>
        );
    };
}
