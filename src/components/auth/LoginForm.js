
import { useState } from "react";
import {Form, Button, FloatingLabel} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/styles.css"

const LoginForm = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // Estados para validação
    const [email_valid, setEmailValid] = useState(true);
    const [email_error, setEmailError] = useState("");

    const [password_valid, setPasswordValid] = useState(true);
    const [password_error, setPasswordError] = useState("");

    const validaForm = (email, senha) => {
        // Trata a validação do email
        const regex = /\w+@\D+[.]\D{3}/gm;
        if (email === ""){
            setEmailError("Este campo é obrigatório!")
        } else if (!regex.test(email)) {
            setEmailError("Email inválido!");
        }
        const is_email_valid = (email !== "") && (regex.test(email));

        // Trata a validação da senha
        if (senha === "") {
            setPasswordError("Este campo é obrigatório!");
        } else if (senha.length < 8) {
            setPasswordError("A senha precisa ter pelo menos 8 caracteres!");
        }
        const is_password_valid = (senha.length >= 8) && (senha !== "");

        setEmailValid(is_email_valid);
        setPasswordValid(is_password_valid);
    }


    const handleSubmit =  (e) => {
        e.preventDefault();

        const login_form = e.currentTarget;
        console.log(login_form.email.value, login_form.password.value);

        validaForm(login_form.email.value, login_form.password.value);

        // Se o formulário não for válido não progride a partir daqui
        if (!email_valid || !password_valid) {
            console.log("Formulário inválido!");
            e.stopPropagation();
        } else {
            // Prepara os dados para a requisição
            const data = {
                email: form.email,
                password: form.password,
            }

            axios.post(
                "http://localhost:8000/api/auth/login/",
                data
            ).then(
                (response) => {
                    // Armazena os tokens
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                                access: response.data.access,
                                refresh: response.data.refresh,
                                user: response.data.user,
                            }
                        )
                    );

                    // Redireciona para Home
                    navigate("/");
                }
            ).catch(
                (error) => {
                    if (error.message) {
                        setError(error.request.response);
                    }
                }
            );
        }

        // Valida o formulário
        setValidated(true);
    }

    return (
        <Form noValidate id="login-form" onSubmit={handleSubmit} validation={validated} className="align-items-center">
            <Form.Group className="mb-3">
                <FloatingLabel controlId="logEmail" label="Digite seu email">
                    <Form.Control value={form.email}
                                  name="email"
                                  onChange={(e) =>
                                      setForm({ ...form, [e.target.name]: e.target.value })}
                                  placeholder="Digite seu email"
                                  type="email"
                                  required
                                  isInvalid={!email_valid && validated}
                    />
                    <Form.Control.Feedback type="invalid" name="feedbackEmail">
                        {email_error}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
                <FloatingLabel controlId="logPassword" label="Digite sua senha">
                    <Form.Control value={form.password}
                                  name="password"
                                  onChange={(e) =>
                                      setForm({ ...form, [e.target.name]: e.target.value })}
                                  placeholder="Digite sua senha"
                                  type="password"
                                  required
                                  isInvalid={!password_valid && validated}
                    />
                    <Form.Control.Feedback type="invalid" name="feedbackPassword">
                        {password_error}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit" className="mb-3">Entrar</Button>
        </Form>
    )
}

export default LoginForm;