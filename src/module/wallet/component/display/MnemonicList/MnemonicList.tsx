import { ChipProps } from "module/common/component/display/Chip/Chip.types";
import Chip from "module/common/component/display/Chip/Chip";
import { Col, Row } from "react-native-components";

export interface MnemonicListProps {
    mnemonic: string[];
    appearance?: ChipProps["appearance"];
    onPress?: (item: string) => unknown;
}

const MnemonicList = ({ mnemonic, appearance = "light", onPress }: MnemonicListProps): JSX.Element => {
    const rows = Math.ceil(mnemonic.length / 3);
    return (
        <Col gap={15} alignItems="center">
            {[...Array(rows)].map((_, i) => {
                const j = i * 3;
                return (
                    <Row gap={15} key={i}>
                        {mnemonic[j] && <Chip label={mnemonic[j]} appearance={appearance} onPress={() => onPress?.(mnemonic[j])} />}
                        {mnemonic[j + 1] && (
                            <Chip label={mnemonic[j + 1]} appearance={appearance} onPress={() => onPress?.(mnemonic[j + 1])} />
                        )}
                        {mnemonic[j + 2] && (
                            <Chip label={mnemonic[j + 2]} appearance={appearance} onPress={() => onPress?.(mnemonic[j + 2])} />
                        )}
                    </Row>
                );
            })}
        </Col>
    );
};

export default MnemonicList;
