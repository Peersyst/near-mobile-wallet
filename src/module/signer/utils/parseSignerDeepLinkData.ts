import * as Linking from "expo-linking";
import { SignerModalType } from "../hooks/useSignerModal";

export const parseSignerDeepLinkData = (url: string) => {
    const { path } = Linking.parse(url);

    if (!path) return undefined;
    const rootPath = path?.split("/");

    if (rootPath.length == 2) {
        if (rootPath[0] !== SignerModalType.MESSAGE && rootPath[0] !== SignerModalType.REQUEST) return undefined;
        return {
            type: rootPath[0] as SignerModalType,
            id: rootPath[1] as string,
        };
    }
    return undefined;
};
