import React from 'react';
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import '@aws-amplify/ui-react/styles.css'; // this adds styles for the amplify UI

function Layout() {
  return (
    <>
        <Header />
          <Outlet />
        <Footer />
    </>
  )
}

export default Layout