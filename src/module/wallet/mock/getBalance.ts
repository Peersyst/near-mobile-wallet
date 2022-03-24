//eslint-disable-next-line
export default function (address: string): Promise<string> {
    return new Promise((resolve) => setTimeout(() => resolve((Math.random() * 1234.56).toFixed(6)), 2000));
}
