import { FC } from "react";

interface IRoll {
  // type?: string,
  // thickness?: number,
  // width?: number,
  // length?: number,
  // weight?: number,
  rollNumber: string
  millRollNumber: string
  // brucknerId?: number,
  isScrap: boolean
  // sigma2?: number
}

interface RollProps extends IRoll {
}

const Roll: FC<IRoll> = ({ rollNumber, millRollNumber }: RollProps) => {
  return (
    <></>
  )
}

export default Roll