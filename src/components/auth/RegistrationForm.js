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

    const handleHospitais = (h) => {
       setHospitais(h);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        setForm(
            prevForm => (
                {...prevForm, hospitais: hospitais}
            )
        )

        const reg_form = e.currentTarget;

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
            <Button variant="primary" type="submit" className="mb-3" onClick={handleSubmit}>Entrar</Button>
        </Form>
  )
}
export default RegistrationForm