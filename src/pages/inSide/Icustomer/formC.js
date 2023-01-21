import {useEffect, useState} from "react";
import db from "../../../config/firebase-config"
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

            sessionStorage.setItem('gameKey', id)
            const docRef1 = doc(db, "Game", id);
            const docSnap = await getDoc(docRef1);
            if (docSnap.exists()) {
                navigate('/game')
        }
    }

    return (

        formData.map((data) => (

            <tbody>
            <tr onClick={() => handleJoinPublic(data.tel)} style={{cursor: "pointer"}}>
                <td>{data.name}</td>
                <td>{data.nickname}</td>
                <td>{data.tel}</td>
                <td>{data.status}</td>

            </tr>
            </tbody>

        ))


    )
}

export default AddTable