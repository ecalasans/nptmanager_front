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

    useEffect(() => {
            handleHospitals(selected);
        },
        [selected, handleHospitals]
    )

    const selectHospitais = (e) => {
        // Verifica se está checado, e se já está no array
        // Se não estiver checado, checa  adiciona
        const op = e.target.value;
        setSelected(
            prevSelected => e.target.checked ? [...prevSelected, op]
                                                    : prevSelected.filter(h => h !== op)
        )
    }


    return (
        <>
            {error && <p className="text-danger mb-2">Selecione pelo menos 1 hospital!</p>}
            {
                hospitais.map(
                    (hospital) => (
                        <Form.Check type="checkbox"
                                    id={hospital.public_id}
                                    label={hospital.nome}
                                    value={hospital.sigla}
                                    onChange={selectHospitais}
                                    key={hospital.public_id}
                        />
                    )
                )
            }
        </>
    )
}

export default HospitaisSelect;