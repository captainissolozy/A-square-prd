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
    const [formDataIn, setFormDataIn] = useState([])
    const [formData, updateFormData] = useState(initialFormData)
    const [formData2, updateFormData2] = useState(initialFormData2)
    const [searchKey, setSearchKey] = useState('')
    const [edit, setEdit] = useState(true)
    const [box2, setBox2] = useState("Taxpayer-num")
    const [box3, setBox3] = useState("Register-capital")
    const [boxLa, setBoxLa] = useState("Agent")
    const [v_box2, setV_Box2] = useState("")
    const [v_box3, setV_Box3] = useState("")
    const [v_boxLa, setV_BoxLa] = useState("")
    const [sendTo, setSendTo] = useState(1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        async function fetchData(){
            const docRef1 = doc(db, "CustomersDetail", sessionStorage.getItem("roomKeyCus"));
            const docSnap = await getDoc(docRef1);
            if (docSnap.exists()) {
                setFormDataIn(docSnap.data())
                console.log(formDataIn)
                console.log(sessionStorage.getItem("roomKeyCus"))
            }
        }
        await fetchData()
        if (formDataIn.type === "Private"){
            setBox2("surname")
            setV_Box2(formDataIn.surname)
            setBox3("email")
            setV_Box3(formDataIn.email)
            setBoxLa("nickname")
            setV_BoxLa(formDataIn.nickname)
            setSendTo(1)
        } else {
            setBoxLa("nickname")
            setBox3("registeredCapital")
            setBox2("taxpayerNum")
            setV_Box2(formDataIn.taxpayerNum)
            setV_Box3(formDataIn.registerCapital)
            setV_BoxLa(formDataIn.nickname)
            setSendTo(2)
        }
    },[formDataIn.name, edit])

    useEffect( () => {
        if (!user) {
            navigate('/')
        }
    }, [navigate, user])

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
        e.preventDefault()
        if (!edit){
            setEdit(true)
            if (sendTo === 1) {
                const docRef1 = doc(db, "CustomersDetail", formDataIn.name+formDataIn.nickname);
                await updateDoc(docRef1, formData);
            } else {
                const docRef1 = doc(db, "CustomersDetail", formDataIn.name+formDataIn.nickname);
                await updateDoc(docRef1, formData2);
            }
        }else {
            setEdit(false)
        }
    };

    return (
        <CustomerWrapper>
            <div className="wrapper-box pt-4">
                <div className="container pt-5">
                    <div className="heading-container mt-2 d-flex justify-content-start px-2">
                        <h4 className="pt-1 pt-md-1">Customer-Info:</h4>
                        <Button variant="outlined" color="warning" className="mx-2 " onClick={handleSubmit}>
                            Edit <EditIcon className="p-0 mb-1"/>
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
                                               name="name" label="Name" className="w-100" onChange={handleChange}
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
                                               name={box2} label={box2} className="w-100" onChange={handleChange}
                                               value={setV_Box2} disabled={edit}/>
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
                                               name={box3} label={box3} className="w-100" onChange={handleChange}
                                               value={v_box3} disabled={edit}/>
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
                                               label={boxLa} className="w-100" onChange={handleChange}
                                               value={v_boxLa} disabled={edit}/>
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
                                               name="tel" label="Tel." className="w-100" onChange={handleChange}
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
                                               label="Status" className="w-100" onChange={handleChange}
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
