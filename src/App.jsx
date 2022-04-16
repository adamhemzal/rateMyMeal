import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import CreateMeal from './pages/CreateMeal';
import Main from './pages/Main';
import SingleMeal from './pages/SingleMeal';
import EditMeal from './pages/EditMeal';
import AccessDenied from './pages/AccessDenied';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="create" element={<CreateMeal />} />
          <Route path="meal/:user/:id" element={<SingleMeal />} />
          <Route path="meal/:user/:id/edit" element={<EditMeal />} />
          <Route path="denied" element={<AccessDenied />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
