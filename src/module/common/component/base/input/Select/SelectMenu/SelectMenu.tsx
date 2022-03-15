import { Children, useContext } from "react";
import { SelectItemsView, SelectMenuRoot } from "./SelectMenu.styles";
import { SelectMenuProps } from "./SelectMenu.types";
import { Modal as RNModal } from "react-native";
import { SelectContext } from "module/common/component/base/input/Select/SelectContext";
import { List } from "module/common/component/base";

export default function SelectMenu({ open, style, header, footer, children }: SelectMenuProps): JSX.Element {
    const { setOpen } = useContext(SelectContext);

    return (
        <RNModal visible={open} transparent>
            <SelectMenuRoot style={style} onExited={() => setOpen(false)}>
                {header}
                <SelectItemsView itemCount={Children.count(children)}>
                    <List
                        data={Children.toArray(children)}
                        renderItem={({ item }) => item}
                        contentContainerStyle={{ paddingTop: header ? 0 : 20, paddingBottom: footer ? 0 : 20 }}
                    />
                </SelectItemsView>
                {footer}
            </SelectMenuRoot>
        </RNModal>
    );
}
