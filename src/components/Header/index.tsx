// import React from 'react'
// import { Avatar, IconButton, useMediaQuery } from '@material-ui/core'
// import {
//   Search as SearchIcon,
//   HomeRounded,
//   SubscriptionsRounded,
//   StorefrontRounded,
//   SupervisedUserCircleRounded,
//   AddRounded,
//   NotificationsRounded,
//   ExitToAppRounded
// } from '@material-ui/icons'
// import fbImgLogo from '../../assets/fbNameLogo.png'
// import { FlagRounded } from '@material-ui/icons'
// import { PersonOutlineRounded } from '@material-ui/icons'

// import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles(theme => ({
//   header: {
//     // backgroundColor: theme.palette.componentBackground,
//     padding: '0.2rem 0.5rem 0',
//     display: 'flex',
//     flexDirection: 'row',
//     flex: 'auto',
//     justifyContent: 'space-between',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     zIndex: 100,
//     [theme.breakpoints.down('sm')]: {
//       flexDirection: 'column',
//       alignItems: 'center'
//     },

//     boxShadow: 'horizontal-offset vertical-offset blur spread color'
//     // boxShadow: `0px 5px 8px -9px ${theme.palette.boxShadow}`,
//   },
//   headerLeft: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 0.3,
//     [theme.breakpoints.down('sm')]: {
//       flexDirection: 'column',
//       alignItems: 'center',
//       marginBottom: '1rem'
//     }
//   },
//   logo: {
//     height: 40
//   },
//   searchInput: {
//     margin: '0 0.4rem',
//     display: 'flex',
//     // backgroundColor: theme.palette.commentBackground,
//     padding: '0.2rem',
//     borderRadius: '1rem',
//     border: '1px solid black', // Add border style here
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden'
//   },

//   searchIcon: {
//     // color: theme.palette.commentText,
//     marginLeft: '0.5rem'
//   },
//   inputBar: {
//     backgroundColor: 'transparent',
//     border: 'none',
//     outline: 'none',
//     padding: '0.4rem',
//     // color: theme.palette.commentText,

//   },
//   headerCenter: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     flex: 0.55,
//     [theme.breakpoints.down('sm')]: {
//       marginTop: '1rem',
//       marginBottom: '1rem'
//     }
//   },
//   option: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: '0.6rem 3rem',
//     borderRadius: '0.4rem',
//     transition: 'linear 200ms'
//   },
//   activeOption: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: '0.6rem 3rem',
//     cursor: 'pointer'
//     // borderBottom: `4px solid ${theme.palette.primary.main}`,
//   },
//   icon: {
//     // color: theme.palette.icon,
//   },
//   headerRight: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 0.3,

//     justifyContent: 'flex-end',
//     [theme.breakpoints.down('sm')]: {
//       justifyContent: 'center',
//       marginTop: '1rem'
//     }
//   },
//   info: {
//     display: 'flex',
//     alignItems: 'center',
//     marginRight: '0.5rem'
//   },

//   iconContainer: {
//     border: '1px solid #000',
//     borderRadius: '50%',
//     padding: '4px',
//     marginRight: '0.5rem'
//   },

//   '@media (max-width: 600px)': {
//     header: {
//       flexDirection: 'column',
//       alignItems: 'center'
//     },
//     headerRight: {
//       justifyContent: 'center',
//       marginTop: '1rem'
//     }
//   }

//   // Define other styles here
//   // ...
// }))
// const Header = () => {
//   const classes = useStyles()

//   return (
//     <div className={classes.header}>
//       <div className={classes.headerLeft}>
//         <img src={fbImgLogo} alt='fb logo' className={classes.logo} />
//         <div className={classes.searchInput}>
//           <SearchIcon className={classes.searchIcon} />
//           <input
//             type='text'
//             placeholder='Search Users'
//             className={classes.inputBar}
//           />
//         </div>
//       </div>

//       <div className={classes.headerCenter}>
//         <div className={classes.activeOption}>
//           <HomeRounded fontSize='large' className={classes.option} />
//         </div>
//         <div className={classes.option}>
//           <FlagRounded fontSize='large' className={classes.icon} />
//         </div>
//         <div className={classes.option}>
//           <SubscriptionsRounded fontSize='large' className={classes.option} />
//         </div>
//         <div className={classes.option}>
//           <StorefrontRounded fontSize='large' className={classes.option} />
//         </div>
//         <div className={classes.option}>
//           <SupervisedUserCircleRounded
//             fontSize='large'
//             className={classes.option}
//           />
//         </div>
//       </div>

//       <div className={classes.headerRight}>
//         <div className={classes.info}>
//           <div className={classes.iconContainer}>
//             <PersonOutlineRounded fontSize='large' className={classes.icon} />
//           </div>
//           <p>JAINAM SHAH</p>
//         </div>
//         <IconButton>
//           <AddRounded />
//         </IconButton>
//         <IconButton>
//           <NotificationsRounded />
//         </IconButton>
//         <IconButton>
//           <ExitToAppRounded />
//         </IconButton>
//       </div>
//     </div>
//   )
// }

// export default Header
// import { Box, IconButton, useMediaQuery } from '@material-ui/core'
// import { styled } from '@material-ui/core/styles'

// import {
//   Home as HomeIcon,
//   Add as AddIcon,
//   Notifications as NotificationsIcon,
//   ExitToApp as ExitToAppIcon,
//   Flag as FlagIcon,
//   Subscriptions as SubscriptionsIcon,
//   Storefront as StorefrontIcon,
//   SupervisedUserCircle as SupervisedUserCircleIcon,
//   Search as SearchIcon,
//   PersonOutline as PersonOutlineIcon
// } from '@material-ui/icons'

