import styled from "@peersyst/react-native-styled";
import Select, { SelectProps } from "module/common/component/input/Select/Select";
import { TokenSelectorRootProps } from "module/token/component/input/TokenSelector/TokenSelector.types";

// HOC Select needed to use styled with generic type as string;
const HOStringSelect = (props: SelectProps<string>) => <Select {...props} />;

export const TokenSelectorRoot = styled(HOStringSelect)<TokenSelectorRootProps>(({ theme, variant }) => ({
    component: {
        display: {
            paddingHorizontal: 0,
            height: "auto",
            width: "auto",
            borderWidth: 0,
            ...theme.typography[variant],
        },
    },
}));
