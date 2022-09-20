import { ChipProps } from "module/common/component/display/Chip/Chip.types";
import Chip from "module/common/component/display/Chip/Chip";
import { Col, Row } from "@peersyst/react-native-components";

export interface MnemonicListProps {
    mnemonic: string[];
    appearance?: ChipProps["appearance"];
    onPress?: (item: string) => unknown;
}

const MnemonicList = ({ mnemonic, appearance = "light", onPress }: MnemonicListProps): JSX.Element => {
    return (
        <Col gap={15} alignItems="center" style={{ marginTop: -15 }}>
            <Row gap={15} wrap justifyContent="center">
                {mnemonic.map((word, key) => (
                    <Chip key={key} label={word} onPress={() => onPress?.(word)} appearance={appearance} style={{ marginTop: 15 }} />
                ))}
            </Row>
        </Col>
    );
};

export default MnemonicList;
