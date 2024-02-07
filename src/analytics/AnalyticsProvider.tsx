import { config } from "config";
// import { PostHogProvider } from "posthog-react-native";
import { PropsWithChildren } from "react";
import { View } from "react-native";

export function AnalyticsProvider({ children }: PropsWithChildren): JSX.Element {
    return (
        // <PostHogProvider
        //     apiKey={config.analytics.apiKey}
        //     options={{
        //         host: config.analytics.host,
        //     }}
        // >
        //     {children}
        // </PostHogProvider>
        <>{children}</>
    );
}
