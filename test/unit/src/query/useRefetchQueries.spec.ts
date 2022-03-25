import { renderHook, waitFor } from "test-utils";
import { act } from "@testing-library/react-hooks";
import { useRefetchQueries } from "../../../../src/query/useRefetchQueries";
import { useQuery } from "react-query";

describe("useRefetchQueries tests", () => {
    test("Refetches queries", async () => {
        const fetch1 = jest.fn();
        const fetch2 = jest.fn();
        const fetch3 = jest.fn();
        const { result } = renderHook(() => {
            useQuery("key1", fetch1);
            useQuery("key2", fetch2);
            useQuery("key3", fetch3);
            return useRefetchQueries();
        });
        await waitFor(() => expect(fetch1).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(fetch2).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(fetch3).toHaveBeenCalledTimes(1));
        await act(async () => result.current(["key1", "key2"]));
        await waitFor(() => expect(fetch1).toHaveBeenCalledTimes(2));
        await waitFor(() => expect(fetch2).toHaveBeenCalledTimes(2));
        await waitFor(() => expect(fetch3).toHaveBeenCalledTimes(1));
    });
});
