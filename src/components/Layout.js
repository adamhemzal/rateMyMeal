import React from 'react';
import { Outlet } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
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