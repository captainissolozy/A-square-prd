import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../context/UserContexts";
import {
    Button,
    IconButton,
    TextField
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Modal from "@material-ui/core/Modal";
import db from "../../config/firebase-config"
import {doc, getDoc, setDoc} from "firebase/firestore"
import FormC from "./formC";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomerWrapper from "./CustomerWrapper";


export default function Customer() {

    const initialFormData2 = Object.freeze({
        type: "Organization",
        v_box1: "",
        v_box2: "",
        v_box3: "",
        v_box4: "",
        v_box5: "",
        v_box6: "Incompleted",
        v_box7: ""
    });

    const initialFormData = Object.freeze({
        type: "Private",
        v_box1: "",
        v_box2: "",
        v_box3: "",
        v_box4: "",
        v_box5: "",
        v_box6: "Incompleted",
        v_box7: ""
    });

    const navigate = useNavigate()
    const {user} = useUserContext()
    const [open, setOpen] = useState(false)
    const [formData, updateFormData] = useState(initialFormData)
    const [formData2, updateFormData2] = useState(initialFormData2)
    const [box2, setBox2] = useState("Taxpayer-num")
    const [box3, setBox3] = useState("Register-capital")
    const [boxLa, setBoxLa] = useState("Agent")
    const [sendTo, setSendTo] = useState(2)
    const [searchChanged, setSearchChanged] = useState({
        name: "",
        status: "",
        nickname: "",
        tel: ""
    })

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [navigate, user])

    const handleCreate = () => {
        setOpen(true)
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
        }else if (sendTo === 2) {
            updateFormData2({
                ...formData2,
                [e.target.name]: e.target.value.trim()
            })
        }
    }

    const handleChangeToOrg = () => {
        setBox2("taxpayerNum")
        setBox3("registerCapital")
        setSendTo(2)
        setBoxLa("Agent")
    }

    const handleChangeToPer = () => {
        setBox2("surname")
        setBox3("email")
        setSendTo(1)
        setBoxLa("Nickname")
    }

    const joinChange = (e) => {
        setSearchChanged({
            ...searchChanged,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (sendTo === 1) {
            sessionStorage.setItem('roomKeyCus', formData.v_box1+formData.v_box2)
            const docRef1 = doc(db, "CustomersDetail", formData.v_box1+formData.v_box2);
            await setDoc(docRef1, formData);
            navigate('/inc')
        } else {
            sessionStorage.setItem('roomKeyCus', formData2.v_box1+formData2.v_box2)
            const docRef1 = doc(db, "CustomersDetail", formData2.v_box1+formData2.v_box2);
            await setDoc(docRef1, formData2);
            navigate('/inc')
        }
    };


    return (
        <CustomerWrapper>
            <div className="wrapper-box pt-4 ">
                <div className="container pt-4">
                    <div className="my-1 p-3 pb-3 row d-flex justify-content-center">
                    <div className="col-10 px-2 d-flex justify-content-start col-md-9">
                            <IconButton variant="outlined" className="px-0" color="primary" onClick={handleCreate}
                                    size="small"><h4 className="text-dark mb-0">Customer</h4><AddIcon className="mt-1 mx-1 bg-primary rounded text-light"/></IconButton>
                    </div>
                    <div className="row mt-2 d-flex justify-content-center">
                        <div className="row d-flex justify-content-center">
                            <div className="col-8 px-2 col-md-6">
                                <div className="col pt-1 col-md-12 mb-2">
                                    <TextField id="outlined-search" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="name" label="Name" className="w-100" onChange={joinChange}/>
                                </div>
                            </div>
                            <div className="col p-0 col-md-3">
                                <div className="col p-0 pt-1 mb-2 mx-2">
                                    <TextField id="outlined-search" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="status" label="Status" className="w-100" onChange={joinChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6 p-0 col-8">
                                <div className="col p-0 pt-1 mb-2 mx-2">
                                    <TextField id="outlined-search" type="name" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="nickname" label="Nickname" className="w-100" onChange={joinChange}/>
                                </div>
                            </div>
                            <div className="col p-0 col-md-3">
                                <div className="col p-0 pt-1 mb-2 mx-2">
                                    <TextField id="outlined-search" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="tel" label="Tel." className="w-100" onChange={joinChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="row m-2 mt-1 pt-2">

                            <table className="table table-sm border-bottom-0">
                                <thead className="bg-dark text-light">
                                <tr>
                                    <th scope="col" className="t-stick">Name</th>
                                    <th scope="col" className="t-stick">Contact</th>
                                    <th scope="col" className="t-stick">tel.</th>
                                    <th scope="col" className="t-stick">status</th>
                                </tr>
                                </thead>
                                <FormC s_name={searchChanged.name} s_status={searchChanged.status} s_nickname={searchChanged.nickname} s_tel={searchChanged.tel}/>
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
                    <div className="heading-container mt-2 d-flex justify-content-start">
                        <h3>Customer</h3>
                        <Button type="submit" variant="outlined" color="warning" className="mx-2 m"
                                onClick={handleChangeToOrg}>
                            Org
                        </Button>
                        <Button type="submit" variant="outlined" color="success" className="mx-1 m"
                                onClick={handleChangeToPer}>
                            Private
                        </Button>
                    </div>
                    <TextField className="my-3"
                               label="Name"
                               name="v_box1"
                               required
                               onChange={handleChange}
                    />
                    <TextField className="my-3"
                               label={box2}
                               name="v_box2"
                               type="text"
                               required
                               onChange={handleChange}
                    />
                    <TextField className="my-3"
                               label={box3}
                               name="v_box3"
                               type="text"
                               required
                               onChange={handleChange}
                    />
                    <TextField className="my-3"
                               label={boxLa}
                               name="v_box4"
                               variant="filled"
                               type="text"
                               required
                               onChange={handleChange}
                    />
                    <TextField className="my-3"
                               label="Tel."
                               name="v_box5"
                               variant="filled"
                               type="text"
                               required
                               onChange={handleChange}
                    />
                    <TextField className="my-3"
                               label="Address"
                               name="v_box7"
                               type="text"
                               required
                               onChange={handleChange}
                    />

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
