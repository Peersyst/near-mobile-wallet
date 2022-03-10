import styled from "@peersyst/react-native-styled";
import { Paper, Tab } from "react-native-components";
import { ViewStyle } from "react-native";

export const MainTabRoot = styled(Tab)(() => ({
    flex: 1,
}));

export interface MainTabContentProps {
    active: boolean;
}

export const MainTabContent = styled(Paper)<MainTabContentProps>(({ active }) => {
    const style: ViewStyle = active
        ? {
              shadowOffset: {
                  height: -3,
                  width: 0,
              },
              shadowRadius: 2,
              shadowOpacity: 0.15,
          }
        : {
              backgroundColor: "transparent",
              shadowOffset: {
                  height: 0,
                  width: 0,
              },
          };

    return {
        padding: 10,
        zIndex: 1,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        ...style,
    };
});
