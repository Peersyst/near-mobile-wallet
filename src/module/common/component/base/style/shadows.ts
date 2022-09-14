import { Shadow } from "@peersyst/react-native-components";

function createShadow(x: number, y: number, r: number, o: number, e?: number): Shadow {
    return {
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: o,
        shadowOffset: {
            width: x,
            height: y,
        },
        shadowRadius: r,
        elevation: e,
    };
}

const shadows: Shadow[] = [
    createShadow(0, 0, 0, 0, 0),
    createShadow(0, 1, 1, 0.18, 1),
    createShadow(0, 1, 1.41, 0.2, 2),
    createShadow(0, 1, 2.22, 0.22, 3),
    createShadow(0, 2, 2.62, 0.23, 4),
    createShadow(0, 2, 3.84, 0.25, 5),
    createShadow(0, 3, 4.65, 0.27, 6),
    createShadow(0, 3, 4.65, 0.29, 7),
    createShadow(0, 4, 4.65, 0.3, 8),
    createShadow(0, 4, 5.46, 0.32, 9),
    createShadow(0, 5, 6.27, 0.34, 10),
    createShadow(0, 5, 6.68, 0.36, 11),
    createShadow(0, 6, 7.49, 0.37, 12),
    createShadow(0, 6, 8.3, 0.39, 13),
    createShadow(0, 7, 9.11, 0.41, 14),
    createShadow(0, 7, 9.51, 0.43, 15),
    createShadow(0, 8, 10.32, 0.44, 16),
    createShadow(0, 8, 11.14, 0.46, 17),
    createShadow(0, 9, 11.95, 0.48, 18),
    createShadow(0, 9, 12.35, 0.5, 19),
    createShadow(0, 10, 13.16, 0.51, 20),
    createShadow(0, 10, 13.97, 0.53, 21),
    createShadow(0, 11, 14.78, 0.55, 22),
    createShadow(0, 11, 15.19, 0.57, 23),
    createShadow(0, 12, 16, 0.58, 24),
];

export default shadows;
