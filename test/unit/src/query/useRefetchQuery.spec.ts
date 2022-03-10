import { renderHook, waitFor } from "test-utils";
import { useQuery } from "react-query";
import { act } from "@testing-library/react-hooks";
import { useRefetchQuery } from "../../../../src/query/useRefetchQuery";

describe("useRefetchQuery tests", () => {
    test("Refetches query", async () => {
        const fetch = jest.fn();
        const { result } = renderHook(() => {
            useQuery("key", fetch);
            return useRefetchQuery();
        });
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        await act(async () => await result.current("key"));
        expect(fetch).toHaveBeenCalledTimes(2);
    });
});
