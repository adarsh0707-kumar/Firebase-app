import React, { useState } from 'react';
import { getDatabase, ref, update } from 'firebase/database';
import { app } from '../../Firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const UpdateStudent = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [admNo, setAdmNo] = useState(location.state[0])
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
            const db = getDatabase(app);
            const storage = getStorage(app);

            const myRef = storageRef(storage, 'images/' + admNo);
            await uploadBytes(myRef, selectedFile)
                .then(result => {
                    getDownloadURL(myRef)
                        .then(imageUrl => {
                            const studentRef = ref(db, 'student/' + admNo);
                            update(studentRef, {
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
        else {
            const db = getDatabase(app);

            const studentRef = ref(db, 'student/' + admNo);
            update(studentRef, {
                StudentName: name,
                PhoneNumber: phone
            })
                .then(res => {
                    navigate('/dashboard/student/studentList');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

return (
    <>
        <form onSubmit={submitHandler}>
            <input disabled value={admNo} onChange={(e) => { setAdmNo(e.target.value) }} type='text' placeholder='Student AdmNo.' />
            <br />
            <input value={name} onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Student Name' />
            <br />
            <input value={phone} onChange={(e) => { setPhone(e.target.value) }} type='number' placeholder='Student Phone' />
            <br />
            <input onChange={handleFileChange} type='file' />
            <button type='submit'>Update</button>
        </form>
    </>
)
}

export default UpdateStudent;