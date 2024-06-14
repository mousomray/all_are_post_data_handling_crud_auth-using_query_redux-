import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Wrapper from "../Common/Wrapper"; // Import Wrapper 
import { useForm } from "react-hook-form"; // Import React Hook Form 
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom"; // Import Use Navigate
import { useState } from "react"; // Import Use State
import { useSelector, useDispatch } from "react-redux"; // Import Use Dispatch
import { detailsproduct, editproduct } from "./pageslice"; // Import registerUser Function
import { CircularProgress } from "@mui/material"; // Circle Loader 
import { useQuery } from "@tanstack/react-query";


const defaultTheme = createTheme();

const Editproduct = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // React Hook Form Area
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();


    const [image, setImage] = useState(null); // For Image
    const [loading, setLoading] = useState(false) // For Loading
    const { singledata } = useSelector((state) => state.Single);


    // Get product For Single Value (start)
    const getProduct = async () => {
        try {
            const response = await dispatch(detailsproduct(id));
            const reg = {
                title: response?.payload?.title,
                description: response?.payload?.description,
                image: response?.payload?.image
            };
            reset(reg)
        } catch (error) {
            console.log(error);
        }
    };

    useQuery({ queryFn: getProduct }) // This line of code work as same as useEffect()
    // Get product For Single Value (End)


    // Handle form submission
    const onSubmit = async (data) => {

        setLoading(true)

        // Handling Form Data 
        const formdata = new FormData();
        formdata.append("id", id)
        formdata.append("title", data.title);
        formdata.append("description", data.description);
        formdata.append("image", image || singledata.image); // Use the new image if selected, else keep the old one

        try {
            const response = await dispatch(editproduct(formdata))

            console.log("My Edit product response is", response);

            if (response && response?.payload?.status === 200) {
                setLoading(false)
                navigate('/showproduct')
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            setLoading(false)
        }
    };

    return (
        <Wrapper>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <Paper
                        elevation={5}
                        style={{
                            padding: "1rem 3rem",
                            marginTop: "100px",
                            width: "35rem",
                            marginBottom: "1rem",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Edit Product
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit(onSubmit)}
                                sx={{ mt: 3 }}
                            >
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="text"
                                            id="title"
                                            label="Title"
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontSize: '1rem' } // Adjust the font size as needed
                                            }}
                                            {...register("title", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Title must be atleast 3 characters"
                                                }
                                            })}
                                        />
                                        {errors?.title && (
                                            <p style={{ color: 'red' }}>{errors.title.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="text"
                                            id="description"
                                            label="Description"
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { fontSize: '1rem' } // Adjust the font size as needed
                                            }}
                                            {...register("description", {
                                                required: "This field is Required",

                                            })}
                                        />
                                        {errors?.description && (
                                            <p style={{ color: 'red' }}>{errors.description.message}</p>
                                        )}
                                    </Grid>


                                    {/*Handle Image Area Start*/}
                                    <Grid item xs={12}>
                                        <div style={{ marginBottom: '20px' }}>
                                            <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" accept="image/*" className="form-control" />

                                            {image !== "" &&
                                                image !== undefined &&
                                                image !== null ? (
                                                <img
                                                    height="180px"
                                                    src={URL.createObjectURL(image)}
                                                    alt=""
                                                    className="upload-img"
                                                />
                                            ) : (
                                                <>
                                                    {image === "" ? (
                                                        <img
                                                            height="180px"
                                                            src={image}
                                                            alt=""
                                                            className="upload-img"
                                                        />
                                                    ) : (
                                                        <img
                                                            height="180px"
                                                            src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${singledata?.image}`}
                                                            alt=""
                                                            className="upload-img"
                                                        />
                                                    )}
                                                </>
                                            )}


                                        </div>
                                    </Grid>
                                    {/*Handle Image area end*/}


                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {loading ? <CircularProgress color="inherit" /> : "Edit"}
                                </Button>
                            </Box>
                        </Box>

                    </Paper>
                </Container>
            </ThemeProvider>
        </Wrapper>
    );
};

export default Editproduct;