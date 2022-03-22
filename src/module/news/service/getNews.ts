import { NewType } from "../types";

const News: NewType[] = [...Array(5)].map((_, i) => ({
    imageUri: "https://pbs.twimg.com/media/FOa1vmzUcAApUYM.jpg",
    title: "In this week’s #NervosTrailBlazer update👇 1/ @Nervos18 ✍Updates &amp; localization of news https://t.co/2Hn2X5ekc0 https://t....",
    date: "Mon, 21 Mar 2022 23:16:55 +0000",
    uri: "https://twitter.com/NervosNetwork/status/1505710783719567362",
}));

export default function getNews(): Promise<NewType[]> {
    return new Promise((resolve) => setTimeout(() => resolve(News), 2000))
}