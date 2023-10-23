import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/FirebaseConfig";
import errorMapping from "../utils/errorMapping";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const Signup = ({ handleClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // To handle the application signup process
    const handleSubmit = () => {
        if (!username || !email || !password || !confirmPassword) {
            toast.warning('Please fill all details', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (password !== confirmPassword) {
            toast.warning('Password mismatched', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = auth.currentUser;
                console.log(user)
                if (user) {
                    const uid = user.uid;
                    // Use the UID as the document ID when creating a document in Firestore
                    const userDocRef = doc(db, 'users', uid);
                    // Add data to the user's document
                    setDoc(userDocRef, {
                        name: username,
                        email: email,
                        contactNumber: '',
                        profession: '',
                        gender: '',
                        policiesTaken: 0,
                        policiesClaimed: 0,
                        policyBoughtArray: [],
                        policyClaimedArray: [],
                        userId: uid, // Storing the UID within the document for reference.
                    });
                }

                toast.success('User added successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });


                handleClose();
                return updateProfile(userCredentials.user, { displayName: username });
            })
            .catch((error) => {
                toast.error(errorMapping[error.code] || error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
    }


    return (
        <Box className="signup-form" p={3} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField
                type="text"
                variant="outlined"
                label="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{ style: { color: 'black' } }}
            />

            <TextField
                type="email"
                variant="outlined"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{ style: { color: 'black' } }}
            />

            <TextField
                type="password"
                variant="outlined"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{ style: { color: 'black' } }}
            />

            <TextField
                type="password"
                variant="outlined"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{ style: { color: 'black' } }}
            />

            <Button
                variant="contained"
                size='large'
                style={{ background: 'white', color: 'black' }}
                onClick={handleSubmit}
            >
                Signup
            </Button>
        </Box>
    )
}

export default Signup;