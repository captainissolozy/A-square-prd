import {useEffect, useState} from "react";
import db from "../../../config/firebase-config"
import {collection, onSnapshot} from "firebase/firestore"


const AddTable = (props) => {

    const [formData, setFormData] = useState([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        onSnapshot(collection(db, "CustomersDetail", props.docname, "media"), (snapshot) => {
            setFormData(snapshot.docs.map((doc) => doc.data()))
        });
    }, [props.docname])

    return (
        formData.map((data) => (
            <tbody>
            <tr style={{cursor: "pointer"}}>
                <td key={data.docName.name}>{data.docName.name}</td>
                <td key={data.url}><a href={data.url} target="_blank">{data.docName.name}.png</a></td>
            </tr>
            </tbody>

        ))


    )
}

export default AddTable