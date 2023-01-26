import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../../../context/UserContexts";
import {Button, IconButton, TextField} from "@mui/material";
import Modal from "@material-ui/core/Modal";
import db, {storage} from "../../../../config/firebase-config"
import {doc, getDoc, setDoc} from "firebase/firestore"
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import FormC from "./formC";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomerWrapper from "./CustomerWrapper";
import AddIcon from "@mui/icons-material/Add";
import ComboBox from "./combobox";


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

    const initialDocData = Object.freeze({
        name: ""
    });

    const navigate = useNavigate()
    const {user} = useUserContext()
    const [open, setOpen] = useState(false)
    const [openTwo, setOpenTwo] = useState(false)
    const [formDataIn, setFormDataIn] = useState([])
    const [formData, updateFormData] = useState(initialFormData)
    const [formData2, updateFormData2] = useState(initialFormData2)
    const [edit] = useState(true)
    const [box2, setBox2] = useState("Taxpayer-num")
    const [box3, setBox3] = useState("Register-capital")
    const [boxLa, setBoxLa] = useState("Agent")
    const [sendTo, setSendTo] = useState(2)
    const [count, setCount] = useState(0)
    const [docName, setDocName] = useState(initialDocData)
    const [file, setFile] = useState("");
    const [setPercent] = useState(0);
    const [listenC ,setListen] = useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        async function fetchData() {
            const docRef1 = doc(db, "CustomersDetail", listenC);
            const docSnap = await getDoc(docRef1);
            if (docSnap.exists()) {
                setFormDataIn(docSnap.data())
                if (count <= 1) {
                    setCount(count + 1)
                }
            }
        }
        await fetchData()
    }, [count, listenC])


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

    const handleCreate = () => {
        setOpen(true)
    }
    const handleCreateTwo = () => {
        setOpenTwo(true)
    }

    const listenChange = (data) => {
        setListen(data)
    }

    const handleSubmitUpload = (e) => {
        e.preventDefault()
        if (!file) {
            alert("Please choose a file first!")
        }
        const storageRef = ref(storage, `/media/Customer/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                    const docRef1 = doc(db, "CustomersDetail", formData.v_box1 + formData.v_box2, "media", docName.name);
                    await setDoc(docRef1, {docName, url});
                });
            }
        );
        setOpen(false)
        setDocName("")
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

    const handleChangeUploadFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleChangeUpload = (e) => {
        setDocName({
            ...docName,
            [e.target.name]: e.target.value
        })
    }

    const handleClose = () => {
        setOpen(false)
        setFile("")
    }

    const handleCloseTwo = () => {
        setOpenTwo(false)
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (sendTo === 1) {
            sessionStorage.setItem('roomKeyCus', formData.v_box1 + formData.v_box2)
            const docRef1 = doc(db, "CustomersDetail", formData.v_box1 + formData.v_box2);
            await setDoc(docRef1, formData);
            setOpen(false)
        } else {
            sessionStorage.setItem('roomKeyCus', formData2.v_box1 + formData2.v_box2)
            const docRef1 = doc(db, "CustomersDetail", formData2.v_box1 + formData2.v_box2);
            await setDoc(docRef1, formData2);
            setOpen(false)
        }
    };

    return (
        <CustomerWrapper>
            <div className="wrapper-box pt-4">
                <div className="container pt-5 mb-3">
                    <h4 className="pt-1 pt-md-1 px-2 mb-0">Quotation</h4>
                    <div className="row pt-2 pt-md-1 px-3 mb-0">
                        <div className="col px-2">
                            <div className="col pt-1 col-md-12">
                                <TextField id="v_box5" type="search" InputLabelProps={{
                                    shrink: true,
                                }} inputProps={{
                                    style: {
                                        height: "5px",
                                    },
                                }}
                                           name="subject" label="Subject" className="w-100"
                                           />
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
                                           name="projectName" label="Project Name" className="w-100"/>
                            </div>
                        </div>
                            <div className="col-12 px-1">
                                <div className="col p-0 pt-1 mb-2">
                                    <TextField id="v_box8" type="search" InputLabelProps={{
                                        shrink: true,
                                    }} inputProps={{
                                        style: {
                                            height: "5px",
                                        },
                                    }}
                                               label="sales"
                                               className="w-100 px-1"
                                               disabled={true}
                                               value={sessionStorage.getItem('email')}/>
                                </div>
                            </div>
                    </div>
                    <div className="heading-container mt-1 d-flex justify-content-start px-2 pt-1">
                        <div className="col">
                            <div className="col p-0">
                                <IconButton variant="outlined" className="px-1" color="primary"
                                            onClick={handleCreate}
                                            size="small"><h5 className="text-dark mb-0">Add Customer:</h5>
                                    <AddIcon className="mt-1 mx-1 bg-primary rounded text-light"/></IconButton>
                            </div>
                            <h5 className="px-1">Or Select:</h5>
                            <ComboBox func={listenChange}/>
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
                                               name="v_box1" label="Name" className="w-100"
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
                                               name="v_box2" label={box2} className="w-100"
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
                                               name="v_box3" label={box3} className="w-100"
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
                                               name="v_box4" label={boxLa} className="w-100"
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
                                               name="v_box5" label="Tel." className="w-100"
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
                                               name="v_box7" label="Address" className="w-100"
                                               value={formDataIn.v_box7} disabled={edit}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col p-0 mb-3">
                                <div className="col p-0 pt-1 mt-2 mx-2 d-flex flex-row-reverse">
                                    <Button variant="contained" className="" color="primary"
                                                onClick={handleCreate}
                                                size="small">Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2 pt-1">

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
                            <FormC docname={formData.v_box1 + formData.v_box2} name={docName.name}/>
                        </table>

                    </div>
                    <div className="row m-2 pt-2 justify-content-end">
                        <div className="col-2 p-0 mx-3">
                            <Button variant="contained" className="w-100" color="secondary" onClick={handleCreateTwo}
                                    size="small"><AddIcon/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={openTwo}
                onClose={handleCloseTwo}
                className="d-flex justify-content-center align-items-center"

            >

                <form className="border border-secondary p-2 m-2 rounded-2 row bg-white py-4">
                    <div className="pt-2">
                        <h4 className="col d-flex justify-content-start px-2">Add work</h4>
                        <div className="row mt-3 d-flex justify-content-center mb-2">
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
                                                   name="description" label="Description" className="w-100"
                                                   />
                                    </div>
                                </div>
                            </div>
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
                                                   name="quantity" label="Quantity" className="w-100"
                                        />
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
                                                   name="unit" label="Unit" className="w-100"
                                        />
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
                                                   name="labor" label="Labor" className="w-100"
                                                   />
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
                                                   name="material" label="Material" className="w-100"
                                                   />
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
                                                   name="total" label="Total" className="w-100"
                                                   />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row d-flex justify-content-center">
                                <Button type="submit" variant="contained" color="error" className="mx-3 col-3"
                                        onClick={handleCloseTwo}>
                                    Close
                                </Button>
                                <Button type="submit" variant="contained" color="primary" className="mx-3 px-2 col-3"
                                        onClick={handleSubmitUpload}>
                                    Add
                                </Button>

                        </div>
                    </div>
                </form>
            </Modal>
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
