import { TextFieldProps } from "./TextInput.types";
import TextInput from "./TextInput";

const TextField = (props: TextFieldProps): JSX.Element => <TextInput {...props} />;

export default TextField;
