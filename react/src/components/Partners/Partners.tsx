import { FC } from "react";
import { Tab, Tabs } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person'
import FactoryIcon from '@mui/icons-material/Factory'
import WorkIcon from '@mui/icons-material/Work'

const Partners: FC = () => {
  return (
    <Tabs
      value={1}
      onChange={() => {}}
      aria-label="nav tabs example"
      role="navigation"
    >
      <Tab icon={<FactoryIcon />} iconPosition="start" label="Companies" />
      <Tab icon={<WorkIcon />} iconPosition="start" label="Distributors" />
      <Tab icon={<PersonIcon />} iconPosition="start" label="Contacts" />
    </Tabs>
  )
}

export default Partners