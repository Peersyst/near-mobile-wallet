export interface NewsType {
    uri: string;
    title: string;
    date: string;
    imageUri: string;
}

export interface NewsDto {
    content?: {
        __height?: string;
        __url?: string;
        __width?: string;
        __medium?: string;
    };
    creator?: string;
    description?: string;
    guid?: {
        "#text"?: string;
        __isPermaLink: string;
    };
    link?: string;
    pubDate?: string;
    title?: string;
}
