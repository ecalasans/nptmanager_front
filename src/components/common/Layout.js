import Header from './Header';
import {Container, Row, Col} from "react-bootstrap";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = (props) => {
    return (
        <Container fluid className="m-5">
            <Row className="align-items-center">
                <Header></Header>
            </Row>
            <Row className="d-flex vh-100">
                <Col sm={2} className="p-0 h-75">
                    <Sidebar></Sidebar>
                </Col>
                <Col sm={10}>
                    {props.children}
                </Col>
                
            </Row>
            <Row>
                <Footer></Footer>
            </Row>
        </Container>
    )
}
export default Layout;

