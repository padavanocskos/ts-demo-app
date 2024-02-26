import React, { FC, useEffect, useState } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import logo from '../../../assets/logo_small.svg'
import { Link, useLocation } from "react-router-dom";

const Header: FC = () => {
  const routes = [
    '/',
    '/materials',
    '/storages',
    '/production',
    '/partners',
  ]

  const location = useLocation()
  const [navigationTabPosition, setNavigationTabPosition] = useState(routes.indexOf(location.pathname))
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setNavigationTabPosition(newValue)
  }

  useEffect(() => {
    if (location.pathname === '/') {
      setNavigationTabPosition(0)
    }
  }, [location])

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box component={Link} to="/" sx={{ display: 'contents', color: '#ffffff' }} >
            <Box component="img" alt="hello-bello" src={logo} sx={{
              backgroundColor: '#ffffff',
              borderRadius: '22% / 30%'
            }}/>
            <Typography
              variant="h5"
              sx={{ display: { xs: 'none', sm: 'block', paddingLeft: '1rem' } }}
            >
              TIHU
            </Typography>
          </Box>
          <Tabs
            onChange={handleTabChange}
            value={navigationTabPosition || false}
            textColor='inherit'
            indicatorColor= 'primary'
            // TabIndicatorProps={{
            //   style: {
            //     backgroundColor: "#ffffff",
            //   }
            // }}
          >
            <Tab component={Link} label="Storages" to="/storages" value={routes.indexOf('/storages')} />
            <Tab component={Link} label="Materials" to="/materials" value={routes.indexOf('/materials')} />
            <Tab component={Link} label="Production" to="/production" value={routes.indexOf('/production')} />
            <Tab component={Link} label="Partners" to="/partners" value={routes.indexOf('/partners')} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
}

export default Header;