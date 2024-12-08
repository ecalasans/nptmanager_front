import {Container, Row, Col, Navbar, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {randomAvatar} from "../../helpers/utils";
import {useEffect, useState} from "react";
import moment from "moment";

const Sidebar = () => {
    const [user_logged, setUserLogged] = useState("");
    const [last_logged, setLastLogged] = useState(null);

    useEffect(() => {
            const dados = localStorage.getItem("auth");
            console.log(dados);

            if (dados) {
                const user_dados = JSON.parse(dados);
                const date_last_logged = moment(user_dados.user.last_login);

                if (date_last_logged.isValid()) {
                    setLastLogged(date_last_logged);
                }

                setUserLogged(`${user_dados.user.first_name} ${user_dados.user.last_name}`);
            }
        },
        []
    )

    return (
        //TODO:  A Navbar não está responsiva - está extrapolando o container
       <Container fluid className="flex-row align-items-center justify-content-center">
           <Row className="align-items-center justify-content-center w-100">
               <Navbar.Brand className="d-flex align-items-center justify-content-center w-100">
                   <Image src={randomAvatar()} width={36}
                          height={36} className=""
                          roundedCircle={true}/>
               </Navbar.Brand>
               <Navbar className="flex-column align-items-center justify-content-center p-0 w-100">
                   <Navbar.Brand className="flex-column align-items-center justify-content-center m-0 w-100">
                       <h3 className="text-center text-wrap m-0">{user_logged}</h3>
                       <p className="mt-0 fs-6 text-wrap text-center fw-lighter">
                           {last_logged ? `Último login em ${last_logged.format("DD/MM/YYYY HH:mm:ss")}` : "Data inválida!"}
                       </p>
                   </Navbar.Brand>
               </Navbar>
           </Row>
           <Row>
               <Col></Col>
               <Col></Col>
           </Row>
       </Container>
    )
}

export default Sidebar;