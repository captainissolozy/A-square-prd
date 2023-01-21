import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../../context/UserContexts";
import {Button, TextField} from "@mui/material";
import Modal from "@material-ui/core/Modal";
import db from "../../../config/firebase-config"
import {doc, getDoc, setDoc} from "firebase/firestore"
import {v4 as uuid} from 'uuid';
import FormC from "./formC";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomerWrapper from "./CustomerWrapper";
import EditIcon from '@mui/icons-material/Edit';


export default function Customer() {

    const initialFormData2 = Object.freeze({
        sales: sessionStorage.getItem('email'),
        type: "Organization",
        name: "",
        taxpayerNum: "",
        registerCapital: "",
        nickname: "",
        tel: "",
        status: "Active"
    });

    const initialFormData = Object.freeze({
        sales: sessionStorage.getItem('email'),
        type: "Private",
        name: "",
        surname: "",
        email: "",
        nickname: "",
        tel: "",
        status: "Active"
    });

    const navigate = useNavigate()
    const {user} = useUserContext()
    const [open, setOpen] = useState(false)
    const [formDataIn, setFormDataIn] = useState(initialFormData)
    const [formData, updateFormData] = useState(initialFormData)
    const [formData2, updateFormData2] = useState(initialFormData2)
    const [pKey, generatePKey] = useState("")
    const [searchKey, setSearchKey] = useState('')
    const [sendTo, setSendTo] = useState(2)
    const [edit, setEdit] = useState(true)
    const [box2, setBox2] = useState("Taxpayer-num")
    const [box3, setBox3] = useState("Register-capital")
    const [boxLa, setBoxLa] = useState("Agent")

    useEffect(async () => {
        if (!user) {
            navigate('/')
        }
        const docRef1 = doc(db, "CustomersDetail", sessionStorage.getItem("roomKeyCus"));
        const docSnap = await getDoc(docRef1);
        if (docSnap.exists()) {
            setFormDataIn(docSnap.data())
            console.log(formDataIn)
        }
    }, [navigate, user])


    const generateKey = function () {
        const unique_id = uuid();
        return unique_id.slice(0, 8);
    }
    const handleCreate = () => {
        setOpen(true)
        generatePKey(generateKey)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleChange = (e) => {
        if (sendTo === 1) {
            updateFormData({
                ...formData,
                [e.target.name]: e.target.value.trim()
            })
        } else if (sendTo === 2) {
            updateFormData2({
                ...formData2,
                [e.target.name]: e.target.value.trim()
            })
        }
    }


    const joinChange = (e) => {
        setSearchKey(e.target.value.trim())
    }

    const handleSubmit = async (e) => {
        console.log(sendTo)
        console.log(formData2)
        e.preventDefault()
        if (sendTo === 1) {
            const docRef1 = doc(db, "CustomersDetail", formData.nickname);
            await setDoc(docRef1, formData);
            console.log(formData)
        } else {
            const docRef1 = doc(db, "CustomersDetail", formData2.name);
            await setDoc(docRef1, formData2);
            console.log(formData2)
        }
    };

    const handleJoin = async (e) => {

        e.preventDefault()
        const docRef1 = doc(db, "Game", searchKey);
        const docSnap = await getDoc(docRef1);
        if (docSnap.exists()) {
            navigate('/game')
        } else {
            toast.error('Please fill in the correct Room-key');
        }
    }

    return (
        <CustomerWrapper>
            <div className="wrapper-box pt-4">
                <div className="container pt-5">
                    <div className="heading-container mt-2 d-flex justify-content-start px-2">
                        <h3 className="pt-1 pt-md-1">Customer:</h3>
                        <Button variant="outlined" color="warning" className="mx-2 ">
                            {formDataIn.type} <EditIcon className="p-0 mb-1"/>
                        </Button>
                    </div>
                    <div className="row mt-3 d-flex justify-content-center">
                        <div className="row">
                            <div className="col px-2">
                                <div className="col pt-1 col-md-12 mb-2">
                                    <TextField id="outlined-search" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="name" label="Name" className="w-100" onChange={joinChange}
                                               value={formDataIn.name} disabled={edit}/>
                                </div>
                            </div>
                            <div className="col p-0">
                                <div className="col p-0 pt-1 mb-2 mx-2">
                                    <TextField id="outlined-search" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               label={box2} className="w-100" onChange={joinChange}
                                                disabled={edit}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col px-2">
                                <div className="col pt-1 col-md-12 mb-2">
                                    <TextField id="outlined-search" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name={box3} label={box3} className="w-100" onChange={joinChange}
                                                disabled={edit}/>
                                </div>
                            </div>
                            <div className="col p-0">
                                <div className="col p-0 pt-1 mb-2 mx-2">
                                    <TextField id="outlined-search" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               label={boxLa} className="w-100" onChange={joinChange}
                                               value={formDataIn.registerCapital} disabled={edit}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col px-2">
                                <div className="col pt-1 col-md-12 mb-2">
                                    <TextField id="outlined-search" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="tel" label="Tel." className="w-100" onChange={joinChange}
                                               value={formDataIn.tel} disabled={edit}/>
                                </div>
                            </div>
                            <div className="col p-0">
                                <div className="col p-0 pt-1 mb-2 mx-2">
                                    <TextField id="outlined-search" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               label="Status" className="w-100" onChange={joinChange}
                                               value="Active" disabled={edit}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2">

                        <table className="table table-sm border-bottom-0">
                            <thead className="bg-dark text-light">
                            <tr>
                                <th scope="col" className="t-stick">Name</th>
                                <th scope="col" className="t-stick">Contact</th>
                                <th scope="col" className="t-stick">tel.</th>
                                <th scope="col" className="t-stick">status</th>
                            </tr>
                            </thead>
                            <FormC/>
                        </table>

                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                className="d-flex justify-content-center align-items-center"

            >

                <form className="border border-secondary p-4 m-2 rounded-2 row bg-white">
                    <div className="pt-2">
                        <div className="col d-flex justify-content-center">
                            <Button type="submit" variant="contained" color="secondary" className="mx-3 m"
                                    onClick={handleClose}>
                                Close
                            </Button>

                            <Button type="submit" variant="contained" color="primary" className="mx-3"
                                    onClick={handleSubmit}>
                                Create
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
            <ToastContainer/>
        </CustomerWrapper>

    );
}
