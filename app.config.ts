import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "NEAR Mobile Wallet",
    slug: "NEARMobileWallet",
    owner: "peersyst",
    version: "1.1.3",
    orientation: "portrait",
    icon: "./assets/images/near-icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#5F8AFA",
    },
    updates: {
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        supportsTablet: false,
        bundleIdentifier: "com.peersyst.nearmobilewallet",
        buildNumber: process.env.BUILD_NUMBER || "0",
        config: {
            usesNonExemptEncryption: false,
        },
        icon: "./assets/images/adaptive-icon.png",
        infoPlist: {
            NSCameraUsageDescription: "This app uses camera for QR code scanning.",
        },
        splash: { image: "./assets/images/splash.png", resizeMode: "cover", backgroundColor: "#5F8AFA" },
    },
    extra: {
        eas: {
            projectId: "1b97d88a-b249-45d2-8b0d-aa1724191c39",
        },
    },
    get android(): ExpoConfig["android"] {
        return {
            package: "com.peersyst.nearmobilewallet",
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#5F8AFA",
            },
            versionCode: Number((this.version || "").replace(/\./g, "") + process.env.BUILD_NUMBER) || 0,
            softwareKeyboardLayoutMode: "resize",
            splash: {
                image: "./assets/images/splash.png",
                resizeMode: "cover",
                backgroundColor: "#5F8AFA",
            },
        };
    },
    web: {
        favicon: "./assets/images/favicon.png",
    },
    extra: {
        eas: {
            projectId: "1b97d88a-b249-45d2-8b0d-aa1724191c39",
        },
    },
});
