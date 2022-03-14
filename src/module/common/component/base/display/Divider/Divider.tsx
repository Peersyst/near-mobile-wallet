import { DividerRoot, DividerWithChildren } from "./Divider.styles";
import { DividerProps } from "./Divider.types";

export default function Divider({ size = 1, width = "full-width", style, color, children }: DividerProps): JSX.Element {
    return (
        <>
            {children ? (
                <DividerWithChildren width={width} style={style}>
                    <DividerRoot height={size} color={color} width="full-width" />
                    {children}
                    <DividerRoot height={size} color={color} width="full-width" />
                </DividerWithChildren>
            ) : (
                <DividerRoot height={size} color={color} width={width} style={style} />
            )}
        </>
    );
}
