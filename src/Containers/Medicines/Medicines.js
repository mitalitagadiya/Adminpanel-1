import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik, Formik, Form } from 'formik';

function Medicines(props) {
    const [open, setOpen] = React.useState(false);
    const [dopen, setDOpen] = React.useState(false);
    const [did, setDid] = useState(0);
    const [data, setData] = useState([]);

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
    };

    const handleEdit = (params) => {
        handleClickOpen();

        formik.setValues(params.row);
    }

    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("Medicines"));

        let id = Math.floor(Math.random() * 1000);
        let data = {
            id: id,
            ...values
        }

        console.log(id);

        if (localData === null) {
            localStorage.setItem("Medicines", JSON.stringify([data]))
        } else {
            localData.push(data);
            localStorage.setItem("Medicines", JSON.stringify(localData));
        }

        console.log(values, localData);

        handleClose();
        formik.resetForm();
        LoadData();
    }

    let schema = yup.object().shape({
        Name: yup.string().required("Please Enter Name."),
        Price: yup.number().required("Please Enter Price."),
        Quntity: yup.string().required("Please Enter Quntity."),
        Expiry: yup.string().required("Please Enter Expiry.")
    });

    const formik = useFormik({
        initialValues: {
            Name: '',
            Price: '',
            Quntity: '',
            Expiry: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values);
        },
    });

    const { handleBlur, handleSubmit, handleChange, errors, touched, values } = formik;

    const columns = [
        { field: 'Name', headerName: 'Name', width: 170 },
        { field: 'Price', headerName: 'Price', width: 170 },
        { field: 'Quntity', headerName: 'Quntity', width: 170 },
        { field: 'Expiry', headerName: 'Expiry', width: 170 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    const handleDelete = (params) => {
        let localData = JSON.parse(localStorage.getItem("Medicines"));

        let fData = localData.filter((l) => l.id !== did);

        localStorage.setItem("Medicines", JSON.stringify(fData));

        console.log(params.id, localData);
        handleClose();
        LoadData();
    }

    const LoadData = () => {
        let localData = JSON.parse(localStorage.getItem("Medicines"));

        if (localData !== null) {
            setData(localData);
        }

    }

    useEffect(() => {
        LoadData();
    }, [])

    return (
        <div>
            <h1>Medicines</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Medicines
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
                        {"Are you Sure Delete?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleDelete} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog fullWidth open={open} onClose={handleClose}>
                    <DialogTitle>ADD MEDICINES</DialogTitle>
                    <Formik values={formik}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    value={values.Name}
                                    margin="dense"
                                    name='Name'
                                    label="Medicines Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.Name && touched.Name ? <p>{errors.Name}</p> : ''}
                                <TextField
                                    value={values.Price}
                                    margin="dense"
                                    name='Price'
                                    label="Medicines Price"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.Price && touched.Price ? <p>{errors.Price}</p> : ''}
                                <TextField
                                    value={values.Quntity}
                                    margin="dense"
                                    name='Quntity'
                                    label="Medicines Quntity"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.Quntity && touched.Quntity ? <p>{errors.Quntity}</p> : ''}
                                <TextField
                                    value={values.Expiry}
                                    margin="dense"
                                    name='Expiry'
                                    label="Medicines Expiry"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.Expiry && touched.Expiry ? <p>{errors.Expiry}</p> : ''}
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit" >Add</Button>
                                </DialogActions>
                            </DialogContent>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
        </div>
    );
}

export default Medicines;