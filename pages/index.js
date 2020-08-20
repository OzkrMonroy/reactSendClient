import React, { useContext, useEffect } from 'react'
import Layout from '../components/Layout';
import AuthContext from '../context/auth/authContext';

const Index = () => {
  const authContext = useContext(AuthContext);
  const { getAuthenticatedUser } = authContext

  useEffect(() => {
    getAuthenticatedUser()
  }, [])
  return (
    <Layout>
      
    </Layout>
  );
}
 
export default Index;
