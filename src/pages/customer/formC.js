import {useEffect, useState} from "react";
import db from "../../config/firebase-config"
import {collection, doc, getDoc, onSnapshot} from "firebase/firestore"
import {useNavigate} from "react-router-dom";


const AddTable = (s_name) => {

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
        formData.filter((result) => {
            return (result.v_box1.includes(s_name.s_name) && result.v_box6.includes(s_name.s_status) && result.v_box4.includes(s_name.s_nickname) && result.v_box5.includes(s_name.s_tel))
        }).map((data) => (
            <tbody>
            <tr onClick={() => handleJoinPublic(data.v_box1 + data.v_box2)} style={{cursor: "pointer"}}>
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