import {useEffect, useState} from "react";
import {Form, Button, FloatingLabel, Modal} from "react-bootstrap";
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

    // Estado para controlar o Modal
    const [modal_show, setModalShow] = useState(false);

    // Estados para validação
    const [email_valid, setEmailValid] = useState(true);
    const [email_error, setEmailError] = useState("");

    const [password_valid, setPasswordValid] = useState(true);
    const [password_error, setPasswordError] = useState("");

    const [hospitais, setHospitais] = useState([]);

    const validaForm = (email, senha) => {
        // Trata a validação do email
        const regex = /\w+@\D+[.]\D{3}/gm;
        console.log(`Teste de email: ${regex.test(email)}`);

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
        setValidated(is_email_valid && is_password_valid);

        return (is_email_valid && is_password_valid);
    }

    useEffect(
        () => {
            console.log(`Validated: ${validated}`);
        },
        [validated]
    )


    const handleSubmit =  (e) => {
        e.preventDefault();

        const login_form = e.currentTarget;
        console.log(login_form.email.value, login_form.password.value);

        let valid_form = validaForm(login_form.email.value, login_form.password.value)
        console.log(`Valid form:  ${valid_form}`);

        // Se o formulário não for válido não progride a partir daqui
        if (!valid_form) {
            console.log("Formulário inválido!");
            e.stopPropagation();
        } else {
            console.log(`Validated:  ${validated}`);

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

                    const dados = localStorage.getItem("auth");

                    if (dados) {
                        const user_dados = JSON.parse(dados);
                        const user_hospitais = user_dados.user.hospitais || [];
                        setHospitais(user_hospitais);
                        setModalShow(true);

                    }

                    // Redireciona para Home
                    //navigate("/");
                }
            ).catch(
                (error) => {
                    if (error.response) {
                        console.log(error.response.data.message);
                        setError(error.response.data.message);
                    }
                }
            );
        }

    }

    // Fecha o modal
    const handleModalClose = () => setModalShow(false);

    // Seta o hospital selecionado no localStorage
    const handleUserHospitalSelect = () => {
        //Escolhe o hospital e coloca a opção em localStorage
        let hospital = document.querySelector("input[name='userHosp']:checked").value;
        localStorage.setItem("userHospSelected", hospital);
        console.log(localStorage.getItem("userHospSelected"));

        // Fecha o modal
        handleModalClose();

        // Vai para Home
        navigate("/");
    }

    return (
        //TODO:  Confeccionar Modal para  selecionar Hospital do usuário
        <>
            <Form noValidate id="login-form" onSubmit={handleSubmit} validation={validated} className="align-items-center">
                <Form.Group className="mb-3">
                    <p className="text-danger">{error}</p>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="logEmail" label="Digite seu email">
                        <Form.Control value={form.email}
                                      name="email"
                                      onChange={(e) =>
                                          setForm({ ...form, [e.target.name]: e.target.value })}
                                      placeholder="Digite seu email"
                                      type="email"
                                      required
                                      isInvalid={!email_valid}
                                      className="campo"
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
                                      isInvalid={!password_valid}
                        />
                        <Form.Control.Feedback type="invalid" name="feedbackPassword">
                            {password_error}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Button variant="primary" type="submit" className="mb-3">Entrar</Button>
            </Form>

            <Modal show={modal_show} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecione o hospital</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="userHospital" className="d-flex flex-row align-items-center justify-content-around">
                            {
                                hospitais.map(
                                    (hospital) => (
                                        <Form.Check type={"radio"} name={"userHosp"}
                                                    key={hospital} label={hospital} value={hospital}
                                        onChange={handleUserHospitalSelect}>
                                        </Form.Check>
                                    )
                                )
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default LoginForm;