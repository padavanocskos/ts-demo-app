import { Tab, Tabs } from "@mui/material";
import { FC } from "react";
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const Storages: FC = () => {
  return (
    <Tabs
      value={1}
      onChange={() => {}}
      aria-label="nav tabs example"
      role="navigation"
    >
      <Tab icon={<PhoneIcon />} aria-label="phone" />
      <Tab icon={<FavoriteIcon />} aria-label="favorite" />
      <Tab icon={<PersonPinIcon />} aria-label="person" />
    </Tabs>
  )
}

export default Storages