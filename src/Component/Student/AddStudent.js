import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref as storageRef, uploadBytes,getDownloadURL } from 'firebase/storage';

const AddStudent = () => {

    const [admNo,setAdmNo] = useState('')
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();


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

        const db = getDatabase(app);
        const storage = getStorage(app);

        const myRef = storageRef(storage, 'images/' + admNo);
        await uploadBytes(myRef, selectedFile)
            .then(result => {
                getDownloadURL(myRef)
                    .then(imageUrl => {
                        set(ref(db, 'student/' + admNo), {
                            StudentName: name,
                            PhoneNumber: phone,
                            ImageUrl: imageUrl
                        })
                            .then(res => {
                                navigate('/dashboard/student/studentList');
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
                <input onChange={(e) => { setAdmNo(e.target.value) }} type='text' placeholder='Student AdmNo.' />

                <br />

                <input onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Student Name' />
                
                <br />

                <input onChange={(e) => { setPhone(e.target.value) }} type='number' placeholder='Student Phone' />

                <br />

                <input onChange={handleFileChange} type='file' />
                <br />
                
                <button type='submit'>Submit</button>

            </form>
        </>
    )
}

export default AddStudent