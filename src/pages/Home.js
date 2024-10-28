import { Stack, Container, Row, Col } from 'react-bootstrap';
import '../static/css/styles.css'

const Home = () => {
    return (
        <Container className="col-11 col-md-9 mt-5">
            <Row className="align-items-center">
                <Col className="text-center">
                    <h1>NeoNPT</h1>
                    <p>A melhor maneira de prescrever uma NPT.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;