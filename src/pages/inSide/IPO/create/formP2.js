import {useEffect, useState} from "react";
import db from "../../../../config/firebase-config"
import {collection, doc, getDoc, onSnapshot} from "firebase/firestore"
import {useNavigate} from "react-router-dom";


const AddTable = (props) => {

    const [formData, setFormData] = useState([])

    useEffect(() => {
        onSnapshot(collection(db, "PO", props.roomCode, "media"), (snapshot) => {
            setFormData(snapshot.docs.map((doc) => doc.data()))
        });
    }, [])

    return (
        formData.map((data) => (
            <tbody>
            <tr>
                <td>{data.docName.name}</td>
                <td key={data.url}><a href={data.url} target="_blank">{data.docName.name}.png</a></td>
            </tr>
            </tbody>

        ))


    )
}

export default AddTable