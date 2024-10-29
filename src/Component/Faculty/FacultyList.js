import React, { useEffect, useState } from 'react';
import { app } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import '../Style/Student__Style.css'
import { getStorage, ref as StorageRef, deleteObject } from 'firebase/storage';
import { getFirestore, doc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';


const FacultyList = () => {
    const [facultyData, setFacultyData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const db = getFirestore(app);
        const facultyRef = collection(db, 'faculty');
        const unsub = onSnapshot(facultyRef, (snapShort) => {
            const data = snapShort.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setFacultyData(data);
        })
        return unsub
    }, []);

    const deleteData = async (key) => {
        const db = getFirestore(app);
        const storage = getStorage(app);
        const facultyRef = doc(db, 'faculty', key);
        const myRef = StorageRef(storage, 'FacultyImages/' + key);
        try {
            await deleteObject(myRef)

            console.log('File deleted successfully from Storage');

            deleteDoc(facultyRef);
            console.log('Document deleted successfully from Firestore');
        } catch (err) {
            console.error('Error deleting document from Firestore:', err);
            alert('Error deleting document: ' + err.message);
            if (err.code === 'storage/object-not-found') {
                console.log('File does not exist in Storage, deleting document from Firestore...');
                try {
                    await deleteDoc(facultyRef);
                    console.log('Document deleted successfully from Firestore');
                } catch (err) {
                    console.error('Error deleting document from Firestore:', err);
                    alert('Error deleting document: ' + err.message);
                }
            } else {
                console.log(err);
                alert('Error deleting file: ' + err.message);
            }

        }
    }


return (
    <>
        {facultyData && (
            <div>
                {facultyData.map((value) => {
                    return (
                        <div key={value.id} className='student__studentList'>

                            <img className='student__studentList__img' alt='' src={value.ImageUrl} />

                            <p className='student__studentList__para' >Faculty ID :- {value.id}, Name :- {value.facultyName}, Phone :- {value.PhoneNumber} ; </p>

                            <button className='student__studentList__btn' onClick={() => { deleteData(value.id) }}>Delete</button>

                            <button className='student__studentList__btn' onClick={() => { navigate('/dashboard/faculty/updateFaculty', { state: [value.id, value] }) }}>Update</button>
                        </div>
                    );
                })}
            </div>
        )}
    </>
)
}

export default FacultyList