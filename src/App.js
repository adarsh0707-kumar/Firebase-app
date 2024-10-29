import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Dashboard from './Component/Dashboard/Dashboard';
import Student from './Component/Student/Student';
import AddStudent from './Component/Student/AddStudent';
import StudentList from './Component/Student/StudentList';
import Faculty from './Component/Faculty/Faculty';
import AddFaculty from './Component/Faculty/AddFaculty';
import FacultyList from './Component/Faculty/FacultyList';
import UpdateStudent from './Component/Student/UpdateStudent';
import UpdateFaculty from './Component/Faculty/UpdateFaculty';
import Login from './Component/Authentication/Login';
import SignUp from './Component/Authentication/SignUp';

function App() {

  const myRouter = createBrowserRouter([
    { path: '', Component: Dashboard },
    { path: '/login', Component: Login },
    { path: '/signup', Component: SignUp },
    {
      path: '/dashboard', Component: Dashboard, children: [
        {
          path: 'student', Component: Student, children: [
            { path: '', Component: StudentList },
            { path: 'addStudent', Component: AddStudent },
            { path: 'studentList', Component: StudentList },
            { path: 'updateStudent', Component: UpdateStudent }
          ]
        },
        {
          path: 'faculty', Component: Faculty, children: [
            { path: '', Component: FacultyList },
            { path: 'addFaculty', Component: AddFaculty },
            { path: 'facultyList', Component: FacultyList },
            { path: 'updateFaculty', Component: UpdateFaculty }
          ]
        }
      ]
    }

  ])

  return (
    < >
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;
