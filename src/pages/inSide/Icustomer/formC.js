import {useEffect, useState} from "react";
import db from "../../../config/firebase-config"
import {onSnapshot, collection, doc, getDoc} from "firebase/firestore"




const AddTable = () => {

    const [formData, setFormData] = useState([])

    useEffect(() => {
        onSnapshot(collection(db, "CustomersDetail"), (snapshot) => {
            setFormData(snapshot.docs.map((doc) => doc.data()))
        });
    }, [])

    return (

        formData.map((data) => (

            <tbody>
            <tr style={{cursor: "pointer"}}>
                <td>{data.v_box1}</td>
                <td>{data.v_box4}</td>
                <td>{data.v_box5}</td>
                <td>{data.v_box6}</td>

            </tr>
            </tbody>

        ))


    )
}

export default AddTable