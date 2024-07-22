import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "NEAR Mobile",
    slug: "NEARMobileWallet",
    owner: "peersyst",
    version: "1.7.1",
    orientation: "portrait",
    icon: "./assets/images/near-icon.png",
    scheme: "near-mobile-wallet",
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
            NSFaceIDUsageDescription: "This app uses biometrics to provide a higher level of security",
        },
        splash: { image: "./assets/images/splash.png", resizeMode: "cover", backgroundColor: "#5F8AFA" },
    },
    get android(): ExpoConfig["android"] {
        const versionString = (this.version || "").replace(/\./g, "");
        const versionCodeString = `${versionString}${process.env.BUILD_NUMBER}`.padEnd(8, "0");
        return {
            package: "com.peersyst.nearmobilewallet",
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#5F8AFA",
            },
            versionCode: Number(versionCodeString) || 0,
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
    plugins: [
        ["expo-localization"],
        [
            "expo-build-properties",
            {
                android: {
                    compileSdkVersion: 33,
                    targetSdkVersion: 33,
                },
            },
        ],
    ],
    extra: {
        eas: {
            projectId: "1b97d88a-b249-45d2-8b0d-aa1724191c39",
        },
    },
});
