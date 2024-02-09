import { createStylesheets } from "@peersyst/react-native-styled";
import { dialogStylesheet } from "./Dialog.stylesheet";
import { dottedPaginationStylesheet } from "./DottedPagination.stylesheet";
import { formControlHintStylesheet } from "./FormControlHint.stylesheet";
import { formControlErrorStylesheet } from "./FormControlError.stylesheet";
import { formControlLabelStylesheet } from "./FormControlLabel.stylesheet";
import { labelStylesheet } from "./Label.stylesheet";
import { paperStylesheet } from "./Paper.stylesheet";
import { typographyStylesheet } from "./Typography.stylesheet";

export default createStylesheets(
    dialogStylesheet,
    dottedPaginationStylesheet,
    formControlHintStylesheet,
    formControlErrorStylesheet,
    formControlLabelStylesheet,
    labelStylesheet,
    paperStylesheet,
    typographyStylesheet,
);
