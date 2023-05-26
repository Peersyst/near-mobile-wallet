import { Theme } from "@peersyst/react-native-components";

//Base colors
export const blue = "#5F8AFA";
export const green = "#AAD055";
export const gold = "#FFC860";
export const red = "#DB5555";
export const aqua = "#4FD1D9";
export const purple = "#6B6EF9";
export const lilac = "#A463B0";
export const orange = "#E3935B";

//Base gradients
export const gradient: Theme["palette"]["gradient"] = {
    blueTurquoise: [blue, aqua],
    lilacBlue: [lilac, blue],
    lilacOrange: [lilac, orange],
    lilacRed: [lilac, red],
    blueGreen: [blue, green],
    bluePurple: [blue, purple],
    purpleLilac: [purple, lilac],
    purpleTurquoise: [purple, aqua],
    purpleRed: [purple, red],
    redOrange: [red, orange],
    orangeYellow: [orange, gold],
    greenYellow: [green, gold],
};

export const baseTheme: Partial<Theme["palette"]> = {
    primary: blue,
    white: "#FFFFFF",
    black: "#000000",
    blue,
    green,
    gold,
    red,
    aqua,
    purple,
    lilac,
    orange,
    gradient,
    status: {
        info: "#0288D1",
        success: "#3CDF69",
        warning: "#F57C00",
        error: "#D32F2F",
    },
    wallet: [
        gradient.blueTurquoise,
        gradient.purpleLilac,
        gradient.orangeYellow,
        gradient.lilacRed,
        gradient.purpleRed,
        gradient.blueGreen,
        gradient.lilacBlue,
        gradient.lilacOrange,
        gradient.blueGreen,
        gradient.greenYellow,
        gradient.bluePurple,
        gradient.purpleTurquoise,
        gradient.redOrange,
    ],
};

export const WALLET_GRADIENT_LENGTH = baseTheme?.wallet?.length || 0;
