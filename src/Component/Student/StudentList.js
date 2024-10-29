import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { app } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import '../Style/Student__Style.css'
import { getStorage,ref as StorageRef,deleteObject } from 'firebase/storage';

const StudentList = () => {

  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const db = getDatabase(app);
    const studentRef = ref(db, 'student');
    onValue(studentRef, (snapShort) => {
      const data = snapShort.val();
      setStudentData(data);
    })
  }, []);

  const deleteData = (key) => {
    const db = getDatabase(app);
    const storage = getStorage(app);
    const studentRef = ref(db, 'student/' + key);
    const myRef = StorageRef(storage, 'images/' + key);
    deleteObject(myRef)
      .then(res => {
        remove(studentRef);
      })
      .catch(err=>{
        console.log(err);
    })
    
  }


  return (
    <>
      {studentData && (
        <div>
          {Object.entries(studentData).map(([key, value]) => {
            return (
              <div key={key} className='student__studentList'>
                <img className='student__studentList__img' alt='' src={value.ImageUrl} />
                <p className='student__studentList__para' >Admission No :- {key}, Name :- {value.StudentName}, Phone :- {value.PhoneNumber} ; </p>
                <button className='student__studentList__btn' onClick={() => { deleteData(key) }}>Delete</button>
                <button className='student__studentList__btn' onClick={() => { navigate('/dashboard/student/updateStudent',{state:[key,value]})}}>Update</button>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default StudentList