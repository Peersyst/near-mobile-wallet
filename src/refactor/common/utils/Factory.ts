export type IFactory<T extends Record<string, any>> = T & {
    init: () => Promise<void>;
    load: () => Promise<() => void>;
};

/**
 * Creates a factory
 * @param modules Modules to be resolved
 */
export default function Factory<T extends Record<string, any>>(modules: Record<keyof T, (resolve: T) => T[keyof T]>): IFactory<T> {
    const resolutions = {} as T;

    const resolve = new Proxy(
        {},
        {
            get: (_target, key: string) => {
                if (resolutions[key]) return resolutions[key];
                else resolutions[key as keyof T] = modules[key](resolve);
                return resolutions[key];
            },
        },
    ) as unknown as T;

    for (const module of Object.keys(modules)) {
        if (resolutions[module]) continue;
        resolutions[module as keyof T] = modules[module](resolve);
    }

    const init = async () => {
        await Promise.all(
            Object.values(resolutions).map((resolution) => {
                if ((resolution as any).onInit) return Promise.resolve((resolution as any).onInit());
            }),
        );
    };

    const load = async () => {
        const results = await Promise.all(
            Object.values(resolutions).map((resolution) => {
                if ((resolution as any).onLoad) return Promise.resolve((resolution as any).onLoad());
            }),
        );
        return () => {
            for (const result of results) {
                if (result) result();
            }
        };
    };

    return { ...resolutions, init, load };
}
