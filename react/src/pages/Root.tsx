import { FC } from "react"
import { Outlet, Link } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"
import Header from "../components/ui/header/Header"
import { Box, Container, Fab } from "@mui/material"
import ScrollTop from "../components/ui/header/ScrollTop"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const RootLayout: FC = (props) => {
  return(
    <>
      <MainNavigation />
      <Header />
      <Container>
        <Box sx={{ my: 2 }}>
          <Outlet />
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}

export default RootLayout