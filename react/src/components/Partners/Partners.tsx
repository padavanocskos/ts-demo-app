import { FC, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FactoryIcon from "@mui/icons-material/Factory";
import WorkIcon from "@mui/icons-material/Work";
import { Link, Outlet } from "react-router-dom";

const PartnersHeader: FC = (props) => {
  const [value, setValue] = useState(props.selectedTab);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <Tab
          icon={<FactoryIcon />}
          iconPosition="start"
          label="Companies"
          value={0}
        />
        <Tab
          icon={<WorkIcon />}
          iconPosition="start"
          label="Distributors"
          value={1}
        />
        <Tab
          component={Link}
          to="/partners/contacts"
          icon={<PersonIcon />}
          iconPosition="start"
          label="Contacts"
          value={2}
        />
      </Tabs>
      <Outlet />
    </>
  );
};

export default PartnersHeader;
