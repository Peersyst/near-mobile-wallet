import { SelectRoot } from "module/common/component/input/Select/Select.styles";
import { SelectProps as BaseSelectProps } from "@peersyst/react-native-components";
import ModalHeader from "../../navigation/ModalHeader/ModalHeader";
import { useControlled } from "@peersyst/react-hooks";

export interface SelectProps<T> extends Omit<BaseSelectProps<T>, "header" | "footer"> {
    title?: string;
}

function Select<T = any>({ title, label = "", open: openProp, onClose, onOpen, ...rest }: SelectProps<T>): JSX.Element {
    const [open, setOpen] = useControlled(false, openProp, openProp !== undefined ? (openProp ? onClose : onOpen) : undefined);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        // @ts-ignore
        <SelectRoot
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            header={<ModalHeader title={title ?? label} dismissal="hide" onDismiss={handleClose} />}
            label={label}
            {...rest}
        />
    );
}

export default Select;
