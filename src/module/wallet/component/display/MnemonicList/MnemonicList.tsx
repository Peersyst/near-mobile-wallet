import { ChipProps } from "module/common/component/display/Chip/Chip.types";
import Chip from "module/common/component/display/Chip/Chip";
import { Col, Row } from "@peersyst/react-native-components";

export interface MnemonicListProps {
    mnemonic: string[];
    variant?: ChipProps["variant"];
    onPress?: (item: string) => unknown;
}

const MnemonicList = ({ mnemonic, variant = "outlined", onPress }: MnemonicListProps): JSX.Element => {
    return (
        <Col gap={10} alignItems="center" style={{ marginTop: -15 }}>
            <Row gap={4} wrap justifyContent="center">
                {mnemonic.map((word, key) => (
                    <Chip key={key} label={word} onPress={() => onPress?.(word)} variant={variant} style={{ marginTop: 15 }} />
                ))}
            </Row>
        </Col>
    );
};

export default MnemonicList;
