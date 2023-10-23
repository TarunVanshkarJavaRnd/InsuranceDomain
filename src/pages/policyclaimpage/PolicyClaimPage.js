import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPolicies } from '../../store/slices/PolicySlice';
import { auth, db } from "../../firebase/FirebaseConfig";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const PolicyClaimPage = () => {
    const { policyId } = useParams();
    const [claimedPolicy, setClaimedPolicy] = useState(null);
    const [image, setImage] = useState('');
    const [query, setQuery] = useState('');

    const dispatch = useDispatch();
    const policies = useSelector((state) => state.policies.policies);
    const navigate = useNavigate();

    // Now fetching policies from firebase
    useEffect(() => {
        dispatch(fetchPolicies());
    }, [dispatch]);


    useEffect(() => {
        // Once policies are fetched, find the claimed policy
        if (policies && policies.length > 0) {
            policies.forEach(policy => {
                if (policy.id == policyId) {
                    setClaimedPolicy(policy)
                }
            });
        }
    }, [policies, policyId]);

    const handleClaimSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from submitting
    
        const uid = auth.currentUser.uid;
        const userDocRef = doc(db, 'users', uid);
    
        try {
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
    
                // Convert policyId to a number
                const policyIdNumber = Number(policyId);
                console.log('Policy ID to remove:', policyIdNumber);
    
                // Ensure policyBoughtArray is an array of numbers
                userData.policyBoughtArray = userData.policyBoughtArray.map(id => Number(id));
    
                // Remove policy ID from policyBoughtArray
                userData.policyBoughtArray = userData.policyBoughtArray.filter(id => id !== policyIdNumber);
                console.log('Updated policyBoughtArray:', userData.policyBoughtArray);
    
                // Add policy ID to policyClaimedArray
                if (!userData.policyClaimedArray.includes(policyIdNumber)) {
                    userData.policyClaimedArray.push(policyIdNumber);
                    userData.policiesClaimed = userData.policyClaimedArray.length;
    
                    await updateDoc(userDocRef, userData);
    
                    toast.success('Policy claimed successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    navigate('/profile');
                } else {
                    console.log('Policy already claimed');
                    toast.error('Policy already claimed', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } else {
                console.log('User data does not exist!');
            }
        } catch (error) {
            console.error('Error getting/updating document:', error);
        }
    };
    
    
    return (
        <div className='container my-5 '>
            <h2>Claim Policy</h2>
            {claimedPolicy && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{claimedPolicy.name}</h5>
                        <p className="card-text">Type: {claimedPolicy.type}</p>
                        <p className="card-text">Category: {claimedPolicy.category}</p>
                        <p className="card-text">Price: ₹{claimedPolicy.price}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleClaimSubmit}>
                <div className="mb-3">
                    <label className="form-label">Upload Image</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Query</label>
                    <textarea
                        className="form-control"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e) => handleClaimSubmit(e)}>Submit Claim</button>
            </form>

        </div>
    );
}

export default PolicyClaimPage;
