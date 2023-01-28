import {useEffect, useState} from "react";
import db from "../../../../config/firebase-config"
import {collection, doc, getDoc, onSnapshot} from "firebase/firestore"


const AddTable = (props) => {

    const [formData, setFormData] = useState([])


    useEffect(() => {
        onSnapshot(collection(db, "PO", props.roomCode, "Quotation", props.currentCode, "work"), (snapshot) => {
            setFormData(snapshot.docs.map((doc) => doc.data()))
        });
    }, [formData])

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