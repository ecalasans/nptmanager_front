
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
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

    const handleSubmit =  (e) => {
        e.preventDefault();

        const login_form = e.currentTarget;

        // Se o formulário não for válido não progride a partir daqui
        if (login_form.checkValidity() === false) {
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
                <Form.Label >Email</Form.Label>
                <Form.Control value={form.email}
                              name="email"
                              onChange={(e) =>
                                  setForm({ ...form, [e.target.name]: e.target.value })}
                              placeholder="Digite seu email"
                              type="email"
                              required
                />
                <Form.Control.Feedback type="invalid">
                    Este campo é obrigatório!
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label >Senha</Form.Label>
                <Form.Control value={form.password}
                              name="password"
                              onChange={(e) =>
                                  setForm({ ...form, [e.target.name]: e.target.value })}
                              placeholder="Digite sua senha"
                              type="password"
                              required
                />
                <Form.Control.Feedback type="invalid">
                    Senha inválida!
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="mb-3">Entrar</Button>
        </Form>
    )
}

export default LoginForm;