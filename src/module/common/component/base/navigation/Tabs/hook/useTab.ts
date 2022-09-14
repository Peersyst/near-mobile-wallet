import { useTabs } from "@peersyst/react-native-components";

export default function useTab(): number {
    return useTabs()[0];
}
