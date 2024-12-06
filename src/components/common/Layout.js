import Header from './Header';
import {Container, Row, Col} from "react-bootstrap";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = (props) => {
    return (
        <Container fluid>
            <Row className="align-items-center">
                <Header></Header>
            </Row>
            <Row className="d-flex vh-100">
                <Col sm={2}>
                    <Sidebar />
                </Col>
                <Col sm={10}>
                    <p>Conteúdo</p>
                </Col>
                
            </Row>
            <Row>
                <Footer></Footer>
            </Row>
        </Container>
    )
}
export default Layout;

