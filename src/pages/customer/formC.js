import {useEffect, useState} from "react";
import db from "../../config/firebase-config"
import {onSnapshot, collection, doc, getDoc} from "firebase/firestore"
import {useNavigate} from "react-router-dom";



const AddTable = () => {

    const [formData, setFormData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        onSnapshot(collection(db, "CustomersDetail"), (snapshot) => {
            setFormData(snapshot.docs.map((doc) => doc.data()))
        });
    }, [])

    const handleJoinPublic = async (id) => {
        sessionStorage.setItem('roomKeyCus', id)
        const docRef1 = doc(db, "CustomersDetail", id);
        const docSnap = await getDoc(docRef1);
        if (docSnap.exists()) {
            navigate('/inc')
        }
    }

    return (

        formData.map((data) => (
            <tbody>
            <tr onClick={() => handleJoinPublic(data.v_box1+data.v_box2)} style={{cursor: "pointer"}}>
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