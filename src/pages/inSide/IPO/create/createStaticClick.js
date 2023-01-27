import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../../../context/UserContexts";
import {Button, TextField} from "@mui/material";
import db from "../../../../config/firebase-config"
import {doc, getDoc} from "firebase/firestore"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomerWrapper from "./CustomerWrapper";
import FormPStatic2 from "./formPStatic2";



export default function Customer(props) {

    const initialDocData = Object.freeze({
        description: "",
        quantity: 1,
        unit: "",
        labor: 0,
        material: 0
    });


    const navigate = useNavigate()
    const {user} = useUserContext()
    const [formDataIn, setFormDataIn] = useState([])
    const [formDataIn2, setFormDataIn2] = useState([])
    const [edit] = useState(true)
    const [box2, setBox2] = useState("Taxpayer-num")
    const [box3, setBox3] = useState("Register-capital")
    const [boxLa, setBoxLa] = useState("Agent")
    const [count, setCount] = useState(0)
    const [listenC, setListen] = useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        async function fetchData() {
            const docRef1 = doc(db, "PO", sessionStorage.getItem("projectID"));
            const docSnap = await getDoc(docRef1);
            if (docSnap.exists()) {
                setFormDataIn(docSnap.data())
                if (count <= 1) {
                    setCount(count + 1)
                }
            }
        }
        await fetchData()
    }, [count])

    useEffect(async () => {
        const docRef1 = doc(db, "PO", sessionStorage.getItem("projectID"), "Quotation", sessionStorage.getItem("quotationID"));
        const docSnap = await getDoc(docRef1);
        if (docSnap.exists()) {
            setFormDataIn2(docSnap.data())
        }
    }, [])

    useEffect(() => {
        if (formDataIn.type === "Private") {
            setBox2("surname")
            setBox3("email")
            setBoxLa("nickname")
        } else {
            setBoxLa("nickname")
            setBox3("registeredCapital")
            setBox2("taxpayerNum")
        }

    }, [count, formDataIn.type, listenC])

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [navigate, user])

    const handleGoNext = async () => {
        navigate("/insideQuotation")
        sessionStorage.setItem("projectID", formDataIn.genQo)
    };

    return (
        <CustomerWrapper>
            <div className="wrapper-box pt-4">
                <div className="container pt-5 mb-3">
                    <h4 className="pt-1 pt-md-1 px-2 mb-2">Quotation: {formDataIn2.genQo}</h4>
                    <form>
                        <div className="row pt-2 pt-md-1 px-3 mb-0">
                            <div className="col px-2">
                                <div className="col pt-1 col-md-12">
                                    <TextField type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="name" label="Name" className="w-100" required value={formDataIn.projectName} disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="col p-0">
                                <div className="col p-0 pt-1 mb-2 mx-2">
                                    <TextField type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="sales" label="Sales" className="w-100" value={sessionStorage.getItem("email")} disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row pt-2 pt-md-1 px-3 mb-0">
                            <div className="col px-2">
                                <div className="col pt-1 col-md-12">
                                    <TextField type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="subject" label="Subject" className="w-100" value={formDataIn.subject} required disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="col p-0">
                                <div className="col p-0 pt-1 mb-2 mx-2">
                                    <TextField type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               name="projectName" label="Project Name" className="w-100" value={formDataIn.projectName} required disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 d-flex justify-content-center">
                            <div className="row pt-1">
                                <h6 className="pt-1 pt-md-1">Customer-info:</h6>
                                <div className="col px-2">
                                    <div className="col pt-1 col-md-12 mb-2">
                                        <TextField id="v_box1" type="search" InputLabelProps={{
                                            shrink: true,
                                        }} inputProps={{
                                            style: {
                                                height: "5px",
                                            },
                                        }}
                                                   name="v_box1" label="Name" className="w-100" required
                                                   value={formDataIn.v_box1} disabled={true}/>
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
                                                   name="v_box2" label={box2} className="w-100" required
                                                   value={formDataIn.v_box2} disabled={true}/>
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
                                                   name="v_box3" label={box3} className="w-100" required
                                                   value={formDataIn.v_box3} disabled={edit}/>
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
                                                   name="v_box4" label={boxLa} className="w-100" required
                                                   value={formDataIn.v_box4} disabled={edit}/>
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
                                                   name="v_box5" label="Tel." className="w-100" required
                                                   value={formDataIn.v_box5} disabled={edit}/>
                                    </div>
                                </div>
                                <div className="col p-0">
                                    <div className="col p-0 pt-1 mb-2 mx-2">
                                        <TextField id="v_box7" type="search" InputLabelProps={{
                                            shrink: true,
                                        }} inputProps={{
                                            style: {
                                                height: "5px",
                                            },
                                        }}
                                                   name="v_box7" label="Address" className="w-100" required
                                                   value={formDataIn.v_box7} disabled={edit}/>
                                    </div>
                                </div>
                                <div className="col-12 px-1">
                                    <div className="col p-0 pt-1 mb-2">
                                        <TextField name="payment" type="text" variant="filled" InputLabelProps={{
                                            shrink: true,
                                        }} inputProps={{
                                            style: {
                                                height: "20px",
                                            },
                                        }}
                                                   label="payment"
                                                   value={formDataIn2.payment}
                                                   disabled={true}
                                                   className="w-100 px-1"
                                                   required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="container-fluid p-0">
                        <div className="row m-2 pt-1 mb-0">

                            <table className="table table-sm border-bottom-0">
                                <thead className="bg-dark text-light">
                                <tr>
                                    <th scope="col" className="t-stick">Description</th>
                                    <th scope="col" className="t-stick">Quantity</th>
                                    <th scope="col" className="t-stick">unit</th>
                                    <th scope="col" className="t-stick">labor</th>
                                    <th scope="col" className="t-stick">material</th>

                                </tr>
                                </thead>
                                <FormPStatic2/>
                            </table>

                        </div>
                        <div className="row m-1 mt-0 justify-content-end">
                            <div className="col-4 p-0 mt-2 col-md-2 mx-1">
                                <Button variant="contained" className="w-100" color="secondary" onClick={handleGoNext}
                                        size="small">Back
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </CustomerWrapper>

    );
}
