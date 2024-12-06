import {Container, Row, Col, Navbar, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {randomAvatar} from "../../helpers/utils";
import {useEffect, useState} from "react";

const Sidebar = () => {
    const [user_logged, setUserLogged] = useState("");
    const [last_logged, setLastLogged] = useState("");

    useEffect(() => {
            const dados = localStorage.getItem("auth");
            console.log(dados);

            if (dados) {
                //TODO - AJEITAR DATA COM MOMENTJS(JÁ INSTALADO)
                const user_dados = JSON.parse(dados);
                const date_last_logged = new Date(user_dados.user.last_login);
                let date_formatted = `Último login em ${date_last_logged.getDate()}/${date_last_logged.getMonth()}/${date_last_logged.getFullYear()}`
                date_formatted += ` às ${date_last_logged.getHours()}:${date_last_logged.getMinutes()}:${date_last_logged.getSeconds()}`
                console.log(date_formatted);
            }
        },
        []
    )

    return (
       <Navbar>
           <Container className="justify-content-center align-items-start">
               <Navbar.Brand>
                   <Image src={randomAvatar()} width={36}
                          height={36} className="d-inline-block align-top"
                          roundedCircle={true}/>
               </Navbar.Brand>
               <Navbar.Brand className="">
                   <h3>{user_logged}</h3>
               </Navbar.Brand>
           </Container>
       </Navbar>
    )
}

export default Sidebar;