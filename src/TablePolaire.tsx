
import { Input, Table, TableCell, TableHead, TableRow, 
  TableBody} from '@mui/material';

import { PolaireType } from './types';

export function TablePolaire ({curPolaire, onChange}: {curPolaire: PolaireType, 
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined })  {

  return (
        <>
        <Table size='small'>
        <TableHead>
        <TableRow>
          <TableCell>Vitesse</TableCell>
          <TableCell>Tx chute</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Input type="number" name="v1" onChange={onChange} value={curPolaire.v1} ></Input> Km/h
          </TableCell>
          <TableCell>
            <Input type="number" name="w1" onChange={onChange} value={curPolaire.w1}></Input> m/s
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Input type="number" name="v2" onChange={onChange} value={curPolaire.v2}></Input> Km/h
          </TableCell>
          <TableCell>
            <Input type="number" name="w2" onChange={onChange} value={curPolaire.w2}></Input> m/s
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Input type="number" name="v3" onChange={onChange} value={curPolaire.v3}></Input> Km/h
          </TableCell>
          <TableCell>
            <Input type="number" name="w3" onChange={onChange} value={curPolaire.w3}></Input> m/s
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </>
  )
}