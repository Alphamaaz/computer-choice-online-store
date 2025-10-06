import React from 'react'
import HeroSection from '../Components/Homepage/HeroSection'
import QuickFilters from '../Components/Homepage/QuickFilters'
import BestSeller from '../Components/BestSeller'
import Footer from '../Components/Footer'
import ProductListingPage from '../Components/ProductListingPage'
import WhatsAppChatPopup from '../Components/WhatsAppChatPopup'

function Home() {
  return (
    <div>
      
      <HeroSection/>
      <QuickFilters/>
      <WhatsAppChatPopup/>
      <ProductListingPage/>
      <BestSeller/>
      <Footer/>
    </div>
  )
}

export default Home
