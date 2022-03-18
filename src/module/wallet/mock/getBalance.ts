//eslint-disable-next-line
export default function (address: string): Promise<string> {
    return new Promise((resolve) => setTimeout(() => resolve("10400"), 2000));
}
