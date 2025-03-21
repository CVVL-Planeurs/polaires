
import { Input, Table, TableCell, TableHead, TableRow, 
  TableBody} from '@mui/material';

import { PolaireType } from './types';

export function TablePolaire ({curPolaire, handleInputChange}: {curPolaire: PolaireType, handleInputChange: any})  {

  return (
        <>
        <Table>
        <TableHead>
        <TableRow>
          <TableCell>Vitesse</TableCell>
          <TableCell>Tx chute</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Input type="number" name="v1" onChange={handleInputChange} value={curPolaire.v1}></Input> Km/h
          </TableCell>
          <TableCell>
            <Input type="number" name="w1" onChange={handleInputChange} value={curPolaire.w1}></Input> m/s
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Input type="number" name="v2" onChange={handleInputChange} value={curPolaire.v2}></Input> Km/h
          </TableCell>
          <TableCell>
            <Input type="number" name="w2" onChange={handleInputChange} value={curPolaire.w2}></Input> m/s
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Input type="number" name="v3" onChange={handleInputChange} value={curPolaire.v3}></Input> Km/h
          </TableCell>
          <TableCell>
            <Input type="number" name="w3" onChange={handleInputChange} value={curPolaire.w3}></Input> m/s
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </>
  )
}