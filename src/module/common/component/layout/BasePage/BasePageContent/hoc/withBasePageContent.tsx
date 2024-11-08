import { BasePageContent } from "../BasePageContent";

export function withBasePageContent(Component: any) {
    return (props: any) => {
        return (
            <BasePageContent>
                <Component {...props} />
            </BasePageContent>
        );
    };
}
