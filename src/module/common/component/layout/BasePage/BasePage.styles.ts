import styled from "@peersyst/react-native-styled";
import { SafeAreaView } from "react-native";

export const BasePageRoot = styled(SafeAreaView)(({ theme }) => ({ flex: 1, backgroundColor: theme.palette.background }));
