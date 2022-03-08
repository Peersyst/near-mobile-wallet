import { useTabs } from "react-native-components";

export default function useSetTab(): (index: number) => void {
    return useTabs()[1];
}
