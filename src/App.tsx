import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ApplicantDashboard from './pages/ApplicantDashboard';
import CommitteeDashboard from './pages/CommitteeDashboard';
import DeanDashboard from './pages/DeanDashboard';
import PrincipalDashboard from './pages/PrincipalDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { DataProvider, useData } from './data/DataContext';
import Layout from './components/Layout';

const Protected: React.FC<{ roles?: string[], element: React.ReactNode }> = ({ roles, element }) => {
  const { currentUser } = useData();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(currentUser.role)) return <Navigate to="/login" replace />;
  return <>{element}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/applicant" element={<Protected roles={['Applicant']} element={<Layout><ApplicantDashboard /></Layout>} />} />
    <Route path="/committee" element={<Protected roles={['Committee']} element={<Layout><CommitteeDashboard /></Layout>} />} />
    <Route path="/dean" element={<Protected roles={['Dean']} element={<Layout><DeanDashboard /></Layout>} />} />
    <Route path="/principal" element={<Protected roles={['Principal']} element={<Layout><PrincipalDashboard /></Layout>} />} />
    <Route path="/admin" element={<Protected roles={['Admin']} element={<Layout><AdminDashboard /></Layout>} />} />
    <Route path="*" element={<div className="p-6">Not Found</div>} />
  </Routes>
);

const App: React.FC = () => {
  return (
    <DataProvider>
      <AppRoutes />
    </DataProvider>
  );
};
export default App;
