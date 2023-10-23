import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolicies } from '../../store/slices/PolicySlice';
import { useNavigate } from 'react-router-dom';

const CompariosnPage = () => {
    const dispatch = useDispatch();
    const policies = useSelector((state) => state.policies.policies);
    const navigate = useNavigate();
    const [filteredPolicies, setFilteredPolicies] = useState([]);

    // Now fetching policies from firebase
    useEffect(() => {
        dispatch(fetchPolicies());
    }, [dispatch]);

    useEffect(() => {
        let policiesToShow = [...policies];
        setFilteredPolicies(policiesToShow);
    }, [policies]);

    // function to sort the policies by price
    const sortByPrice = () => {
        let policiesToShow = [...policies];
        policiesToShow = policiesToShow.sort((a, b) => a.price - b.price);
        setFilteredPolicies(policiesToShow);
    }

    // function to sort the policies by coverage
    const sortByCoverage = () => {
        let policiesToShow = [...policies];
        policiesToShow = policiesToShow.sort((a, b) => a.cover - b.cover);
        setFilteredPolicies(policiesToShow);
    }

    // function to handle policies for purchase
    const purchasePolicy = (policyId) => {
        console.log(policyId)
        navigate(`/purchasePage/${policyId}`);
    }

    return (
        <div className='container'>
            <div className='container d-flex justify-content-center align-items-center p-4 '>
                <button className='btn btn-primary mx-5 p-2' onClick={() => sortByPrice()}>Compare on Price</button>
                <button className='btn btn-primary p-2 ' onClick={() => sortByCoverage()}>Compare on Coverage</button>
            </div>
            <div className='container my-4'>
                <div className='row row-cols-1 row-cols-md-2 g-4 my-2'>
                    {
                        filteredPolicies.map((policy) => {
                            return (
                                <div className="card m-3 mx-auto " style={{ width: '18rem' }} key={policy.id}>
                                    <div className="card-body">
                                        <h5 className="card-title">{policy.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">{policy.coverName}</h6>
                                        <p className='card-text m-0'>Category: {policy.category}</p>
                                        <p className='card-text m-0'>Type: {policy.type}</p>
                                        <p className="card-text m-0 ">Cover : {policy.cover}L</p>
                                        <p className="card-text m-0">Price : ₹{policy.price}</p>
                                    </div>
                                    <div className="card-footer">
                                        {
                                            policy.benefits.map((benefit, id) => {
                                                return (<small key={id} className="d-block text-body-secondary">{benefit}</small>)
                                            })
                                        }
                                    </div>
                                    <div className='container d-flex justify-content-around my-2'>
                                        <button className='btn btn-primary' onClick={() => purchasePolicy(policy.id)}>Buy</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default CompariosnPage;
