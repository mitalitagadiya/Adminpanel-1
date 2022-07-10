import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik, Formik, Form } from 'formik';


function Patients(props) {
    const [open, setOpen] = React.useState(false);
    const [dopen, setDOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [did, setDid] = useState(0);
    const [update, setupdate] = useState(false);

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
        setupdate(false);
        formik.resetForm();
    };

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Name."),
        message: yup.string().required("Please Any Message."),
        date: yup.date().required("Please Enter date."),
        age: yup.string().required("Please Enter your Age.")

    });

    const formik = useFormik({
        initialValues: {
            name: '',
            message: '',
            date: '',
            age: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleupdate(values);
            } 
            else 
            {
                handleInsert(values);
            }
        },
    });

    const { handleBlur, handleSubmit, handleChange, errors, touched, values } = formik;

    const columns = [
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'message', headerName: 'Message', width: 170 },
        { field: 'date', headerName: 'Date', width: 170 },
        { field: 'age', headerName: 'Age', width: 170 },

        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <>
                    <IconButton  onClick={() => Edit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton  onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const Edit = (params) => {
        handleClickOpen();

        formik.setValues(params.row);

        setupdate(true)

    }

    const handleupdate =  (values) => {
        let localData = JSON.parse(localStorage.getItem("Patients"));

       let udata = localData.map((l) => {
            if(l.id === values.id){
                return values;
            }
            else
            {
                return l;
            }
        })

        localStorage.setItem("Patients",JSON.stringify(udata));
        console.log(values);

        handleClose();

        loadData();

        formik.resetForm();
    }


    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("Patients"));

        let id = Math.floor(Math.random() * 10000);
        let data = {
            id: id,
            ...values
        }

        if (localData === null) {
            localStorage.setItem("Patients", JSON.stringify([data]));
        } 
        else 
        {
            localData.push(data);

            localStorage.setItem("Patients", JSON.stringify(localData));
        }

        console.log(localData);

        handleClose();

        formik.resetForm();

        loadData();
    }

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("Patients"));

        if(localData){
            setData(localData);
        }
    }

    const handleDelete = (params) => {
        let localData = JSON.parse(localStorage.getItem("Patients"));

        let fData = localData.filter((l) => l.id !== did);

        localStorage.setItem("Patients", JSON.stringify(fData));
        console.log(params.id);

        loadData();

        handleClose();

    }

    useEffect(() => {

        loadData();

    }, 
    [])

    return (
        <div>
            <h1>Patients</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Patients data
                </Button>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
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
                        <Button onClick={handleClose}>
                            No
                        </Button>
                        <Button onClick={handleDelete} autoFocus>
                            yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog fullWidth open={open} onClose={handleClose}>
                    <DialogTitle>
                        PATIENTS
                    </DialogTitle>
                    <Formik values={formik}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    value={values.name}
                                    margin="dense"
                                    name='name'
                                    label="Patients Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                                <TextField
                                    value={values.message}
                                    margin="dense"
                                    name='message'
                                    label="Message"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.message && touched.message ? <p>{errors.message}</p> : ''}
                                <TextField
                                    value={values.age}
                                    margin="dense"
                                    name='age'
                                    label="Patients Age"
                                    type="Age"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.age && touched.age ? <p>{errors.age}</p> : ''}
                                <br></br>
                                <br></br>
                                <TextField
                                    value={values.date}
                                    margin="dense"
                                    name='date'
                                    type="date"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.date && touched.date ? <p>{errors.date}</p> : ''}
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    {
                                        update ?
                                            <Button type="submit">Update</Button>
                                            :
                                            <Button type="submit">Submit</Button>
                                    }
                                </DialogActions>
                            </DialogContent>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
        </div >
    );
}

export default Patients;