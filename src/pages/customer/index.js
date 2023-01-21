import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../context/UserContexts";
import {
    Button,
    Fab, IconButton,
    TextField
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Modal from "@material-ui/core/Modal";
import db from "../../config/firebase-config"
import {doc, getDoc, setDoc} from "firebase/firestore"
import {v4 as uuid} from 'uuid';
import FormC from "./formC";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomerWrapper from "./CustomerWrapper";


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
    const [formData, updateFormData] = useState(initialFormData)
    const [formData2, updateFormData2] = useState(initialFormData2)
    const [pKey, generatePKey] = useState("")
    const [searchKey, setSearchKey] = useState('')
    const [box2, setBox2] = useState("Taxpayer-num")
    const [box3, setBox3] = useState("Register-capital")
    const [boxLa, setBoxLa] = useState("Agent")
    const [sendTo, setSendTo] = useState(2)

    useEffect(() => {
        if (!user) {
            navigate('/')
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
        setSearchKey(e.target.value.trim())
    }

    const handleSubmit = async (e) => {
        console.log(sendTo)
        console.log(formData2)
        e.preventDefault()
        if (sendTo === 1) {
            const docRef1 = doc(db, "CustomersDetail", formData.name+formData.nickname);
            await setDoc(docRef1, formData);
            console.log(formData)
        } else {
            const docRef1 = doc(db, "CustomersDetail", formData2.name+formData2.nickname);
            await setDoc(docRef1, formData2);
            console.log(formData2)
        }
    };

    const handleJoin = async (e) => {

        e.preventDefault()
        sessionStorage.setItem('gameKey', searchKey)
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
                    <div className="col px-2">
                            <IconButton variant="outlined" className="px-0" color="primary" onClick={handleCreate}
                                    size="small"><h4 className="text-dark mb-0">Customer</h4><AddIcon className="mt-1 mx-1 bg-primary rounded text-light"/></IconButton>
                    </div>
                    <div className="row mt-3 d-flex justify-content-center">
                        <div className="row">
                            <div className="col-8 px-2">
                                <div className="col pt-1 col-md-12 mb-2">
                                    <TextField id="outlined-search" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               label="Name" className="w-100" onChange={joinChange}/>
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
                                               label="Status" className="w-100" onChange={joinChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 p-0 col-8">
                                <div className="col p-0 pt-1 mb-2 mx-2">
                                    <TextField id="outlined-search" type="name" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               label="Nickname" className="w-100" onChange={joinChange}/>
                                </div>
                            </div>
                            <div className="col-4 col-md-4">
                                <div className="row d-flex justify-content-center">
                                    <div
                                        className="col d-flex justify-content-center col-md mx-2 px-0 pt-lg-0 m-2"
                                        onClick={handleJoin}>
                                        <Button variant="contained" className="w-100" color="secondary"
                                                size="small"><SearchIcon/></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className="col-12 t-tab box p-0">
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
                               name="name"
                               required
                               onChange={handleChange}
                    />
                    <TextField className="my-3"
                               label={box2}
                               name={box2}
                               type="text"
                               required
                               onChange={handleChange}
                    />
                    <TextField className="my-3"
                               label={box3}
                               name={box3}
                               type="text"
                               required
                               onChange={handleChange}
                    />
                    <TextField className="my-3"
                               label={boxLa}
                               name="nickname"
                               variant="filled"
                               type="text"
                               required
                               onChange={handleChange}
                    />
                    <TextField className="my-3"
                               label="Tel."
                               name="tel"
                               variant="filled"
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
