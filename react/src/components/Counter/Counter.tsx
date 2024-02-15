import React, { useEffect } from 'react'
import type { FC } from 'react'
import { isPrime } from '../../utils/util'
import axios from 'axios'
import { Box, InputAdornment, OutlinedInput, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, styled, tableCellClasses, Modal, Typography } from '@mui/material'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AddCircle, RemoveCircle } from '@mui/icons-material'
import moment from 'moment'
import dayjs from 'dayjs'
import NumberField from '../inputs/NumberField'

interface CounterProps {
  initialValue: number
}

interface IRoll {
  // type?: string,
  // thickness?: number,
  // width?: number,
  // length?: number,
  // weight?: number,
  rollNumber: string,
  millRollNumber: string,
  // brucknerId?: number,
  // sigma2?: number
}

const Counter: FC<CounterProps> = ({ initialValue }: CounterProps) => {
  const [counter, setCounter] = React.useState<number>(initialValue)
  const [numix, setNumix] = React.useState<number>(0)
  const [goodRollCounter, setGoodRollCounter] = React.useState<number>(0)
  const [failRollCounter, setFailRollCounter] = React.useState<number>(0)
  const [rolls, setRolls] = React.useState<IRoll[]>([])

  const handleIncrement = (): void => {
    setCounter((prevCounter) => prevCounter + 1)
  }

  const handleDecrement = (): void => {
    setCounter((prevCounter) => prevCounter - 1)
  }

  useEffect(() => {
    axios.get('http://localhost:8000/user').then(res => {
      console.log(res)
    }).catch(e => {
      console.log(e.message)
      })
  //   fetch('http://localhost:8000/user')
  //     .then(async (res) => await res.json())
  //     .catch((error) => { console.log(error) })
  //   fetch('http://localhost:8000/login', {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ name: 'kakszi', pass: 'almafa'})
  //   }).then(async (res) => await res.json())
  //     .catch((error) => { console.log(error) })
  }, [])

  const newLocal = "counter-decrease"

  const weekday = (): number => {
    const numberOfDay = moment().day()

    return numberOfDay === 0 ? 7 : numberOfDay;
  }

  const padWithLeadingZeros = (num: number, totalLength: number): String => {
    return String(num).padStart(totalLength, '0')
  }

  const generateRollNumber = (): string => {
    return `23${moment().format('YYWW') + weekday() + padWithLeadingZeros(numix, 2)}`
  }

  const generateMillRollNumber = (shift: string = 'd', rollCounter: number): string => {
    return `3${moment().format('YYMMDD')}10${rollCounter}00`
  }

  const handleNewRole = () => {
    setNumix(numix + 1)
    let millRollNumber: string = '';
    let rollNumber: string = ''

    if (true) {
      setGoodRollCounter(goodRollCounter + 1)
      millRollNumber = generateMillRollNumber('d', goodRollCounter)
    }

    rollNumber = generateRollNumber()
    setRolls([...rolls, {rollNumber: rollNumber, millRollNumber:millRollNumber }])
    console.log(rolls);
  }

  interface IRollListItem{
    reelId: number
    millRollNumber: number
    weight: number
    length: number
    start: string
    end: string
    rollId: number
    isProductionLosses?: boolean
    brucknerId?: number | null
  }
  
  const createData = ({reelId, millRollNumber, weight, length, start, end, rollId, isProductionLosses = false, brucknerId = null}: IRollListItem) => {
    return { reelId, brucknerId, millRollNumber, weight, length, start, end, rollId, isProductionLosses };
  }

  const rows = [
    createData({ reelId: 23, millRollNumber: 324020701100, weight: 223, length: 1542, start: "2024-02-07 06:12", end: "2024-02-07 06:30", rollId: 232406301, isProductionLosses: true }),
    createData({ reelId: 17, millRollNumber: 324020710100, weight: 6074, length: 42001, start: "2024-02-07 06:30", end: "2024-02-07 10:23", rollId: 232406302, brucknerId: 33223 }),
    createData({ reelId: 24, millRollNumber: 324020710200, weight: 6074, length: 41999, start: "2024-02-07 10:23", end: "2024-02-07 14:16", rollId: 232406303, brucknerId: 33224 }),
    createData({ reelId: 56, millRollNumber: 324020720100, weight: 6073, length: 41997, start: "2024-02-07 14:16", end: "2024-02-07 18:09", rollId: 232406304, brucknerId: 33225 }),
    createData({ reelId: 35, millRollNumber: 324020720200, weight:4111, length: 28432, start: "2024-02-07 18:09", end: "2024-02-07 20:46", rollId: 232406305, brucknerId: 33226 }),
    // createData(26, 33227, 324020702100, 123, 854, "2024-02-07 20:46", "2024-02-07 20:50", 232406306, true),
    // createData(56, 33228, 324020702200, 332, 2300, "2024-02-07 20:50", "2024-02-07 21:02", 232406307, true),
    // createData(23, 33229, 324020720300, 6652, 46000, "2024-02-07 21:02", "2024-02-08 01:17", 232406401),
    // createData(48, 33230, 324020810100, 6074, 42000, "2024-02-08 01:17", "2024-02-08 05:10", 232406402),
    // createData(42, 33231, 324020720100, 6074, 42000, "2024-02-07 06:12", "2024-02-07 06:30", 232406301),
    // createData(56, 33232, 324020720200, 273, 1892, "2024-02-07 06:12", "2024-02-07 06:30", 232406301),
    // createData(42, 33233, 324020702100, 237, 1645, "2024-02-07 06:12", "2024-02-07 06:30", 232406301),
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* <Box data-testid="Counter">
        <p>Initial value is <span id="prime-span">{ isPrime(initialValue) ? 'a' : 'not' }</span> prime!</p>
        <OutlinedInput
          id="outlined-basic"
          value={counter}
          startAdornment={
            <InputAdornment position="start">
              <AddCircle data-testid="counter-increase" onClick={handleIncrement} fontSize="small" />
            </InputAdornment>}
          endAdornment={
            <InputAdornment position="end">
              <RemoveCircle data-testid={newLocal} onClick={handleDecrement} fontSize="small" />
            </InputAdornment>
          }
          sx={{ width: '8em' }}
          inputProps={{ style: { textAlign: 'center' } }}
        />
      </Box> */}
      <Paper>
        <h2>Roll number generator</h2>
        <Button variant="outlined" onClick={handleNewRole}>Ready</Button>
        <TableContainer component={Paper}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Reel Nr.</StyledTableCell>
                  <StyledTableCell align="right">Brückner Nr.</StyledTableCell>
                  <StyledTableCell align="right">Millroll Nr.</StyledTableCell>
                  <StyledTableCell align="right">Weight&nbsp;(kg)</StyledTableCell>
                  <StyledTableCell align="right">Length&nbsp;(m)</StyledTableCell>
                  <StyledTableCell align="right">Start</StyledTableCell>
                  <StyledTableCell align="right">End</StyledTableCell>
                  <StyledTableCell align="right">Roll Nr.</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                //   <TableRow
                //     // key={}
                //     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                //   >
                //     <TableCell component="th" scope="row">
                //       <NumberField initialValue='1236547896' variant="outlined" label="Almafa" value={row.reelId} />
                //     </TableCell>
                //     <TableCell align="right">{row.millRollNumber}</TableCell>
                //     <TableCell align="right">
                //       <TimePicker timeSteps={{ hours: 1, minutes: 1, seconds: 1 }} ampm={false} defaultValue={dayjs()} label="Start" value={dayjs(row.start)} />
                //     </TableCell>
                //     <TableCell align="right">
                //       <TimePicker timeSteps={{ hours: 1, minutes: 1, seconds: 1 }} ampm={false} defaultValue={dayjs()} label="End" value={dayjs(row.end)}/>
                //     </TableCell>
                //     <TableCell align="right">{row.rollId}</TableCell>
                //   </TableRow>
                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component='th' scope='row'>{row.reelId}</TableCell>
                      <TableCell align='right'>{ row.isProductionLosses ? 'selejt' : row.brucknerId}</TableCell>
                      <TableCell align='right'>{row.millRollNumber}</TableCell>
                      <TableCell align='right'>{row.weight}</TableCell>
                      <TableCell align='right'>{row.length}</TableCell>
                      <TableCell align='right'>{row.start}</TableCell>
                      <TableCell align='right'>{row.end}</TableCell>
                      <TableCell align='right'>{row.rollId}</TableCell>
                    </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </LocalizationProvider>
      </TableContainer>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      </Paper>
    </>
  )
}

export default Counter
