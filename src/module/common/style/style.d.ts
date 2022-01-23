import "styled-components";
import "styled-components/cssprop";
import { CSSProp } from "styled-components";
import { Theme } from "module/common/style/theme.types";

// Type styled components theme with our components theme
declare module "styled-components" {
    // eslint-disable-next-line
    export interface DefaultTheme extends Theme {}
}

// Use css prop in components
declare module "react" {
    export interface Attributes {
        css?: CSSProp<Theme>;
    }
}
