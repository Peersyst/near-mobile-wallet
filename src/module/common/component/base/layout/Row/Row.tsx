import { Children, Fragment } from "react";
import { RowRoot } from "./Row.styles";
import { RowProps } from "./Row.types";
import { View } from "react-native";

const Row = ({ children: childrenProp, gap, justifyContent, alignItems, style, flex }: RowProps): JSX.Element => {
    const children = Children.toArray(childrenProp).filter((child) => !!child);
    const childrenLength = Children.count(children);

    return (
        <RowRoot style={[{ alignItems, justifyContent, flex }, style]}>
            {Children.map(children, (child, index: number) => (
                <Fragment key={index}>
                    {child}
                    <View style={{ flex: 0, marginRight: index < childrenLength - 1 ? gap : 0 }} />
                </Fragment>
            ))}
        </RowRoot>
    );
};

export default Row;
