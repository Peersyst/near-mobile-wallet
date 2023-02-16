import Color from "color";
import useWalletGradient from "./useWalletGradient";

export default function (index?: number): string {
    const gradient = useWalletGradient(index);

    const firstColor = new Color(gradient[0]);
    const firstColorIsRed = firstColor.keyword().includes("red");

    return firstColorIsRed ? gradient[1] : gradient[0];
}
