import { FC } from "react";
import IMaturingStorage from "./IMaturingStorage";

const MaturingStorage: FC = () => {

  return <>
    <div className="maturing-storage">
      <div className="side-A">
        <ul className="positions">
          <li className="positions">
            <div className="storage-position">
                <div className="color">This is show postion is free or not</div>
                <div className="mill-roll-holder">This is hold the miror which is in the position</div>
            </div>
          </li>
        </ul>
      </div>
      <div className="side-B">

      </div>
    </div>
  </>
}