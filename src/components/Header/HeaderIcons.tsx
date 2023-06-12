// import React, { useState } from 'react'
// import IconButton from '@mui/material/IconButton'
// import HomeIcon from '@material-ui/icons/Home'
// import FlagIcon from '@material-ui/icons/Flag'
// import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
// import StorefrontIcon from '@material-ui/icons/Storefront'
// import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
// // import { Link } from 'react-router-dom';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   useLocation
// } from 'react-router-dom'
// const commonButtonStyles = {
//   margin: { xs: '0rem 0.3rem', sm: '0rem 0.3rem', xl: '0.5rem 1rem' },
//   padding: { xs: '0.5rem 0.5rem', sm: '0.5rem 0.5rem', xl: '1rem 1rem' },
//   '&:hover': {
//     color: '#2e81f4'
//   }
// }

// const HeaderIcons: React.FC = (): JSX.Element => {
//   const location = useLocation()
//   const [activeIcon, setActiveIcon] = useState('')

//   const handleIconClick = (iconName: string) => {
//     setActiveIcon(iconName)
//   }

//   return (
//     <React.Fragment>
//       <IconButton
//         size='large'
//         aria-label='home'
//         color={activeIcon === 'home' ? 'primary' : 'inherit'}
//         component={Link}
//         to='/'
//         sx={{
//           ...(location.pathname === '/' && commonButtonStyles),
//           marginRight: { xs: '0.3rem', sm: '0.3rem', xl: '1rem' },
//           position: 'relative',
//           '&::after': {
//             content: '""',
//             position: 'absolute',
//             left: 0,
//             bottom: '-2px',
//             width: '100%',
//             height: '3px',
//             backgroundColor: activeIcon === 'home' ? 'blue' : 'transparent'
//           },
//           '&:hover': {
//             boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)'
//           }
//         }}
//         onClick={() => handleIconClick('home')}
//       >
//         <HomeIcon />
//       </IconButton>
//       <IconButton
//         size='large'
//         aria-label='flag'
//         color={activeIcon === 'flag' ? 'primary' : 'inherit'}
//         sx={{
//           ...(location.pathname === '/flag' && commonButtonStyles),
//           marginRight: { xs: '0.3rem', sm: '0.3rem', xl: '1rem' },
//           position: 'relative',
//           '&::after': {
//             content: '""',
//             position: 'absolute',
//             left: 0,
//             bottom: '-2px',
//             width: '100%',
//             height: '3px',
//             backgroundColor: activeIcon === 'flag' ? 'blue' : 'transparent'
//           },
//           '&:hover': {
//             boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)'
//           }
//         }}
//         component={Link}
//         to='/flag'
//         onClick={() => handleIconClick('flag')}
//       >
//         <FlagIcon />
//       </IconButton>
//       <IconButton
//         size='large'
//         aria-label='subscription'
//         color={activeIcon === 'subscription' ? 'primary' : 'inherit'}
//         component={Link}
//         to='/subscription'
//         sx={{
//           ...(location.pathname === '/subscriptions' && commonButtonStyles),
//           marginRight: { xs: '0.3rem', sm: '0.3rem', xl: '1rem' },
//           position: 'relative',
//           '&::after': {
//             content: '""',
//             position: 'absolute',
//             left: 0,
//             bottom: '-2px',
//             width: '100%',
//             height: '3px',
//             backgroundColor:
//               activeIcon === 'subscription' ? 'blue' : 'transparent'
//           },
//           '&:hover': {
//             boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)'
//           }
//         }}
//         onClick={() => handleIconClick('subscription')}
//       >
//         <SubscriptionsIcon />
//       </IconButton>
//       <IconButton
//         size='large'
//         aria-label='marketplace'
//         color={activeIcon === 'marketplace' ? 'primary' : 'inherit'}
//         component={Link}
//         to='/marketplace'
//         sx={{
//           ...(location.pathname === '/marketplace' && commonButtonStyles),
//           marginRight: { xs: '0.3rem', sm: '0.3rem', xl: '1rem' },
//           position: 'relative',
//           '&::after': {
//             content: '""',
//             position: 'absolute',
//             left: 0,
//             bottom: '-2px',
//             width: '100%',
//             height: '3px',
//             backgroundColor:
//               activeIcon === 'marketplace' ? 'blue' : 'transparent'
//           },
//           '&:hover': {
//             boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)'
//           }
//         }}
//         onClick={() => handleIconClick('marketplace')}
//       >
//         <StorefrontIcon />
//       </IconButton>
//       <IconButton
//         size='large'
//         aria-label='userfriend'
//         color={activeIcon === 'userfriend' ? 'primary' : 'inherit'}
//         component={Link}
//         to='/userfriend'
//         sx={{
//           ...(location.pathname === '/userpage' && commonButtonStyles),
//           marginRight: { xs: '0.3rem', sm: '0.3rem', xl: '1rem' },
//           position: 'relative',
//           '&::after': {
//             content: '""',
//             position: 'absolute',
//             left: 0,
//             bottom: '-2px',
//             width: '100%',
//             height: '3px',
//             backgroundColor:
//               activeIcon === 'userfriend' ? 'blue' : 'transparent'
//           },
//           '&:hover': {
//             boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)'
//           }
//         }}
//         onClick={() => handleIconClick('userfriend')}
//       >
//         <SupervisedUserCircleIcon />
//       </IconButton>
//     </React.Fragment>
//   )
// }

