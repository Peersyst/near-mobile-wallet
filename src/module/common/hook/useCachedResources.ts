import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Manrope_300Light, Manrope_400Regular, Manrope_600SemiBold } from "@expo-google-fonts/manrope";

export default function useCachedResources(): boolean {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                // Load fonts
                await Font.loadAsync({
                    Manrope_300Light,
                    Manrope_400Regular,
                    Manrope_600SemiBold,
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                // eslint-disable-next-line no-console
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
