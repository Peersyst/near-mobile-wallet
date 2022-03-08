import { ChipProps } from "module/common/component/display/Chip/Chip.types";
import Chip from "module/common/component/display/Chip/Chip";
import { FlatList } from "react-native";

export interface MnemonicListProps {
    mnemonic: string[];
    appearance?: ChipProps["appearance"];
    onPress?: (item: string) => unknown;
}

const MnemonicList = ({ mnemonic, appearance = "light", onPress }: MnemonicListProps): JSX.Element => (
    <FlatList
        data={mnemonic}
        renderItem={({ item, index }) => (
            <Chip label={item} style={{ marginLeft: index % 3 === 0 ? 0 : 15 }} appearance={appearance} onPress={() => onPress?.(item)} />
        )}
        keyExtractor={(item, index) => item + index}
        style={{ overflow: "visible" }}
        numColumns={3}
        columnWrapperStyle={{ marginBottom: 15, justifyContent: "center" }}
    />
);

export default MnemonicList;
