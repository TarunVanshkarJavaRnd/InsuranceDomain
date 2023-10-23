import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/homepage/HomePage';
import ProfilePage from './pages/profilepage/ProfilePage';
import UpdateProfile from './pages/updateprofile/UpdateProfile';
import Navbar from './components/navbar/Navbar';
import PurchasePage from './pages/purchasepage/PurchasePage';
import PolicyClaimPage from './pages/policyclaimpage/PolicyClaimPage';
import Cards from './components/cards/Cards';
import CompariosnPage from './pages/comparisonpage/CompariosnPage';
import Footer from './components/footer/Footer';
import PolicyPage from './pages/policypage/PolicyPage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/profileUpdate' element={<UpdateProfile />} />
          <Route path='/purchasePage/:policyId' element={<PurchasePage />} />
          <Route path='/claimPage/:policyId' element={<PolicyClaimPage />} />
          <Route path='/card' element={<Cards />}/>
          <Route path='/compariosn' element={<CompariosnPage />} />
          <Route path='/policy' element={<PolicyPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
