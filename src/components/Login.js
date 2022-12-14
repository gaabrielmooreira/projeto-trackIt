import { StyledForm, StyledButton, StyledInput } from "../styles/Style";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import UserDetailsContext from "../contexts/UserDetailsContext";


export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);
    const { setUserDetails } = useContext(UserDetailsContext);

    function loginUser(event) {
        event.preventDefault();
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        const promise = axios.post(URL, { email, password });
        setIsLoading(true);
        promise.then((res) => {
            setUserDetails({ name: res.data.name, image: res.data.image });
            setToken(res.data.token);
            navigate("/hoje");
            setIsLoading(false);
        });
        promise.catch(() => {
            alert("Usuário e/ou senha inválido(s).");
            setIsLoading(false);
        });
    }

    return (
        <StyledForm onSubmit={loginUser}>
            <StyledInput
                data-test="email-input"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="email"
                disabled={isLoading}
            />
            <StyledInput
                data-test="password-input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="senha"
                disabled={isLoading}
            />
            <StyledButton data-test="login-btn" type="submit" disabled={isLoading}>
                {
                    isLoading ? <ThreeDots
                        height="13"
                        width="51"
                        radius="9"
                        color="#FFFFFF"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    /> : "Entrar"
                }
            </StyledButton>
        </StyledForm>
    )
}


