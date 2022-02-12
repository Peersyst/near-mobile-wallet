import { TextAreaProps } from "./TextInput.types";
import TextInput from "./TextInput";

const TextArea = ({ numberOfLines = 4, ...rest }: TextAreaProps): JSX.Element => (
    <TextInput multiline numberOfLines={numberOfLines} {...rest} />
);

export default TextArea;
