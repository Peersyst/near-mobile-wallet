import styled from "@peersyst/react-native-styled"
import { Row } from "react-native-components"

export const RowPad = styled(Row, { gap: 28 })()

export const Keyboard = styled(Row, { gap:8 })(() => ({
    width: "80%",
    flex: 1,
    flexDirection: "row",
    flexWrap:"wrap"
}))