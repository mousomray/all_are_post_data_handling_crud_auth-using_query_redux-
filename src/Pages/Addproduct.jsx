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
import { useNavigate } from "react-router-dom"; // Import Use Navigate
import { useState } from "react"; // Import Use State
import { useDispatch } from "react-redux"; // Import Use Dispatch
import { addproduct } from "./pageslice"; // Import registerUser Function
import { CircularProgress } from "@mui/material"; // Circle Loader 
const defaultTheme = createTheme();

const Addproduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // React Hook Form Area
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();


    const [image, setImage] = useState(null); // For Image
    const [loading, setLoading] = useState(false) // For Loading


    // Handle form submission
    const onSubmit = async (data) => {

        setLoading(true)

        // Handling Form Data 
        const formdata = new FormData();
        formdata.append("title", data.title);
        formdata.append("description", data.description);
        formdata.append("image", image);

        try {
            const response = await dispatch(addproduct(formdata))

            console.log("My Add product response is", response);

            if (response && response?.payload?.status === 200) {
                reset()
                setImage('')
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
                            marginTop: "40px",
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
                                Add Product
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
                                            {...register("description", {
                                                required: "This field is Required",

                                            })}
                                        />
                                        {errors?.description && (
                                            <p style={{ color: 'red' }}>{errors.description.message}</p>
                                        )}
                                    </Grid>


                                    {/*This form section is for the submit image*/}
                                    <Grid item xs={12}>
                                        <div style={{ marginBottom: '20px' }}>
                                            <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" accept="image/*" className="form-control" />

                                            {image !== "" && image !== undefined && image !== null ? (
                                                <img style={{ height: "180px" }} src={URL.createObjectURL(image)} alt="" className="upload-img" />
                                            ) : (
                                                <>{image === "" && <p style={{ color: 'white' }}>Drag or drop content here</p>}</>
                                            )}
                                        </div>
                                    </Grid>
                                    {/*Image area end*/}


                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {loading ? <CircularProgress color="inherit" /> : "Add"}
                                </Button>
                            </Box>
                        </Box>

                    </Paper>
                </Container>
            </ThemeProvider>
        </Wrapper>
    );
};

export default Addproduct;