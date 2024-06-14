import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../Common/Wrapper'
import { useDispatch } from 'react-redux'
import { profile } from './pageslice'
import { profile_pic } from '../Common/Navbar' // import profile pic function 
import { useQuery } from '@tanstack/react-query'

const Dashboard = () => {

    const dispatch = useDispatch();
    const proimg = localStorage.getItem("proimg") // Get Profile Picture from local storage

    // Get Product For Use Query 
    const getProfiledata = async () => {
        const response = await dispatch(profile()) // Call Profile function
        return response?.payload
    }

    // Use Query Area
    const { isLoading, isError, data: profiledata, error, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfiledata // This line of code work as same as useEffect()
    })

    // For Loading 
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1>Loading...</h1>
            </div>
        )

    }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            <Wrapper>

                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="card text-center">
                        <div className="card-header">
                            Dashboard
                        </div>
                        <div className="card-body">
                            <img src={profile_pic(proimg)} alt="" style={{ height: '180px', borderRadius: '30%' }} />
                            <h5 className="card-title"><b>First Name : </b>{profiledata?.first_name}</h5>
                            <h5 className="card-title"><b>Last Name : </b>{profiledata?.last_name}</h5>
                            <h5 className="card-title"><b>Email : </b>{profiledata?.email}</h5>
                            <Link to="/" className="btn btn-primary">Back to Home</Link>
                        </div>
                    </div>
                </div>



            </Wrapper>
        </>
    )
}

export default Dashboard