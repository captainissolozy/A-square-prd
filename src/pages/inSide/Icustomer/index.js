import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../../context/UserContexts";
import {Button, TextField} from "@mui/material";
import Modal from "@material-ui/core/Modal";
import db from "../../../config/firebase-config"
import {doc, getDoc, updateDoc} from "firebase/firestore"
import FormC from "./formC";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomerWrapper from "./CustomerWrapper";
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";


export default function Customer() {

    const initialFormData = Object.freeze({
        v_box1: "",
        v_box2: "",
        v_box3: "",
        v_box4: "",
        v_box5: "",
        v_box6: ""
    });

    const navigate = useNavigate()
    const {user} = useUserContext()
    const [open, setOpen] = useState(false)
    const [formDataIn, setFormDataIn] = useState([])
    const [formData, updateFormData] = useState(initialFormData)
    const [edit, setEdit] = useState(true)
    const [textEdit, setTextEdit] = useState("Edit")
    const [textColor, setTextColor] = useState("warning")
    const [box2, setBox2] = useState("Taxpayer-num")
    const [box3, setBox3] = useState("Register-capital")
    const [boxLa, setBoxLa] = useState("Agent")
    const [count, setCount] = useState(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        async function fetchData(){
            const docRef1 = doc(db, "CustomersDetail", sessionStorage.getItem("roomKeyCus"));
            const docSnap = await getDoc(docRef1);
            if (docSnap.exists()) {
                setFormDataIn(docSnap.data())
                if (count <= 1){
                    setCount(count+1)
                }
            }
        }
        await fetchData()
    },[count])

    useEffect( () => {
        if (formDataIn.type === "Private"){
            setBox2("surname")
            setBox3("email")
            setBoxLa("nickname")
        } else {
            setBoxLa("nickname")
            setBox3("registeredCapital")
            setBox2("taxpayerNum")
        }
        updateFormData({
                v_box1: formDataIn.v_box1,
                v_box2: formDataIn.v_box2,
                v_box3: formDataIn.v_box3,
                v_box4: formDataIn.v_box4,
                v_box5: formDataIn.v_box5,
                v_box6: formDataIn.v_box6
            })
    }, [count])

    useEffect( () => {
        if (!user) {
            navigate('/')
        }
    }, [navigate, user])

    const handleClose = () => {
        setOpen(false)
    }
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!edit){
            setEdit(true)
            setTextEdit("Edit")
            setTextColor("warning")
            const docRef1 = doc(db, "CustomersDetail", formData.v_box1+formData.v_box2);
            await updateDoc(docRef1, formData);
        }else {
            setEdit(false)
            setTextEdit("Confirm")
            setTextColor("primary")
        }
    };

    return (
        <CustomerWrapper>
            <div className="wrapper-box pt-4">
                <div className="container pt-5">
                    <div className="heading-container mt-2 d-flex justify-content-start px-2 pt-3">
                        <h4 className="pt-1 pt-md-1">Customer-Info:</h4>
                        <Button variant="outlined" color={textColor} className="mx-2 " onClick={handleSubmit}>
                            {textEdit} <EditIcon className="p-0"/>
                        </Button>
                    </div>
                    <div className="row mt-3 d-flex justify-content-center">
                        <div className="row pt-1">
                            <div className="col px-2">
                                <div className="col pt-1 col-md-12 mb-2">
                                    <TextField id="v_box1" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="v_box1" label="Name" className="w-100" onChange={handleChange}
                                               value={formData.v_box1} disabled={true}/>
                                </div>
                            </div>
                            <div className="col p-0">
                                <div className="col p-0 pt-1 mb-2 mx-2">
                                    <TextField id="v_box2" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="v_box2" label={box2} className="w-100" onChange={handleChange}
                                               value={formData.v_box2} disabled={true}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col px-2">
                                <div className="col pt-1 col-md-12 mb-2">
                                    <TextField id="v_box3" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="v_box3" label={box3} className="w-100" onChange={handleChange}
                                               value={formData.v_box3} disabled={edit}/>
                                </div>
                            </div>
                            <div className="col p-0">
                                <div className="col p-0 pt-1 mb-2 mx-2">
                                    <TextField id="v_box4" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="v_box4" label={boxLa} className="w-100" onChange={handleChange}
                                               value={formData.v_box4} disabled={edit}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col px-2">
                                <div className="col pt-1 col-md-12 mb-2">
                                    <TextField id="v_box5" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="v_box5" label="Tel." className="w-100" onChange={handleChange}
                                               value={formData.v_box5} disabled={edit}/>
                                </div>
                            </div>
                            <div className="col p-0">
                                <div className="col p-0 pt-1 mb-2 mx-2">
                                    <TextField id="v_box6" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="v_box6" label="Status" className="w-100" onChange={handleChange}
                                               value={formData.v_box6} disabled={edit}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2 pt-4">

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
                    <div className="row m-2 pt-2 justify-content-end">
                        <div className="col-2 p-0 mx-3">
                        <Button variant="contained" className="w-100" color="secondary"
                                size="small"><AddIcon/>
                        </Button>
                        </div>
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
