import styled from "@peersyst/react-native-styled"
import { Icon } from "react-native-components"

export const StyledCircle = styled(Icon)(({theme})=> ({ 
    color:theme.palette.white, 
    fontSize:22
}))