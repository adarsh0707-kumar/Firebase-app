import React, { useState } from 'react';
import { app } from '../../Firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

const UpdateFaculty = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const facultyId = location.state[0];

    
    const [name, setName] = useState(location.state[1].StudentName);
    const [phone, setPhone] = useState(location.state[1].PhoneNumber);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file);
    };


    const submitHandler = async (event) => {
        event.preventDefault();
        if (selectedFile) {
            const db = getFirestore(app);
            const storage = getStorage(app);

            const myRef = storageRef(storage, 'FacultyImages/' + facultyId);
            await uploadBytes(myRef, selectedFile)
                .then(result => {
                    getDownloadURL(myRef)
                        .then(imageUrl => {
                            const facultyRef = doc(db, 'faculty/' + facultyId);
                            updateDoc(facultyRef, {
                                facultyName: name,
                                PhoneNumber: phone,
                                ImageUrl: imageUrl
                            })
                                .then(res => {
                                    navigate('/dashboard/faculty/facultyList');
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            const db = getFirestore(app);

            const facultyRef = doc(db, 'faculty/' + facultyId);
            updateDoc(facultyRef, {
                facultyName: name,
                PhoneNumber: phone
            })
                .then(res => {
                    navigate('/dashboard/faculty/facultyList');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                
                <input value={name} onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Faculty Name' />
                <br />
                <input value={phone} onChange={(e) => { setPhone(e.target.value) }} type='number' placeholder='Faculty Phone' />
                <br />
                <input onChange={handleFileChange} type='file' />
                <button type='submit'>Update</button>
            </form>
        </>
    )
}

export default UpdateFaculty