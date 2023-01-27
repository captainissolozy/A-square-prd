import {useEffect, useState} from "react";
import db from "../../../../config/firebase-config"
import {collection, doc, getDoc, onSnapshot} from "firebase/firestore"
import {useNavigate} from "react-router-dom";


const AddTable = (props) => {

    const [formData, setFormData] = useState([])

    useEffect(() => {
        onSnapshot(collection(db, "PO", props.roomCode, props.roomCode), (snapshot) => {
            setFormData(snapshot.docs.map((doc) => doc.data()))
        });
    }, [])

    return (
        formData.map((data) => (
            <tbody>
            <tr>
                <td>{data.description}</td>
                <td>{data.quantity}</td>
            </tr>
            </tbody>

        ))


    )
}

export default AddTable