import { ExpoConfig, ConfigContext } from "@expo/config";
import "dotenv/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "CKBull",
    slug: "CKBull",
    owner: "peersyst",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/ckbull-icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
    },
    updates: {
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.peersyst.ckbull",
    },
    android: {
        package: "com.peersyst.ckbull",
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#ffffff",
        },
    },
    web: {
        favicon: "./assets/images/favicon.png",
    },
});
