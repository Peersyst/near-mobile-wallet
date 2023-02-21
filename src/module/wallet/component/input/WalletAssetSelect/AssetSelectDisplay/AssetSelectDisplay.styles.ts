import styled from "@peersyst/react-native-styled";
import { ChevronDownIcon as BaseChevronDownIcon } from "module/common/icons/ChevronDownIcon";

export const ChevronDownIcon = styled(BaseChevronDownIcon)(({ theme }) => ({
    color: theme.palette.gray["300"],
    fontSize: 20,
}));
