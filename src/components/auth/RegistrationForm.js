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
    const [first_name_valid, setFirstNameValid] = useState(false);
    const [first_name_error, setFirstNameError] = useState("");

    const [last_name_valid, setLastNameValid] = useState(false);
    const [last_name_error, setLastNameError] = useState("");

    const [email_valid, setEmailValid] = useState(false);
    const [email_error, setEmailError] = useState("");

    const [password_valid, setPasswordValid] = useState(false);
    const [password_error, setPasswordError] = useState("");

    const [crm_valid, setCrmValid] = useState(false);
    const [crm_error, setCrmError] = useState("");

    const [username_valid, setUsernameValid] = useState(false);
    const [username_error, setUsernameError] = useState("");

    const [hospitais_valid, setHospitaisValid] = useState(false);
    const [hospitais_error, setHospitaisError] = useState("");

    const handleHospitais = (h) => {
       setHospitais(h);
    }

    // Validação de formulário
    const validaForm = (first_name, last_name, username, email, crm, password, hospitals) => {
        // Valida nome
        if (first_name === ""){
            setFirstNameError("Este campo é obrigatório!");
        } else {
            setFirstNameValid(true);
        }

        // Valida sobrenome
        if (last_name === ""){
            setLastNameError("Este campo é obrigatório!");
        } else {
            setLastNameValid(true);
        }

        // Valida email
        const email_regex = /\w+@\D+[.]\D{3}/gm;
        if (!email_regex.test(email)) {
            setEmailError("Formato de email inválido!");
        } else if (email === "") {
            setEmailError("Este campo é obrigatório!");
        } else {
            setEmailValid(true);
        }

        // Valida senha
        if (password === ""){
            setPasswordError("Este campo é obrigatório!");
        } else if (password.length < 8) {
            setPasswordError("A senha precisa ter pelo menos 8 caracteres!");
        } else {
            setPasswordValid(true);
        }

        // Valida CRM
        const crm_regex = /\D/gm;
        if (crm_regex.test(crm)) {
            setCrmError("Só números no CRM!")
        } else if (crm === "") {
            setCrmError("Este campo é obrigatório!")
        } else {
            setCrmValid(true);
        }

        // Valida hospitais

        return (first_name_valid);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        setForm(
            prevForm => (
                {...prevForm, hospitais: hospitais}
            )
        )

        const reg_form = e.currentTarget;
        console.log([...reg_form.value]);

        if (reg_form.checkValidity() === false) {
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
        console.log(form);
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
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo é obrigatório!
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
                   />
                   <Form.Control.Feedback type="invalid">
                       Este campo é obrigatório!
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
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo é obrigatório!
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
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo é obrigatório!
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
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo é obrigatório!
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
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo é obrigatório!
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label >Hospitais que trabalha</Form.Label>
                <HospitaisSelect handleHospitals={handleHospitais} />
            </Form.Group>
            <Form.Group className="mb-3 text-center">
                <Button variant="primary" type="submit" onClick={handleSubmit}>Cadastrar</Button>
            </Form.Group>
        </Form>
  )
}
export default RegistrationForm