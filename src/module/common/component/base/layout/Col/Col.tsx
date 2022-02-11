import { ReactNode, Children } from "react";
import { View } from "react-native";
import { ColRoot } from "./Col.styles";
import { ColProps } from "./Col.types";

const Col = ({ children: childrenProp, gap, justifyContent, alignItems, style, flex }: ColProps): JSX.Element => {
    const children = Children.toArray(childrenProp).filter((child) => !!child);
    const childrenLength = Children.count(children);

    return (
        <ColRoot style={[{ alignItems, justifyContent, flex }, style]}>
            {Children.map(children, (child: ReactNode, index: number) => (
                <View style={{ marginBottom: index < childrenLength - 1 ? gap : 0 }} key={index}>
                    {child}
                </View>
            ))}
        </ColRoot>
    );
};

export default Col;
