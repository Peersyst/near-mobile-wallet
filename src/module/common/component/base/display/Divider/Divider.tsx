import { DividerRoot, DividerWithChildren } from "./Divider.styles";
import { DividerProps } from "./Divider.types";

export default function Divider({ size = 1, width: widthProp = "full-width", style, color, children }: DividerProps): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { backgroundColor, width, height, minWidth, minHeight, maxHeight, maxWidth, ...restStyle } = style || {};
    const divStyle = { backgroundColor, minWidth, minHeight, maxHeight, maxWidth };

    return (
        <>
            {children ? (
                <DividerWithChildren width={widthProp} style={restStyle}>
                    <DividerRoot height={size} color={color} width="full-width" style={divStyle} />
                    {children}
                    <DividerRoot height={size} color={color} width="full-width" style={divStyle} />
                </DividerWithChildren>
            ) : (
                <DividerRoot height={size} color={color} width={widthProp} style={style} />
            )}
        </>
    );
}
