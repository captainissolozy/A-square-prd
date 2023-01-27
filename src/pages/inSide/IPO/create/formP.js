import {useEffect, useState} from "react";
import db from "../../../../config/firebase-config"
import {collection, doc, getDoc, onSnapshot} from "firebase/firestore"
import {useNavigate} from "react-router-dom";


const AddTable = (props) => {

    const [formData, setFormData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        onSnapshot(collection(db, "PO", props.roomCode, "Quotation"), (snapshot) => {
            setFormData(snapshot.docs.map((doc) => doc.data()))
        });
    }, [])

    const handleJoinPublic = async (id) => {
        sessionStorage.setItem('quotationID', id)
        const docRef1 = doc(db, "PO", props.roomCode, "Quotation", id);
        const docSnap = await getDoc(docRef1);
        console.log(docSnap.data())
        if (docSnap.exists()) {
            navigate('/staticQuotation2')
        }
    }

    return (
        formData.map((data) => (
            <tbody>
            <tr>
                <td onClick={() => handleJoinPublic(data.genQo)}>{data.genQo}</td>
                <td>{data.genQo}</td>
            </tr>
            </tbody>

        ))


    )
}

export default AddTable