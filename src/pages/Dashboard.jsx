import React from 'react';
import { useState, useEffect } from 'react'; // useState for modal fields when editing profile
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../slices/usersApiSlice';

const Dashboard = () => {
  // I should create a modal here to edit personal info but not readings
  // then i will use the apiSlice

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth); // React Redux Hook

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    // When this component mounts it will set modal default value
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        test: 'Test' // consider sending here new data
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile Updated');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };  

  return (
    <main>
      <div className="container mx-auto p-6">
        Test
      </div>
    </main>
  )
}

export default Dashboard