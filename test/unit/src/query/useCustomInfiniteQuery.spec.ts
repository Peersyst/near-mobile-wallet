import { renderHook, waitFor } from "test-utils";

import { PaginatedData, useInfiniteQuery } from "query-utils";

type PaginatedTestItems = PaginatedData<number[]>;
const getNumbers = ({ pageParam = 0 }): Promise<PaginatedTestItems> =>
    new Promise((resolve) => resolve({ items: [1, 2, 3, 4, 5], pages: 5, currentPage: pageParam }));
const getLastNumbers = (): Promise<PaginatedTestItems> =>
    new Promise((resolve) => resolve({ items: [1, 2, 3, 4, 5], pages: 5, currentPage: 5 }));

describe("useCustomInfiniteQuery test", () => {
    test("hasNextPage is true when currentPage < pages", async () => {
        const { result } = renderHook(() => useInfiniteQuery("test", getNumbers));

        await waitFor(() => expect(result.current.hasNextPage).toBe(true));
    });

    test("hasNextPage is false when currentPage < pages", async () => {
        const { result } = renderHook(() => useInfiniteQuery("test", getLastNumbers));

        await waitFor(() => expect(result.current.hasNextPage).toBe(false));
    });
});
