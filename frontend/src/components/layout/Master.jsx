import React from 'react';
import { useState,useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import Navbar from '../Pages/Student/Navbar/Navbar'
const Master = () => {

  return (
    <>
<Navbar/>
      <Outlet />
    </>
  );
}

export default Master;
