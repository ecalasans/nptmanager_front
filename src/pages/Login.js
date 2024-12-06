import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import {Col, Container, Row} from "react-bootstrap";

const Login = () => {
    return (
        <Container fluid className="col-md-9 col-11 form-container" id="form-container">
            <Row className="align-items-center justify-content-center">
                <Col md={6} className="order-sm-1">
                    <Col className="col-12 align-items-center">
                        <div className="content text-center px-4">
                            <h1 className="text-primary">
                                NeoNPT Manager
                            </h1>
                            <p>A melhor maneira de prescrever NPT!</p>
                        </div>
                    </Col>
                    {/*<Col className="col-12">*/}
                    {/*    <Image src={`${process.env.PUBLIC_URL}/static/img/login.svg`}*/}
                    {/*           fluid className="img-login"></Image>*/}
                    {/*</Col>*/}
                </Col>
                <Col md={6} className="order-sm-2 text-center mt-2 login-container">
                    <h2>Faça seu login</h2>
                    <LoginForm />
                    <div className="d-inline text-center">
                        <p>Ainda não tenho {" "} <Link to="/register/">cadastro</Link> </p>
                    </div>

                </Col>
            </Row>
            <Row className="align-items-center justify-content-center">
                <Col className="col-12 copyright">
                    <p>Desenvolvido por ®ECalasans</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;