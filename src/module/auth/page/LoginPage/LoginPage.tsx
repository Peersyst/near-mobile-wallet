import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { useState } from "react";
import { translate } from "locale";
import LogoPage from "../LogoPage/LogoPage";
import { useLogin } from "module/auth/query/useLogin";

const LoginPage = (): JSX.Element => {
    const [error, setError] = useState(false);
    const login = useLogin();
    const handleSubmit = async (pin: string) => {
        login.mutate({ username: "Charlie", password: pin });
        if (!login.isLoading) {
            setError(login.isError);
        }
    };

    return (
        <LogoPage>
            <NumericPad
                onSubmit={handleSubmit}
                error={error}
                placeholder={translate("enter_your_pin")}
                style={{ height: "65%", gap: "5%" }}
            />
        </LogoPage>
    );
};

export default LoginPage;
