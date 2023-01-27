import {useEffect, useState} from "react";
import db from "../../../../config/firebase-config"
import {collection, doc, getDoc, onSnapshot} from "firebase/firestore"
import {useNavigate} from "react-router-dom";


const AddTable = (props) => {

    const [formData, setFormData] = useState([])


    useEffect(() => {
        onSnapshot(collection(db, "PO", props.roomCode, props.currentCode), (snapshot) => {
            setFormData(snapshot.docs.map((doc) => doc.data()))
        });
    }, [])

    console.log(props.currentCode)

    return (
        formData.map((data) => (
            <tbody>
            <tr>
                <td>{data.description}</td>
                <td>{data.quantity}</td>
                <td>{data.unit}</td>
                <td>{data.labor}</td>
                <td>{data.material}</td>
            </tr>
            </tbody>

        ))


    )
}

export default AddTable