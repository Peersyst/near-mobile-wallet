import * as Updates from "expo-updates";
import { useEffect, useState } from "react";

export default function useCheckUpdatesApp(): void {
    //const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        async function onFetchUpdateAsync() {
            try {
                const update = await Updates.checkForUpdateAsync();
                console.log("update", update);

                if (update.isAvailable) {
                    await Updates.fetchUpdateAsync();
                    await Updates.reloadAsync();
                }
            } catch (error) {
                // You can also add an alert() to see the error message in case of an error when fetching updates.
                alert(`Error fetching latest Expo update: ${error}`);
            }
        }

        onFetchUpdateAsync();
    }, []);
}
