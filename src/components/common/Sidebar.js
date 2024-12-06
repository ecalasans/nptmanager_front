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
                //TODO - AJEITAR DATA COM MOMENTJS(JÁ INSTALADO)
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
       <Navbar className="d-inline-block justify-content-center align-items-center">
           <Navbar.Brand className="d-flex align-items-center justify-content-center w-100">
               <Image src={randomAvatar()} width={36}
                      height={36} className=""
                      roundedCircle={true}/>
           </Navbar.Brand>
           <Navbar.Brand className="text-center">
               <h3 className="mb-0">
                   {user_logged}
               </h3>
               <p className="mt-0 fs-6 fw-lighter">
                   {last_logged ? `Último login em ${last_logged.format("DD/MM/YYYY HH:mm:ss")}` : "Data inválida!"}
               </p>
           </Navbar.Brand>
       </Navbar>
    )
}

export default Sidebar;