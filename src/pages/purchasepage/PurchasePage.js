import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../firebase/FirebaseConfig';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolicies } from '../../store/slices/PolicySlice';
import { CircularProgress } from "@mui/material";
import { toast } from 'react-toastify';

const PurchasePage = () => {
    const user = auth.currentUser;
    const { policyId } = useParams();
    const [userProfile, setUserProfile] = useState({
        policyBoughtArray: [],
    });
    const [dataLoading, setDataLoading] = useState(true);
    const dispatch = useDispatch(); // Initialize dispatch
    const navigate = useNavigate();

    // Use the dispatch to fetch policies
    useEffect(() => {
        dispatch(fetchPolicies());
    }, [dispatch]);
    const policies = useSelector((state) => state.policies.policies);
    const selectedPolicyArray = policies.filter((policy) => {
        return policy.id == policyId
    });
    const selectedPolicy = selectedPolicyArray[0];

    const [paymentData, setPaymentData] = useState({
        bankName: '',
        cardNumber: '',
        cardHolderName: '',
        expiryDate: '',
        cvv: ''
    });

    useEffect(() => {
        if (user) {
            // Fetch user profile data and update state
            fetchDataAsObject(user);
        }
    }, [user]);

    const [currUser, loading] = useAuthState(auth);

    const fetchDataAsObject = async (user) => {
        const uid = user.uid;
        const userDocRef = doc(db, 'users', uid);

        try {
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setUserProfile(data);
                setDataLoading(false);
            } else {
                console.log('User data does not exist!');
            }
        } catch (error) {
            console.error('Error getting document:', error);
        }
    };


    const handlePolicyPaymentSubmit = async (e) => {
        e.preventDefault();

        if (user) {
            const uid = user.uid;
            const userDocRef = doc(db, 'users', uid);

            // Fetch the user's existing data from Firestore
            try {
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    // To make sure it's an array
                    if (!Array.isArray(userData.policyBoughtArray)) {
                        userData.policyBoughtArray = [userData.policyBoughtArray];
                    }

                    // Convert policy IDs to numbers
                    userData.policyBoughtArray = userData.policyBoughtArray.map(id => Number(id));

                    // Update the array with the new policy ID
                    if (userData.policyBoughtArray.indexOf(policyId) === -1) {
                        userData.policyBoughtArray.push(policyId);
                    }
                    else {
                        toast.error('Policy already purchased', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                        return;
                    }


                    // Update the Firestore document with the new data
                    await updateDoc(userDocRef, userData);

                    toast.success('Policy bought successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    console.log('policy bought successfully.');
                    navigate('/profile');
                } else {
                    console.log('User data does not exist!');
                }
            } catch (error) {
                console.error('Error getting/updating document:', error);
            }
        } else {
            console.error('No user is currently logged in');
        }
    };


    if (loading || dataLoading) {
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
        <div className="container border my-5">
            <div className="row">
                <div className="col">
                    <h2>Purchase Policy :</h2>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{selectedPolicy?.name}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{selectedPolicy?.coverName}</h6>
                            <p className='card-text m-0'>Category: {selectedPolicy?.category}</p>
                            <p className='card-text m-0'>Type: {selectedPolicy?.type}</p>
                            <p className="card-text m-0 ">Cover : {selectedPolicy?.cover}L</p>
                            <p className="card-text m-0">Price : ₹{selectedPolicy?.price}</p>
                        </div>
                        <div className="card-footer">
                            {
                                selectedPolicy?.benefits.map((benefit, id) => {
                                    return (<small key={id} className="d-block text-body-secondary">{benefit}</small>)
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-8">
                    <h2>Payment Details :</h2>
                    <form onSubmit={handlePolicyPaymentSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Bank Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={paymentData.bankName}
                                onChange={(e) => setPaymentData({ ...paymentData, bankName: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Card Number</label>
                            <input
                                type="text"
                                className="form-control"
                                value={paymentData.cardNumber}
                                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Card Holder Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={paymentData.cardHolderName}
                                onChange={(e) => setPaymentData({ ...paymentData, cardHolderName: e.target.value })}
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label">Expiry Date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={paymentData.expiryDate}
                                    onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">CVV</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={paymentData.cvv}
                                    onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary my-3">Submit Payment</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PurchasePage;