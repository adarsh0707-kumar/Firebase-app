import React, { useState } from 'react';
import { app } from '../../Firebase';
import { getFirestore,doc,setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import UniqueIdGenerator from '../ID Generator/UniqueIdGenerator';


const AddFaculty = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const facultyId = UniqueIdGenerator.generateFacultyId();


    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file);
    };




    const submitHandler = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        const db = getFirestore(app);
        const storage = getStorage(app);

        const myRef = storageRef(storage, 'FacultyImages/' + facultyId);
        await uploadBytes(myRef, selectedFile)
            .then(result => {
                getDownloadURL(myRef)
                    .then(imageUrl => {
                        setDoc(doc(db, 'faculty', facultyId), {
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

    return (
        <>
            <form onSubmit={submitHandler}>
                
                <input onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Faculty Name' />

                <br />

                <input onChange={(e) => { setPhone(e.target.value) }} type='number' placeholder='Faculty Phone' />

                <br />

                <input onChange={handleFileChange} type='file' />
                <br />

                <button type='submit'>Submit</button>

            </form>
        </>
    )
}

export default AddFaculty