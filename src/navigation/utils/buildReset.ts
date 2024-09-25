// There are anys because react navigation is so badly typed

export type ResetRoute<RouteName extends keyof ReactNavigation.RootParamList = keyof ReactNavigation.RootParamList> =
    | RouteName
    | { name: RouteName; params?: ReactNavigation.RootParamList[RouteName] };

function dissectRoute<RouteName extends keyof ReactNavigation.RootParamList = keyof ReactNavigation.RootParamList>(
    route: ResetRoute,
): { name: RouteName; params?: ReactNavigation.RootParamList[RouteName] } {
    if (typeof route === "string") {
        return { name: route as RouteName };
    } else {
        return route as { name: RouteName; params?: ReactNavigation.RootParamList[RouteName] };
    }
}

function buildRoutes(...routes: (ResetRoute | ResetRoute[])[]): any[] {
    const [route, ...nestedRoutes] = routes;
    if (Array.isArray(route)) {
        return route.map((r, i) => {
            const { name, params } = dissectRoute(r);
            return {
                name,
                params,
                state: i === route.length - 1 ? { routes: nestedRoutes.length > 0 ? buildRoutes(...nestedRoutes) : [] } : undefined,
            };
        });
    } else {
        const { name, params } = dissectRoute(route);

        return [
            {
                name,
                params,
                state: {
                    routes: nestedRoutes.length > 0 ? buildRoutes(...nestedRoutes) : [],
                },
            },
        ];
    }
}

/**
 * Builds the object used to call navigation.reset
 * @param route First mandatory route
 * @param nestedRoutes Other nested routes
 */
export default function buildReset(route: ResetRoute, ...nestedRoutes: (ResetRoute | ResetRoute[])[]): any {
    const { name, params } = dissectRoute(route);

    return {
        index: 0,
        routes: [
            {
                name,
                params,
                state: {
                    routes: nestedRoutes.length > 0 ? buildRoutes(...nestedRoutes) : [],
                },
            },
        ],
    };
}
