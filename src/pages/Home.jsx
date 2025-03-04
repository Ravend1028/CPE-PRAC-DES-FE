import React from 'react';
import Hero from '../components/Hero';
import HeroButtons from '../components/HeroButtons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    } 
  }, [navigate, userInfo]);

  return (
    <Hero> 
      <HeroButtons />
    </Hero>
  )
}

export default Home