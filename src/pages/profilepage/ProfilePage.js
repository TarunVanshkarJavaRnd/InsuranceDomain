import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/FirebaseConfig";
import { CircularProgress } from "@mui/material";
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolicies } from '../../store/slices/PolicySlice';
import { toast } from 'react-toastify';

const ProfilePage = () => {

  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const [user, loading] = useAuthState(auth);
  const [dataLoading, setDataLoading] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [policyFeedback, setPolicyFeedback] = useState('');   // state to show policy for feedback

  // Getting all the policies from redux store
  const dispatch = useDispatch();
  const policies = useSelector((state) => state.policies.policies);

  // Now fetching policies from firebase
  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);


  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const userDocRef = doc(db, 'users', uid);

      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
            setDataLoading(false)
          } else {
            console.log('User data does not exist!');
          }
        })
        .catch((error) => {
          console.error('Error getting document:', error);
        });
    }
  }, [loading]);

  let boughtPolicies = [];
  if (userProfile && Array.isArray(userProfile.policyBoughtArray)) {
    let j = 0;
    for (let i = 0; i < policies.length; i++) {
      for (let j = 0; j < userProfile.policyBoughtArray.length; j++) {
        if (Number(userProfile.policyBoughtArray[j]) === Number(policies[i].id)) {
          boughtPolicies.push(policies[i]);
          break; // Exit the inner loop once a match is found
        }
      }
    }
  }

  let claimedPolicies = [];
  if (userProfile && Array.isArray(userProfile.policyClaimedArray)) {
    let j = 0;
    for (let i = 0; i < policies.length; i++) {
      if (Number(userProfile.policyClaimedArray[j]) == policies[i].id) {
        claimedPolicies.push(policies[i])
        j++;
      }
    }
  }

  const handleFeedback = (policy) => {
    setShowFeedbackModal(true)
    setPolicyFeedback(policy);
  }

  const handleFeedbackSubmit = () => {
    // Check if the user is logged in
    const currUser = auth.currentUser;
    if (!currUser) {
      toast.warning('Please login to submit policy feedback', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else {
      toast.success('Feedback submitted successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setShowFeedbackModal(false);
    }

  }

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

  //function to claim a policy
  const claimPolicy = (policyId) => {
    navigate(`/claimPage/${policyId}`);
  }
  return (
    <>
      <div className='container border my-5 p-5 fw-bold fs-5 bg-light '>
        <h2 className='fw-bolder text-primary '>User Details</h2>
        <p>Name : {userProfile.name}</p>
        <p>Email : {userProfile.email}</p>
        <p>Contact Number : {userProfile.contactNumber}</p>
        <p>Gender : {userProfile.gender}</p>
        <p>Profession : {userProfile.profession}</p>
        <p>Policies Bought : {userProfile.policyBoughtArray?.length}</p>
        <p>Policies Claimed : {userProfile.policiesClaimed}</p>
        <button className='btn btn-primary' onClick={() => navigate('/profileUpdate')}>Update Profile</button>
      </div>

      <div className='container'>
        <h2>Policies Bought</h2>
        <div className='container my-4'>
          <div className='row row-cols-1 row-cols-md-2 g-4 my-2'>
            {
              boughtPolicies.map((policy) => {
                return (
                  <div className="card m-3 mx-auto bg-light text-dark" style={{ width: '25rem' }} key={policy.id}>
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
                    <div className='container d-flex justify-content-center align-items-center  '>
                      <button className='btn btn-primary px-5 my-3' onClick={() => claimPolicy(policy.id)}>Claim</button>
                      <button className='btn btn-secondary mx-2 px-5' onClick={() => handleFeedback(policy)}>Feedback</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* Modal */}
        <div className={`modal ${showFeedbackModal ? 'show d-block' : ''}`} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Policy Feedback</h5>
                <button type="button" className="close btn" data-dismiss="modal" aria-label="Close" onClick={() => setShowFeedbackModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h5 className="card-title">{policyFeedback.name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{policyFeedback.coverName}</h6>
                <p className='card-text m-0'>Category: {policyFeedback.category}</p>
                <p className='card-text m-0'>Type: {policyFeedback.type}</p>
                <p className="card-text m-0 ">Cover : {policyFeedback.cover}L</p>
                <p className="card-text m-0">Price : ₹{policyFeedback.price}</p>
                <label>Example textarea</label>
                <textarea className="form-control my-2" rows="3" ></textarea>
                <button className='btn btn-primary' onClick={() => handleFeedbackSubmit()}>Submit</button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setShowFeedbackModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className='container'>
        <h2>Policies Claimed</h2>
        <div className='container my-4'>
          <div className='row row-cols-1 row-cols-md-2 g-4 my-2'>
            {
              claimedPolicies.map((policy) => {
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
                    <div className="card-footer">
                      {
                        policy.benefits.map((benefit, id) => {
                          return (<small key={id} className="d-block text-body-secondary">{benefit}</small>)
                        })
                      }
                    </div>
                    <div className='container d-flex justify-content-center '>
                      <button type="button" className='btn btn-success px-5 my-3' data-toggle="modal" data-target="#exampleModal" onClick={() => setshowModal(true)} >Claimed</button>
                      {/* Modal */}
                      <div className={`modal ${showModal ? 'show d-block' : ''}`} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Policy Claim Status</h5>
                              <button type="button" className="close btn" data-dismiss="modal" aria-label="Close" onClick={() => setshowModal(false)}>
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <div className="progress">
                                <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "50%" }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <p className='text text-success my-2'>Your policy is verified by the service provider</p>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setshowModal(false)}>Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;