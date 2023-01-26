import BasicTextFieldsRegis from "../../components/common/RegisForm";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useUserContext} from "../../context/UserContexts";
import db from "../../config/firebase-config"
import {doc, setDoc} from "firebase/firestore"

const RegisPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const navigate = (useNavigate());
    const {user, setUser} = useUserContext()

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        if (sessionStorage.getItem('role') !== "Admin") {
            navigate('/')
        }
    }, [navigate, user, sessionStorage.getItem('role')])

    const handleAction = () => {
        const authentication = getAuth();
        createUserWithEmailAndPassword(authentication, email, password).then(
            (response) => {
                sessionStorage.setItem('email', response.user.email)
                const docRef = doc(db, "UsersDetail", response.user.email);
                sessionStorage.setItem('User', JSON.stringify(response.user))
                setDoc(docRef, {email: response.user.email, role: role, name: name}).then()
                setUser(response.user)
                navigate("/lobby");

            }
        ).catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email Already in Use');
            }
        });
    }

    return (
        <div>
            <BasicTextFieldsRegis setEmail={setEmail}
                                  setName={setName}
                                  setPassword={setPassword}
                                  setRole={setRole}
                                  handleAction={() => handleAction()}/>
            <ToastContainer/>
        </div>
    )
}
export default RegisPage;