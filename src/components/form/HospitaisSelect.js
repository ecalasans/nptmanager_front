import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";

const HospitaisSelect = ({handleHospitals}) => {
    const [error, setError] = useState(null);
    const [hospitais, setHospitais] = useState([]); // Preenche com os hospitais
    const [selected, setSelected] = useState([]);

    useEffect(
        () => {
            axios.get("http://localhost:8000/api/hospitais/")
                .then((response) => {
                        setHospitais(response.data);
                    }
                ).catch((e) => {
                    console.log(e);
                    setError("Falha ao adquirir dados!");
                }
            )

        }, []
    );

    const selectHospitais = (e) => {
        // Verifica se está checado, e se já está no array
        // Se não estiver checado, checa  adiciona
        if (e.target.checked) {
            setSelected([...selected, e.target.value])

        } else {
            setSelected(selected.filter(h => h !== e.target.value));

        }
    }
    handleHospitals(selected);

    return (
        <>
            {
                hospitais.map(
                    (hospital) => (
                        <Form.Check type="checkbox"
                                    id={hospital.public_id}
                                    label={hospital.nome}
                                    value={hospital.sigla}
                                    onClick={selectHospitais}
                                    key={hospital.public_id}
                        />
                    )
                )
            }
        </>
    )
}

export default HospitaisSelect;