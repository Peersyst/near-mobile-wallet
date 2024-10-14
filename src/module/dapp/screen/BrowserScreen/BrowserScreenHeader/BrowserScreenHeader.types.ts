export interface BrowserScreenHeaderProps {
    canGoBack: boolean;
    canGoForward: boolean;
    onGoBack: () => void;
    onGoForward: () => void;
    onSearch: (search: string) => void;
    url: string;
}
