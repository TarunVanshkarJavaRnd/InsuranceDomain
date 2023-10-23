import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/FirebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolicies } from '../../store/slices/PolicySlice';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

const Cards = ({ query, selectedCategory }) => {
    const dispatch = useDispatch();
    const policies = useSelector((state) => state.policies.policies);
    const navigate = useNavigate();
    const [filteredPolicies, setFilteredPolicies] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    // Now fetching policies from redux store
    useEffect(() => {
        dispatch(fetchPolicies());
    }, [dispatch]);

    useEffect(() => {
        let policiesToShow = policies;

        if (selectedCategory) {
            policiesToShow = policiesToShow.filter(policy => policy.category === selectedCategory);
        }
        if (query) {
            const normalizedSearchQuery = query.toLowerCase();
            policiesToShow = policiesToShow.filter(policy =>
                policy.coverName.toLowerCase().includes(normalizedSearchQuery) ||
                policy.type.toLowerCase().includes(normalizedSearchQuery) ||
                policy.category.toLowerCase().includes(normalizedSearchQuery) ||
                policy.price.toString().includes(normalizedSearchQuery)
            );
        }


        setFilteredPolicies(policiesToShow);
        setDataLoading(false);
    }, [policies, query, selectedCategory]);

    // function to handle policies when clicked on purchase button
    const purchasePolicy = (policyId) => {

        // Check if the user is logged in
        const currUser = auth.currentUser;
        if (!currUser) {
            // Redirect to the home page if the user is not logged in
            toast.warning('Please login to purchase policy', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            // navigate('/');
        }
        else {
            // redirect to purchase page
            navigate(`/purchasePage/${policyId}`);
        }
    }

    if (dataLoading) {
        return (
            <div className="loader">
                <CircularProgress
                    size={300}
                    sx={{
                        color: 'black'
                    }}
                />
            </div>
        )
    };
    return (
        <div>
            <main>
                <div className='container my-4'>
                    <div className='row row-cols-1 row-cols-md-2 g-4 my-2'>
                        {
                            filteredPolicies.map((policy) => {
                                return (
                                    <div className="card m-3 mx-auto bg-light text-dark " style={{ width: '25rem' }} key={policy.id}>
                                        <div className="card-body">
                                            <h5 className="card-title">{policy.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-body-secondary">{policy.coverName}</h6>
                                            <p className='card-text m-0'>Category: {policy.category}</p>
                                            <p className='card-text m-0'>Type: {policy.type}</p>
                                            <p className="card-text m-0 ">Cover : {policy.cover}L</p>
                                            <p className="card-text m-0">Price : ₹{policy.price}</p>
                                        </div>
                                        <div className="card-footer p-2">
                                            {
                                                policy.benefits.map((benefit, id) => {
                                                    return (<small key={id} className="d-block text-dark bg-body-secondary p-1 ">{benefit}</small>)
                                                })
                                            }
                                        </div>
                                        <div className='container d-flex justify-content-around my-2'>
                                            <button className='btn btn-primary px-5' onClick={() => purchasePolicy(policy.id)}>Buy</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Cards;
