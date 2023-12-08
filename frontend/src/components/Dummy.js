import React from 'react';

const Dummy = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', 
    padding: '50px',
    backgroundColor: '#2196f3', 
    color: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '2em', margin: '0' }}>Accredian</h1>
      <p style={{ fontSize: '1.2em', marginTop: '10px' }}>
        Welcome to Accredian!
      </p>
    </div>
  );
};

export default Dummy;
