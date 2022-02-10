export interface Theme {
    readonly palette: {
        primary: string;
        white: string;
        black: string;
        fullBlack: string;
        darkGray: string;
        darkerGray: string;
        darkFont: string;
        gray: string;
        lightGray: string;
        lighterGray:string;
        turquoise: string;
        gold: string;
        violet: string;
        pink: string;
        blue: string;
        purple: string;
        red: string;
    };
    readonly borders: {
        chipBorder: number;
    }
}
