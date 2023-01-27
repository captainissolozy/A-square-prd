import {useEffect, useState} from "react";
import db from "../../../config/firebase-config"
import {collection, doc, getDoc, onSnapshot} from "firebase/firestore"
import {useNavigate} from "react-router-dom";


const AddTable = (props) => {

    const [formData, setFormData] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        onSnapshot(collection(db, "PO"), (snapshot) => {
            setFormData(snapshot.docs.map((doc) => doc.data()))
        });
    }, [])

    const handleJoinPublic = async (id) => {
        sessionStorage.setItem('projectID', id)
        const docRef1 = doc(db, "PO", id);
        const docSnap = await getDoc(docRef1);
        if (docSnap.exists()) {
            navigate("/insideQuotation")
        }
    }

    return (
        formData.filter( result => {
            return (result.v_box6.includes(props.status) && result.genQo.includes(props.genQo)
                    && result.sales.includes(props.sales) && result.date.toString().includes(props.day)
                    && result.month.toString().includes(props.month) && result.year.toString().includes(props.year))
        }).map((data) => (
            <tbody>
            <tr onClick={() => handleJoinPublic(data.genQo)} style={{cursor: "pointer"}}>
                <td>{data.genQo}</td>
                <td>{data.v_box1}</td>
                <td className="overflow-hidden">{data.sales}</td>
                <td>{data.v_box6}</td>
            </tr>
            </tbody>

        ))
    )
}

export default AddTable