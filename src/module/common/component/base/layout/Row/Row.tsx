import { ReactNode, Children } from "react";
import { View } from "react-native";
import { RowRoot } from "./Row.styles";
import { RowProps } from "./Row.types";

const Row = ({ children: childrenProp, gap, justifyContent, alignItems, style, flex }: RowProps): JSX.Element => {
    const children = Children.toArray(childrenProp).filter((child) => !!child);
    const childrenLength = Children.count(children);

    return (
        <RowRoot style={[{ alignItems, justifyContent, flex }, style]}>
            {Children.map(children, (child: ReactNode, index: number) => (
                <View style={{ marginRight: index < childrenLength - 1 ? gap : 0 }} key={index}>
                    {child}
                </View>
            ))}
        </RowRoot>
    );
};

export default Row;
