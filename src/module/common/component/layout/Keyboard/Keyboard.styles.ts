import styled from "@peersyst/react-native-styled"
import { Row } from "react-native-components"

export const KeyboardRoot = styled(Row, { gap: 2 })(() => ({
    width: 280,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
}))