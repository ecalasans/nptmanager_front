import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { Multiselect} from 'react-bootstrap-multiselect';
import "./css/styles.css";
import HospitaisSelect from "../form/HospitaisSelect";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(true);
    const [message, setMessage] = useState("");
    const [hospitais, setHospitais] = useState([]);
    const [form, setForm] = useState({
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            username: "",
            crm: "",
            hospitais: [],
        }
    );

    // Estados para validação
    const [first_name_valid, setFirstNameValid] = useState(true);
    const [first_name_error, setFirstNameError] = useState("");

    const [last_name_valid, setLastNameValid] = useState(true);
    const [last_name_error, setLastNameError] = useState("");

    const [email_valid, setEmailValid] = useState(true);
    const [email_error, setEmailError] = useState("");

    const [password_valid, setPasswordValid] = useState(true);
    const [password_error, setPasswordError] = useState("");

    const [crm_valid, setCrmValid] = useState(true);
    const [crm_error, setCrmError] = useState("");

    const [username_valid, setUsernameValid] = useState(true);
    const [username_error, setUsernameError] = useState("");

    const [hospitais_valid, setHospitaisValid] = useState(true);
    const [hospitais_error, setHospitaisError] = useState("");

    const handleHospitais = (h) => {
       setHospitais(h);
    }

    useEffect(
        () => {
            setForm(
                prevForm => (
                    {...prevForm, hospitais: hospitais}
                )
            )
            console.log(form);
        },
        [hospitais]
    )

    const validaForm = () => {
        const { first_name, last_name, email, password, crm, username, hospitais } = form;

        let isValid = true;

        // Validação de first_name
        if (!first_name) {
            setFirstNameError("Este campo é obrigatório!");
            setFirstNameValid(false);
            isValid = false;
        } else {
            setFirstNameError("");
            setFirstNameValid(true);
        }

        // Validação de last_name
        if (!last_name) {
            setLastNameError("Este campo é obrigatório!");
            setLastNameValid(false);
            isValid = false;
        } else {
            setLastNameError("");
            setLastNameValid(true);
        }

        // Validação de email
        const email_regex = /\w+@\D+[.]\D{2,}/gm;
        if (!email) {
            setEmailError("Este campo é obrigatório!");
            setEmailValid(false);
            isValid = false;
        } else if (!email_regex.test(email)) {
            setEmailError("Formato de email inválido!");
            setEmailValid(false);
            isValid = false;
        } else {
            setEmailError("");
            setEmailValid(true);
        }

        // Validação de password
        if (!password) {
            setPasswordError("Este campo é obrigatório!");
            setPasswordValid(false);
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError("A senha precisa ter pelo menos 8 caracteres!");
            setPasswordValid(false);
            isValid = false;
        } else {
            setPasswordError("");
            setPasswordValid(true);
        }

        // Validação de CRM
        const crm_regex = /^\d+$/;
        if (!crm) {
            setCrmError("Este campo é obrigatório!");
            setCrmValid(false);
            isValid = false;
        } else if (!crm_regex.test(crm)) {
            setCrmError("Só números no CRM!");
            setCrmValid(false);
            isValid = false;
        } else {
            setCrmError("");
            setCrmValid(true);
        }

        // Validação de username
        if (!username) {
            setUsernameError("Este campo é obrigatório!");
            setUsernameValid(false);
            isValid = false;
        } else {
            setUsernameError("");
            setUsernameValid(true);
        }

        // Validação de hospitais
        if (!hospitais.length) {
            setHospitaisError("Selecione um ou mais hospitais!");
            setHospitaisValid(false);
            isValid = false;
        } else {
            setHospitaisError("");
            setHospitaisValid(true);
        }

        setValidated(isValid);
        return isValid;
    }


    const handleSubmit = (e) => {
        e.preventDefault();


        const reg_form = e.currentTarget;
        console.log(`Reg_form: ${reg_form.value}`);

        const valid_form = validaForm(form);


        if (!validaForm()) {
            console.log("Formulário inválido!")
            e.stopPropagation();
        } else {
            const data = {
                email: form.email,
                first_name: form.first_name,
                last_name: form.last_name,
                crm: form.crm,
                password: form.password,
                username: form.username,
                hospitais: hospitais,

            }

            axios.post(
                'http://localhost:8000/api/auth/register/', data
            ).then( (response) => {
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                                access: response.data.access,
                                refresh: response.data.refresh,
                                user: response.data.user,
                            }
                        )
                    );

                    console.log("Registro adicionado com sucesso!");
                    setSuccess(true);
                    setMessage(response.data.message);


                    setTimeout(() => navigate("/"), 3000);
                    
                }
            ).catch( (error) => {
                    if (error.message) {
                        setSuccess(false);
                        setError(error.request.response);
                    }
                    console.log(error.message);
                }

            )
        }
    }

    return (
        <>
            { error && <p className="text-danger text-center mb-3">{message}</p> }
            { success && <p className="text-success text-center mb-3">{message}</p> }
            <Form noValidate id="register-form" onSubmit={handleSubmit} validation={validated} className="align-items-center">
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="regNome" label="Digite seu nome">
                        <Form.Control value={form.first_name}
                                      name="first_name"
                                      onChange={(e) =>
                                          setForm({ ...form, [e.target.name]: e.target.value })}
                                      placeholder="Digite seu nome"
                                      type="input"
                                      required
                                      isInvalid={!first_name_valid}
                        />
                        <Form.Control.Feedback type="invalid" name="feedbackFirstName">
                            {first_name_error}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="regSobrenome" label="Digite seu sobrenome">
                        <Form.Control value={form.last_name}
                                      name="last_name"
                                      onChange={(e) =>
                                          setForm({ ...form, [e.target.name]: e.target.value })}
                                      placeholder="Digite seu sobrenome"
                                      type="input"
                                      required
                                      isInvalid={!last_name_valid}
                        />
                        <Form.Control.Feedback type="invalid" name="feedbackLastName">
                            {last_name_error}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="regEmail" label="Digite seu email">
                        <Form.Control value={form.email}
                                      name="email"
                                      onChange={(e) =>
                                          setForm({ ...form, [e.target.name]: e.target.value })}
                                      placeholder="Digite email"
                                      type="email"
                                      required
                                      isInvalid={!email_valid}
                        />
                        <Form.Control.Feedback type="invalid" name="feedbackEmail">
                            {email_error}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="regUsername" label="Digite seu nome de usuário">
                        <Form.Control value={form.username}
                                      name="username"
                                      onChange={(e) =>
                                          setForm({ ...form, [e.target.name]: e.target.value })}
                                      placeholder="Usuário"
                                      type="input"
                                      required
                                      isInvalid={!username_valid}
                        />
                        <Form.Control.Feedback type="invalid" name="feedbackUsername">
                            {username_error}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="regPassword" label="Digite sua senha">
                        <Form.Control value={form.password}
                                      name="password"
                                      onChange={(e) =>
                                          setForm({ ...form, [e.target.name]: e.target.value })}
                                      placeholder="Senha"
                                      type="password"
                                      required
                                      isInvalid={!password_valid}
                        />
                        <Form.Control.Feedback type="invalid" name="feedbackPassword">
                            {password_error}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="regCRM" label="Digite seu CRM">
                        <Form.Control value={form.crm}
                                      name="crm"
                                      onChange={(e) =>
                                          setForm({ ...form, [e.target.name]: e.target.value })}
                                      placeholder="Digite seu CRM"
                                      type="input"
                                      required
                                      isInvalid={!crm_valid}
                        />
                        <Form.Control.Feedback type="invalid" name="feedbackCRM">
                            {crm_error}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Hospitais que trabalha</Form.Label>
                    <HospitaisSelect handleHospitals={handleHospitais} />
                    <Form.Control.Feedback type="invalid" name="feedbackHospitals">
                        {hospitais_error}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 text-center">
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Cadastrar</Button>
                </Form.Group>
            </Form>
        </>
  )
}
export default RegistrationForm