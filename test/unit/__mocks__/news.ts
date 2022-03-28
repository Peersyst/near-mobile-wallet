export const ArrayNews: any[] = [...Array(5)].map((_, i) => ({
    content: { __url: "imageUri" },
    title: "Title" + i,
    pubDate: "Mon, 21 Mar 2022 23:16:55 +0000",
    link: "link" + i,
}));

export const News: any = {
    content: { __url: "imageUri" },
    title: "Title",
    pubDate: "Mon, 21 Mar 2022 23:16:55 +0000",
    link: "link",
};
