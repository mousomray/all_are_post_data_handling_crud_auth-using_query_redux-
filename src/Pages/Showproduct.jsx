import React from 'react'
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete'; // Delete Icon
import EditIcon from '@mui/icons-material/Edit'; // Edit Icon
import DetailsIcon from '@mui/icons-material/Details';
import { Link } from 'react-router-dom'; // Import Link
import { useSelector, useDispatch } from 'react-redux'; // Import Dispatch
import { showproduct, deleteproduct } from "./pageslice"; // Import Show and Delete Function 
import { useQuery } from '@tanstack/react-query' // Import for useQuery 
import Wrapper from '../Common/Wrapper'; // Import Wrapper
import Swal from 'sweetalert2'; // Import Sweet Alert 
import Pagination from '@mui/material/Pagination'; // Import Pagination

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Showproduct = () => {

    const dispatch = useDispatch()
    const { showdata, totalpage } = useSelector((state) => state.Showproduct);
    const [currentPage, setCurrentPage] = useState(1); // State For Pagination

    console.log("My yyy", showdata);

    // Handle Make For Pagination 
    const handleOnChange = (e, pageno) => {
        setCurrentPage(pageno);
        dispatch(showproduct({ page: pageno, perpage: 10 }));
    };

    // Get Product For Use Query 
    const getProductdata = async () => {
        const response = await dispatch(showproduct()) // Call Showproduct function
        return response?.payload
    }

    // Use Query Area
    const { isLoading, isError, data: productdata, error, refetch } = useQuery({
        queryKey: ['product'],
        queryFn: getProductdata // This line of code work as same as useEffect()
    })

    // Make Handle For Delete (Start)
    const handleDelete = async (id) => {
        // For Sweet Alert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            await dispatch(deleteproduct(id));
            refetch()
            // After Deletation Message
            Swal.fire(
                'Deleted!',
                'Your product has been deleted',
                'success'
            );
        }
    }
    // Make Handle For Delete (End)


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

                <TableContainer component={Paper} style={{ marginTop: '100px' }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Image</StyledTableCell>
                                <StyledTableCell align="center">Title</StyledTableCell>
                                <StyledTableCell align="center">Description</StyledTableCell>
                                <StyledTableCell align="center">Details</StyledTableCell>
                                <StyledTableCell align="center">Update</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(showdata) && showdata?.length !== 0 ? (
                                Array.isArray(showdata) && showdata?.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            <img src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${row?.image}`} style={{ height: '30px' }} />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.title}</StyledTableCell>
                                        <StyledTableCell align="center">{row.description}</StyledTableCell>
                                        <StyledTableCell align="center"><Link to={`/details/${row._id}`}><button className='btn-primary'><DetailsIcon /></button></Link></StyledTableCell>
                                        <StyledTableCell align="center"><Link to={`/editproduct/${row._id}`}><button className='btn-success'><EditIcon /></button></Link></StyledTableCell>
                                        <StyledTableCell align="center"><button onClick={() => handleDelete(row._id)} className='btn-danger'><DeleteIcon /></button></StyledTableCell>
                                    </StyledTableRow>
                                ))
                            )
                                :
                                (
                                    <>
                                        <p style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', color: 'red' }}>No product Found</p>
                                    </>
                                )}


                        </TableBody>
                    </Table>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                        <Grid justifyContent="center">
                            {showdata.length !== 0 ? (
                                <Pagination
                                    count={totalpage}
                                    page={currentPage}
                                    onChange={handleOnChange}
                                    variant="outlined"
                                    shape="rounded"
                                />

                            ) : (
                                <>
                                </>
                            )}
                        </Grid>
                    </Box>
                </TableContainer>
            </Wrapper>
        </>
    )
}

export default Showproduct