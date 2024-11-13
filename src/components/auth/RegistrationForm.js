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
    const [error, setError] = useState(null);
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

    // Validação de formulário
    const validaForm = (formulario) => {
        const first_name = formulario.first_name;
        const last_name = formulario.last_name;
        const crm = formulario.crm;
        const hospitals = formulario.hospitais;
        const username = formulario.username;
        const email = formulario.email;
        const password = formulario.password;

        console.log(first_name, last_name, crm, hospitals, username, email, password);

        // Valida
        let is_first_name_valid = false;
        if (first_name === ""){
            setFirstNameError("Este campo é obrigatório!");
            setFirstNameValid(!first_name_valid);
        } else {
            is_first_name_valid = true;
        }

        // Valida sobrenome
        let is_last_name_valid = false;
        if (last_name === ""){
            setLastNameError("Este campo é obrigatório!");
        } else {
            setLastNameValid(true);
            is_last_name_valid = true;
        }


        // Valida email
        let is_email_valid = false;
        const email_regex = /\w+@\D+[.]\D{3}/gm;
        if (!email_regex.test(email)) {
            setEmailError("Formato de email inválido!");
        } else if (email === "") {
            setEmailError("Este campo é obrigatório!");
        } else {
            setEmailValid(true);
            is_email_valid = true;
        }

        // Valida
        let is_password_valid = false;
        if (password === ""){
            setPasswordError("Este campo é obrigatório!");
        } else if (password.length < 8) {
            setPasswordError("A senha precisa ter pelo menos 8 caracteres!");
        } else {
            setPasswordValid(true);
            is_password_valid = true;
        }

        // Valida CRM
        let is_crm_valid = false;
        const crm_regex = /\D/gm;
        if (crm_regex.test(crm)) {
            setCrmError("Só números no CRM!");
        } else if (crm === "") {
            setCrmError("Este campo é obrigatório!");
        } else {
            setCrmValid(true);
            is_crm_valid = true;
        }

        // Valida username
        let is_username_valid = false;
        if (username === "") {
            setUsernameError("Este campo é obrigatório!");
        } else {
            setUsernameValid(true);
            is_username_valid = true;
        }

        // Valida
        let is_hospitals_valid = false;
        if (hospitals.length === 0) {
            setHospitaisError("Selecione um ou mais hospitais!");
        } else {
            setHospitaisValid(true);
            is_hospitals_valid = true;
        }

        if (is_first_name_valid && is_last_name_valid && is_email_valid && is_password_valid
            && is_crm_valid && is_username_valid && is_hospitals_valid
        ) {
            setValidated(true);
        }

        return (is_first_name_valid && is_last_name_valid && is_email_valid && is_password_valid
            && is_crm_valid && is_username_valid && is_hospitals_valid
        );
    }


    const handleSubmit = (e) => {
        e.preventDefault();


        const reg_form = e.currentTarget;
        console.log(`Reg_form: ${reg_form.value}`);

        const valid_form = validaForm(form);


        if (!valid_form) {
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

                    navigate("/");
                }
            ).catch( (error) => {
                    if (error.message) {
                        setError(error.request.response);
                    }
                    console.log(error.message);
                }

            )
        }
    }

    return (
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
                                  onFocus={(e) => setFirstNameValid(!first_name_valid)}
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
  )
}
export default RegistrationForm