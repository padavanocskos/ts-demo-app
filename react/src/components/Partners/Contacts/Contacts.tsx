import { FC } from "react";
import CrudModule from "../../shared/grid/CrudModule";

const Contacts: FC = () => {
  return (
    <>
      {/* <Partners selectedTab={2} /> */}
      <CrudModule moduleName="contacts" />;
    </>
  );
};

export default Contacts;
