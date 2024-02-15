import { FC } from "react";
import { Link } from "react-router-dom";

const MainNavigation: FC = () => {
  return(
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/mill-rolls">Mill-Rolls</Link>
          </li>
        </ul> 
      </nav>
    </>
  )
}

export default MainNavigation