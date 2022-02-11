import { Children, Fragment } from "react";
import { View } from "react-native";
import { ColRoot } from "./Col.styles";
import { ColProps } from "./Col.types";

const Col = ({ children: childrenProp, gap, justifyContent, alignItems, style, flex }: ColProps): JSX.Element => {
    const children = Children.toArray(childrenProp).filter((child) => !!child);
    const childrenLength = Children.count(children);

    return (
        <ColRoot style={[{ alignItems, justifyContent, flex }, style]}>
            {Children.map(children, (child, index: number) => (
                <Fragment key={index}>
                    {child}
                    <View style={{ flex: 0, marginBottom: index < childrenLength - 1 ? gap : 0 }} />
                </Fragment>
            ))}
        </ColRoot>
    );
};

export default Col;