// import fbImgLogo from '../../assets/fbNameLogo.png'

// const HeaderContainer = styled(Box)(({ theme }) => ({
//   padding: '0.2rem 0.5rem 0',
//   display: 'flex',
//   flexDirection: 'row',
//   flex: 'auto',
//   justifyContent: 'space-between',
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100%',
//   zIndex: 100,
//   boxShadow: 'horizontal-offset vertical-offset blur spread color',
//   [theme.breakpoints.down('sm')]: {
//     flexDirection: 'column',
//     alignItems: 'center'
//   }
// }))

// const Header = () => {
//   const isSmallScreen = useMediaQuery('(max-width:600px)')

//   return (
//     <HeaderContainer
//       style={{
//         padding: '0.2rem 0.5rem 0',
//         display: 'flex',
//         flexDirection: isSmallScreen ? 'column' : 'row',
//         flex: 'auto',
//         justifyContent: 'space-between',
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         zIndex: 100,
//         boxShadow: 'horizontal-offset vertical-offset blur spread color'
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: isSmallScreen ? 'column' : 'row',
//           alignItems: 'center',
//           flex: 0.3,
//           marginBottom: isSmallScreen ? '1rem' : 0
//         }}
//       >
//         <img src={fbImgLogo} alt='fb logo' style={{ height: 40 }} />
//         <Box
//           sx={{
//             margin: '0 0.4rem',
//             display: 'flex',
//             padding: '0.2rem',
//             borderRadius: '1rem',
//             border: '1px solid black',
//             justifyContent: 'center',
//             alignItems: 'center',
//             overflow: 'hidden'
//           }}
//         >
//           <SearchIcon />
//           <input
//             type='text'
//             placeholder='Search Users'
//             style={{
//               backgroundColor: 'transparent',
//               border: 'none',
//               outline: 'none',
//               padding: '0.4rem'
//             }}
//           />
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'space-evenly',
//           alignItems: 'center',
//           flex: 0.55,
//           marginTop: isSmallScreen ? '1rem' : 0,
//           marginBottom: isSmallScreen ? '1rem' : 0
//         }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <HomeIcon fontSize='large' />
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <FlagIcon fontSize='large' />
//         </Box>

//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <SubscriptionsIcon />
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <StorefrontIcon fontSize='large' />
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <SupervisedUserCircleIcon fontSize='large' />
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           flex: 0.3,
//           justifyContent: 'flex-end',
//           marginTop: isSmallScreen ? '1rem' : 0
//         }}
//       >
//         <Box
//           sx={{ display: 'flex', alignItems: 'center', marginRight: '0.5rem' }}
//         >
//           <Box
//             sx={{
//               border: '1px solid #000',
//               borderRadius: '50%',
//               padding: '4px',
//               marginRight: '0.5rem'
//             }}
//           >
//             <PersonOutlineIcon fontSize='large' />
//           </Box>
//           <p>JAINAM SHAH</p>
//         </Box>
//         <IconButton>
//           <AddIcon />
//         </IconButton>
//         <IconButton>
//           <NotificationsIcon />
//         </IconButton>
//         <IconButton>
//           <ExitToAppIcon />
//         </IconButton>
//       </Box>
//     </HeaderContainer>
//   )
// }

// export default Header
import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'

import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import fbImgLogo from '../../assets/fbNameLogo.png'
// import MoreIcon from '@mui/icons-material/MoreVert'
import {
  Home as HomeIcon,
  Add as AddIcon,
  Notifications as NotificationsIcon,
  ExitToApp as ExitToAppIcon,
  Flag as FlagIcon,
  Subscriptions as SubscriptionsIcon,
  Storefront as StorefrontIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon,
  Search as SearchIcon,
  PersonOutline as PersonOutlineIcon
} from '@material-ui/icons'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

export default function PrimarySearchAppBar () {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='error'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size='large'
          aria-label='show 17 new notifications'
          color='inherit'
        >
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' sx={{ backgroundColor: 'white',color:'black' }}>
        <Toolbar sx={{ marginTop: '4px' }}>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Box sx={{ backgroundColor: 'white', borderRadius: '20px' }}>
              <img src={fbImgLogo} height={40} alt='fb logo' />
            </Box>
          </Typography>
          <Search sx={{ marginRight: '100px', borderRadius: '20px' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <IconButton
            size='large'
            aria-label='home'
            color='inherit'
            sx={{ marginRight: '120px' }}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            size='large'
            aria-label='add'
            color='inherit'
            sx={{ marginRight: '120px' }}
          >
            <FlagIcon />
          </IconButton>{' '}
          <IconButton
            size='large'
            aria-label='add'
            color='inherit'
            sx={{ marginRight: '120px' }}
          >
            <SubscriptionsIcon />
          </IconButton>{' '}
          <IconButton
            size='large'
            aria-label='add'
            color='inherit'
            sx={{ marginRight: '120px' }}
          >
            <StorefrontIcon />
          </IconButton>
          <IconButton
            size='large'
            aria-label='add'
            color='inherit'
            sx={{ marginRight: '120px' }}
          >
            <SupervisedUserCircleIcon />
          </IconButton>{' '}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size='large'
              aria-label='show 17 new notifications'
              color='inherit'
            > <Box sx={{fontSize:'16px'}}> Jainam Shah</Box>
              <PersonOutlineIcon />
            </IconButton>
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='inherit'
            >
              <Badge color='error'>
                <AddIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              aria-label='show 17 new notifications'
              color='inherit'
            >
              <Badge badgeContent={17} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <ExitToAppIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <ExitToAppIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  )
}