// export default HeaderIcons

import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom'

import HomeIcon from '@mui/icons-material/Home'
import FlagIcon from '@mui/icons-material/Flag'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import StorefrontIcon from '@mui/icons-material/Storefront'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'

const commonButtonStyles = {
  color: 'gray',
  margin: { xs: '0rem 0.3rem', sm: '0rem 0.3rem', xl: '0.5rem 1rem' },
  padding: { xs: '0.5rem 0.5rem', sm: '0.5rem 0.5rem', xl: '1rem 1rem' },
  '&:hover': {
    color: '#2e81f4'
  }
}

const activeButtonStyles = {
  borderBottom: '2px solid #2e81f4',
  color: '#2e81f4'
}

const HeaderIcons: React.FC = (): JSX.Element => {
  const location = useLocation()

  return (
    <React.Fragment>
      <Button
        sx={{
          ...commonButtonStyles,
          ...(location.pathname === '/' ? activeButtonStyles : {})
        }}
        component={Link}
        to='/'
      >
        <HomeIcon sx={{ fontSize: '1.8rem' }} />
      </Button>

      <Button
        sx={{
          ...commonButtonStyles,
          ...(location.pathname === '/flag' ? activeButtonStyles : {})
        }}
        component={Link}
        to='/flag'
      >
        <FlagIcon sx={{ fontSize: '1.8rem' }} />
      </Button>

      <Button
        sx={{
          ...commonButtonStyles,
          ...(location.pathname === '/subscription' ? activeButtonStyles : {})
        }}
        component={Link}
        to='/subscription'
      >
        <SubscriptionsIcon sx={{ fontSize: '1.8rem' }} />
      </Button>

      <Button
        sx={{
          ...commonButtonStyles,
          ...(location.pathname === '/marketplace' ? activeButtonStyles : {})
        }}
        component={Link}
        to='/marketplace'
      >
        <StorefrontIcon sx={{fontSize: '1.8rem' }} />
      </Button>

      <Button
        sx={{
          ...commonButtonStyles,
          ...(location.pathname === '/userfriend' ? activeButtonStyles : {})
        }}
        component={Link}
        to='/userfriend'
      >
        <GroupsRoundedIcon sx={{ fontSize: '1.8rem' }} />
      </Button>
    </React.Fragment>
  )
}

export default HeaderIcons
