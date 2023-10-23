import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/FirebaseConfig';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CircularProgress } from "@mui/material";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const [updatedName, setUpdatedName] = useState('');
    const [updatedContactNo, setUpdatedContactNo] = useState('');
    const [updatedProfession, setUpdatedProfession] = useState('');
    const [updatedGender, setUpdatedGender] = useState('');
    const [email, setEmail] = useState('');
    const [userProfile, setUserProfile] = useState({});
    const [user, loading] = useAuthState(auth);
    const [dataLoading, setDataLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            // Fetch user profile data and update state
            fetchDataAsObject(user);
        }
    }, [user]);

    const fetchDataAsObject = async (user) => {
        const uid = user.uid;
        const userDocRef = doc(db, 'users', uid);

        try {
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setUserProfile(data);
                setUpdatedName(data.name || '');
                setUpdatedContactNo(data.contactNumber || '');
                setUpdatedProfession(data.profession || '');
                setUpdatedGender(data.gender || '');
                setEmail(data.email);
                setDataLoading(false);
            } else {
                console.log('User data does not exist!');
            }
        } catch (error) {
            console.error('Error getting document:', error);
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

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (user) {
            const uid = user.uid;
            const userDocRef = doc(db, 'users', uid);

            // Update the Firestore document with the new data
            const updateData = {
                ...userProfile,
                name: updatedName,
                contactNumber: updatedContactNo,
                profession: updatedProfession,
                gender: updatedGender,
                policiesTaken: userProfile.policyBoughtArray.length,
                policiesClaimed: userProfile.policyClaimedArray.length
            };

            try {
                await updateDoc(userDocRef, updateData);
                toast.success('Profile updated successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log('User profile updated successfully.');
                navigate('/profile');
            } catch (error) {
                console.error('Error updating user profile:', error);
            }
        }
    };
    return (
        <div className='container my-5 border p-5 '>
            <form>
                <div className="row mb-3">
                    <label htmlFor="inputName3" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputName3" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail3" disabled value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputContact3" className="col-sm-2 col-form-label">Contact Number</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputContact3" onChange={(e) => setUpdatedContactNo(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputProfession3" className="col-sm-2 col-form-label">Profession</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputProfession3" onChange={(e) => setUpdatedProfession(e.target.value)} />
                    </div>
                </div>
                <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="male" onClick={() => setUpdatedGender('male')} />
                            <label className="form-check-label" htmlFor="gridRadios1">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="Female" onClick={() => setUpdatedGender('male')} />
                            <label className="form-check-label" htmlFor="gridRadios2">
                                Female
                            </label>
                        </div>
                    </div>
                </fieldset>
                <button type="submit" className="btn btn-primary" onClick={handleUpdateProfile}>Update</button>
            </form>
        </div>
    );
}

export default UpdateProfile;
