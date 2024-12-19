import {Container, Row, Col, Navbar, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {randomAvatar} from "../../helpers/utils";
import {useEffect, useState} from "react";
import moment from "moment";
import "./css/styles.css"

const Sidebar = () => {
    const [user_logged, setUserLogged] = useState("");
    const [last_logged, setLastLogged] = useState(null);
    const [userHospSelected, setUserHospSelected] = useState("");

    useEffect(() => {
            const dados = localStorage.getItem("auth");

            if (dados) {
                const user_dados = JSON.parse(dados);
                const date_last_logged = moment(user_dados.user.last_login);

                if (date_last_logged.isValid()) {
                    setLastLogged(date_last_logged);
                }

                setUserLogged(`${user_dados.user.first_name} ${user_dados.user.last_name}`);
                setUserHospSelected(localStorage.getItem("userHospSelected"));
            }
        },
        []
    )

    return (
       <Container fluid className="flex-row align-items-center justify-content-center h-100">
           <Row className="align-items-center justify-content-center w-100">
               <Navbar className="d-flex flex-column align-items-center justify-content-center pt-0 w-100">
                   <Navbar.Brand className="d-flex align-items-center justify-content-center  w-100">
                       <Image src={randomAvatar()} width={36}
                              height={36} className="me-0"
                              roundedCircle={true}/>
                   </Navbar.Brand>
                   <Navbar.Brand className="d-flex flex-column align-items-center justify-content-center m-0 w-100">
                       <h5 className="text-center text-wrap m-0">{user_logged}</h5>
                       <p className="m-0 fs-sidebar-small text-wrap text-center fw-light">
                           {last_logged ? `Último login em ${last_logged.format("DD/MM/YYYY HH:mm:ss")}`
                               : "Data inválida!"}
                       </p>
                       <p className="mt-0 fs-sidebar-small text-center fw-light">Você está em
                           <span className="fw-bold"> {userHospSelected}</span>
                       </p>
                   </Navbar.Brand>
               </Navbar>
           </Row>
           <Row className="align-items-center justify-content-around w-100 h-50">
               <Navbar className="d-flex flex-column align-items-center
                    justify-content-between w-100 h-100">
                   <Link to="#" className="link-sidebar">
                       <h3>Pacientes</h3>
                   </Link>
                   <Link to="#" className="link-sidebar">
                       <h3>Prescrições</h3>
                   </Link>
                   <Link to="#" className="link-sidebar">
                       <h3>Estatísticas</h3>
                   </Link>
                   <Link to="#" className="link-sidebar">
                       <h3>Relatórios</h3>
                   </Link>
               </Navbar>
           </Row>
       </Container>
    )
}

export default Sidebar;