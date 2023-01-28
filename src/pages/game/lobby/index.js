import LobbyWrapper from "./LobbyWrapper";
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../../context/UserContexts";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Modal from "@material-ui/core/Modal";
import db from "../../../config/firebase-config"
import {doc, getDoc, setDoc} from "firebase/firestore"
import AddTable from "./AddTable";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Lobby() {

    const initialFormData = Object.freeze({
        email: sessionStorage.getItem('email'),
        title: "",
        timeLimit: 0,
        gameState: true,
        turn: 0,
        pubLic: "no",
        WinState: false,
        UniqueKey: "",
        winCon: 0
    });

    const initialSearchKey = Object.freeze({
        sales: "",
        genQo: "",
        day: "",
        month: "",
        year: "",
        status: "",
    });

    const navigate = useNavigate()
    const {user} = useUserContext()
    const [open, setOpen] = useState(false)
    const [formData, updateFormData] = useState(initialFormData)
    const [gameData, upDateGameData] = useState()
    const [pKey, generatePKey] = useState("")
    const [searchKey, setSearchKey] = useState(initialSearchKey)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [navigate, user])

    const validate = (title, win) => {
        const errors = [];

        if (title === "") {
            errors.push("Can't be empty");
        }
        if (win === 0) {
            errors.push("empty");
        }

        return errors;
    }

    const handleCreate = () => {
        setOpen(true)
        sessionStorage.removeItem('roomKeyCus');
        sessionStorage.removeItem('selectCus');
        navigate('/createQuotation')
    }

    const joinChange = (e) => {
        setSearchKey({
            ...searchKey,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validate(formData.title, formData.winCon)

        if (errors.length === 0) {
            const docRef1 = doc(db, "Game", pKey);
            await setDoc(docRef1, gameData);
            const docRef = doc(db, "User", pKey);
            await setDoc(docRef, formData);
            navigate('/game')
        } else {
            toast.error('Please fill in all the Criteria');
        }
    };

    return (
        <LobbyWrapper>
            <div className="wrapper-box pt-4">
                <div className="container pt-5" style={{height: "auto"}}>
                    <div className=''>
                    <div className="col px-2">
                        <IconButton variant="outlined" className="px-0" color="primary" onClick={handleCreate}
                                    size="small"><h4 className="text-dark mb-0">Quotation</h4><AddIcon
                            className="mt-1 mx-1 bg-primary rounded text-light"/></IconButton>
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
                                               name="genQo" label="Quotation Id" className="w-100" onChange={joinChange}/>
                                </div>
                            </div>
                            <div className="col-md-4 p-0 col">
                                <div className="col p-0 pt-1 mb-2 mx-2">
                                    <TextField id="outlined-search" type="name" InputLabelProps={{
                                        shrink: true
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="sales" label="Sales" className="w-100" onChange={joinChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="row d-flex">
                                    <div className="col p-0 pt-1 col-md mb-2 mx-2">
                                        <TextField id="outlined-search" type="search" InputLabelProps={{
                                            shrink: true,
                                        }} inputProps={{
                                            style: {
                                                height: "5px",
                                            },
                                        }}
                                                   name="day" label="Date" className="w-100" onChange={joinChange}/>
                                    </div>
                                    <div className="col p-0 pt-1 col-md mb-2 mx-2">
                                        <TextField id="outlined-search" type="search" InputLabelProps={{
                                            shrink: true,
                                        }} inputProps={{
                                            style: {
                                                height: "5px",
                                            },
                                        }}
                                                   name="month" label="Month" className="w-100" onChange={joinChange}/>
                                    </div>
                                    <div className="col p-0 pt-1 col-md mb-2 mx-2">
                                        <TextField id="outlined-search" type="search" InputLabelProps={{
                                            shrink: true,
                                        }} inputProps={{
                                            style: {
                                                height: "5px",
                                            },
                                        }}
                                                   name="year" label="Year" className="w-100" onChange={joinChange}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row d-flex justify-content-center">
                                    <div className="col p-0">
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
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="row mt-2 mx-1 table-responsive">
                            <table className="table table-sm border-bottom-0 overflow-auto" id="dtHorizontalExample" >
                                <thead className="bg-dark text-light">
                                <tr>
                                    <th scope="col" className="t-stick th-sm">Q-No</th>
                                    <th scope="col" className="t-stick th-sm">Customer</th>
                                    <th scope="col" className="t-stick th-sm">Sales</th>
                                    <th scope="col" className="t-stick th-sm">Status</th>
                                </tr>
                                </thead>
                                <AddTable genQo={searchKey.genQo} sales={searchKey.sales} status={searchKey.status}
                                          day={searchKey.day} month={searchKey.month} year={searchKey.year}
                                />
                            </table>
                    </div>
                </div>

            </div>
            <ToastContainer/>
        </LobbyWrapper>

    );
}
