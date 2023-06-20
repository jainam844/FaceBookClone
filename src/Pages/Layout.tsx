import React from 'react'
import Section from '../components/Section/Section'
import Flag from '../components/Flag/flag'
import Subscription from '../components/Subscription/Subscription'
import MarketPlace from '../components/MarketPlace/MarketPlace'
import UserFriend from '../components/Group/Groups'
import Friend from '../components/Friend/Friends'
import { Routes, Route, Outlet } from 'react-router-dom'
import Profile from '../Pages/Profile'

const HomeLayout = () => {
  return (
    <React.Fragment>
      <Routes>
        <Outlet />
      </Routes>
    </React.Fragment>
  )
}

export default HomeLayout
