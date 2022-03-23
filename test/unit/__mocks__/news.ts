import { NewsType } from "module/news/types";

export const ArrayNews: NewsType[] = [...Array(5)].map((_, i) => ({
    imageUri: "https://pbs.twimg.com/media/FOa1vmzUcAApUYM.jpg",
    title: "Title" + i,
    date: "Mon, 21 Mar 2022 23:16:55 +0000",
    uri: "https://twitter.com/NervosNetwork/status/1505710783719567362",
}));

export const News: NewsType = {
    imageUri: "imageUrk",
    title: "Title",
    date: "Wed, 23 Mar 2022 03:32:05 +0000",
    uri: "link",
};
