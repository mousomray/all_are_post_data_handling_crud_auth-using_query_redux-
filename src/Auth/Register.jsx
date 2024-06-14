import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Wrapper from "../Common/Wrapper"; // Import Wrapper 
import { useForm } from "react-hook-form"; // Import Hook Form 
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom"; // Import Use Navigate
import { useState, useEffect } from "react"; // Import Use State
import { useDispatch, useSelector } from "react-redux"; // Import Use Dispatch
import { registerUser } from "../Auth/authslice"; // Import registerUser Function
import { CircularProgress } from "@mui/material"; // Circle Loader 
import { useMutation } from "@tanstack/react-query"; // Import Mutation

const defaultTheme = createTheme();

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state?.Auth);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [image, setImage] = useState(null);


    // Function For Mutation
    const reg = async (data) => {

        // Handling Form Data Area
        const formdata = new FormData();
        formdata.append("first_name", data.first_name);
        formdata.append("last_name", data.last_name);
        formdata.append("email", data.email);
        formdata.append("password", data.password);
        formdata.append("profile_pic", image);

        const response = await dispatch(registerUser(formdata))
        console.log("My Register response is", response);
        if (response && response?.payload?.status === 200) {
            reset(); // Blank form after submitting data
            setImage('');
            navigate("/login");
        } else {
            navigate("/register")
        }
        console.log("My Reg response is ", response);
        return response.data;
    };

    // Start Mutation Area
    const mutation = useMutation({
        mutationFn: (data) => reg(data),
    });

    // Handle On Submit Area
    const onSubmit = (data) => {
        mutation.mutate(data);
    };


    return (
        <Wrapper>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <Paper
                        elevation={5}
                        style={{
                            padding: "1rem 3rem",
                            marginTop: "120px",
                            width: "35rem",
                            marginBottom: "100px",
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
                                Sign up
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
                                            id="first_name"
                                            label="First Name"
                                            {...register("first_name", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "First name must be atleast 3 characters"
                                                }
                                            })}
                                        />
                                        {errors?.first_name && (
                                            <p style={{ color: 'red' }}>{errors.first_name.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="last_name"
                                            label="last Name"
                                            {...register("last_name", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Last name must be atleast 3 characters"
                                                }
                                            })}
                                        />
                                        {errors?.last_name && (
                                            <p style={{ color: 'red' }}>{errors.last_name.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="email"
                                            id="email"
                                            label="Email"
                                            {...register("email", {
                                                required: "This field is required",
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: "Email Pattern should be xyz@gmail.com",
                                                },
                                            })}
                                        />
                                        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                    </Grid>


                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="password"
                                            id="password"
                                            label="Password"
                                            {...register("password", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must be 8 characters"
                                                }
                                            })}
                                        />
                                        {errors?.password && (
                                            <p style={{ color: 'red' }}>{errors.password.message}</p>
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
                                    {loading ? <CircularProgress color="inherit" /> : "Sign Up"}
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link to="/login" variant="body2">
                                            {"Don't have an account? Login Now"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>

                    </Paper>
                </Container>
            </ThemeProvider>
        </Wrapper>
    );
};

export default Signup;