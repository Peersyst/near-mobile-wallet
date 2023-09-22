import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";

import { MainStackParamsList } from "stack-navigator";

const prefix = Linking.createURL("/");

const linking: LinkingOptions<MainStackParamsList> = {
    prefixes: [prefix],
    config: {
        screens: {
            [MainScreens.MAIN]: {
                screens: {
                    /**
                     * type: request | message
                     * id: the identifier of the request or message request
                     */
                    [MainScreens.HOME]: "sign/:type/:id",
                },
            },
        },
    },
};

export default linking;
