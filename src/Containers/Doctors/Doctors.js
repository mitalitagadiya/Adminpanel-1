import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik, Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Doctors(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [dopen, setDOpen] = React.useState(false);
    const [did, setDid] = useState(0);
    const [update, setUpdate] = useState(false);
    const [search ,setSerch ] = useState([ ]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
        setUpdate(false);
        formik.resetForm();
    };

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Your Name."),
        email: yup.string().email("Please Enter Vaild Email Id.").required("Please Enter Email Id."),
        phone: yup.string().required('Phone number is required.')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleClickUpdate(values);
            } else {
                handleInsert(values);
            }
        },
    });

    const { handleBlur, handleChange, handleSubmit, errors, touched, values } = formik;

    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("Doctors"));

        let id = Math.floor(Math.random() * 10000);

        let data = {
            id: id,
            ...values
        }

        if (localData === null) {
            localStorage.setItem("Doctors", JSON.stringify([data]))
        } else {
            localData.push(data);
            localStorage.setItem("Doctors", JSON.stringify(localData))
        }
        console.log(data);
        handleClose();
        LoadData();
        formik.resetForm()
    }

    const columns = [
        { field: 'name', headerName: 'name', width: 170 },
        { field: 'email', headerName: 'email', width: 250 },
        { field: 'phone', headerName: 'phone', width: 170 },
        { field: 'message', headerName: 'message', width: 250 },

        {
            field: "action",
            headerName: "Action",
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const handleDelete = (params) => {
        let localData = JSON.parse(localStorage.getItem("Doctors"));

        let fData = localData.filter((d) => d.id !== did);

        localStorage.setItem("Doctors", JSON.stringify(fData));
        console.log(fData);
        LoadData();
        handleClose();
    }

    const handleEdit = (params) => {
        handleClickOpen();

        setUpdate(true);
        formik.setValues(params.row)
    }

    const handleClickUpdate = () => {
        let localData = JSON.parse(localStorage.getItem("Doctors"));

        let uData = localData.map((u) => {
            if (u.id === values.id) {
                return values;
            } else {
                return u;
            }
        })
        console.log(uData);
        localStorage.setItem("Doctors", JSON.stringify(uData));
        handleClose();
        LoadData();
    }

    const handleSearch = (val) => {
        let localData = JSON.parse(localStorage.getItem("Doctors"));

        let mData = localData.filter((s) => (
            s.name.toLowerCase().includes(val.toLowerCase()) ||
            s.email.includes(val.toLowerCase()) ||
            s.phone.toString().includes(val)
        ));
        console.log(mData);
        setSerch(mData);
    }

    const finalData = search.length > 0 ? search : data ;

    const LoadData = () => {
        let localData = JSON.parse(localStorage.getItem("Doctors"));

        if (localData !== null) {
            setData(localData);
        }
    }

    useEffect(() => {
        LoadData();
    }, [])


    return (
        <div>
            <h1>Doctors</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Doctors List
                </Button>
                <TextField
                    name='search'
                    id="name"
                    label="Doctors search"
                    type="search"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <Dialog
                    open={dopen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are You Sure Delete?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleDelete} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={finalData}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
                <Dialog fullWidth open={open} onClose={handleClose}>
                    <DialogTitle>Add Doctors Information</DialogTitle>
                    <Formik values={formik}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    value={values.name}
                                    name='name'
                                    id="name"
                                    label="Doctors Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                                <TextField
                                    value={values.email}
                                    name='email'
                                    id="name"
                                    label="Email Address"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.email && touched.email ? <p>{errors.email}</p> : ''}
                                <TextField
                                    value={values.phone}
                                    name='phone'
                                    id="name"
                                    label="Doctors Phone No."
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.phone && touched.phone ? <p>{errors.phone}</p> : ''}
                                <TextField
                                    value={values.message}
                                    name='message'
                                    id="message"
                                    label="Message"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.message && touched.message ? <p>{errors.message}</p> : ''}
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    {
                                        update ?
                                            <Button type='submit'>update</Button>
                                            :
                                            <Button type='submit'>Submit</Button>
                                    }
                                </DialogActions>
                            </DialogContent>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
        </div>
    );
}

export default Doctors;