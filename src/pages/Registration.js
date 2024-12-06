import { Link } from "react-router-dom";
import RegistrationForm from "../components/auth/RegistrationForm";
import {Col, Container, Row} from "react-bootstrap";

const Registration = () => {
    return (
        <Container className="col-md-9 col-11 form-container" id="form-container">
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
                </Col>
                <Col md={6} className="order-sm-2 mt-2 register-container">
                    <h2 className="text-center">Faça seu cadastro</h2>
                    <RegistrationForm />
                    <div className="text-center">
                        <p className="content">Faça seu {" "}
                            <Link to="/login/">login</Link>.
                        </p>
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

export default Registration;