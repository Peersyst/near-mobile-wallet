import { useTheme } from "@peersyst/react-native-styled";
import { Row } from "@peersyst/react-native-components";
import ColorSample from "module/common/component/display/ColorSample/ColorSample";
import { useControlled } from "@peersyst/react-hooks";

export interface ColoPickerProps {
    defaultValue?: string;
    value?: string;
    onColorPicked?: (color: string) => void;
}

const ColorPicker = ({ defaultValue, value, onColorPicked }: ColoPickerProps): JSX.Element => {
    const [pickedColor, setPickedColorColor] = useControlled(defaultValue || "", value, onColorPicked);

    const handleColorPick = (color: string) => {
        setPickedColorColor(color);
        onColorPicked?.(color);
    };

    const {
        palette: { wallet: walletColors },
    } = useTheme();

    return (
        <Row alignItems="center" justifyContent="center" gap="6%">
            {walletColors.map((color, key) => (
                <ColorSample color={color} active={pickedColor === color} onPress={handleColorPick} key={key} />
            ))}
        </Row>
    );
};

export default ColorPicker;
