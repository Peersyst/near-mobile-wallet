import { Theme } from "@peersyst/react-native-styled";

export const getCardColor = (colorIndex: number, theme: Theme):string => {
    switch(colorIndex % 6) {
        case 0 :
            return theme.palette.purple;
        case 1 :
            return theme.palette.turquoise;
        case 2 :
            return theme.palette.violet;
        case 3 : 
            return theme.palette.pink;
        case 4 : 
            return theme.palette.blue;
        default : 
            return theme.palette.gold;
    }
}