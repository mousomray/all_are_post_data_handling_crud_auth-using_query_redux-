import React from 'react'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'; // Use Dispatch
import { Navigate } from 'react-router-dom';
import { check_token } from './Auth/authslice'; // For Check Token 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // For React Query

// Import Pages Area 
import Home from './Pages/Home'
import Register from './Auth/Register';
import Login from './Auth/Login'
import Addproduct from './Pages/Addproduct';
import Showproduct from './Pages/Showproduct';
import Details from './Pages/Details';
import Editproduct from './Pages/Editproduct';
import Dashboard from './Pages/Dashboard';


const App = () => {

    const dispatch = useDispatch();
    //check token avable or not
    function PrivateRoute({ children }) {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        return token !== null && token !== undefined ? (
            children
        ) : (
            <Navigate to="/login" />
        );
    }

    // Create Query Client For React Query
    const queryClient = new QueryClient()


    // Private Routing 
    const private_routing = [
        {
            path: '/',
            component: <Home />
        },
        {
            path: '/addproduct',
            component: <Addproduct />
        },
        {
            path: '/showproduct',
            component: <Showproduct />
        },
        {
            path: '/details/:id',
            component: <Details />
        },
        {
            path: '/editproduct/:id',
            component: <Editproduct />
        },
        {
            path: '/dashboard',
            component: <Dashboard />
        },
    ]

    // Public Routing 
    const public_routing = [
        {
            path: '/register',
            component: <Register />
        },
        {
            path: '/login',
            component: <Login />
        },
    ]

    // This step is required for to stop page refreshing problem in logout button
    useEffect(() => {
        dispatch(check_token())
    }, [])


    return (
        <>
            <ToastContainer />


            {/*Cover with QueryClientProvider*/}
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        {/*Private Routing Area*/}
                        {private_routing?.map((routing) => {
                            return (
                                <>
                                    <Route path={routing?.path} element={<PrivateRoute>{routing?.component}</PrivateRoute>} />
                                </>
                            )
                        })}

                        {/*Public Routing Area*/}
                        {public_routing?.map((routing) => {
                            return (
                                <>
                                    <Route path={routing?.path} element={routing?.component} />
                                </>
                            )
                        })}
                    </Routes>
                </Router>
            </QueryClientProvider>
        </>
    )
}

export default App