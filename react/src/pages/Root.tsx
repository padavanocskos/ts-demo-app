import { FC } from "react"
import { Outlet, Link } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'

const RootLayout: FC = () => {
  return(
    <>
      <MainNavigation />
      <Box component="main" sx={{ p: 3}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
             size="large"
             edge="start"
             color="inherit"
             aria-label="open drawer"
             sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
             variant="h6"
             noWrap
             component="div"
             sx={{display: { xs: 'none', sm: 'block' } }}>
               TIHU
             </Typography>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    </>
  )
}

export default RootLayout