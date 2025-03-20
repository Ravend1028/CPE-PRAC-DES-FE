import React from 'react';
import { ClipLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '5px 5px',
};


const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color = 'rgb(239, 68, 68)'
      loading = { loading }
      cssOverride = { override }
      size={ 20 }
    />
  )
}

export default Spinner