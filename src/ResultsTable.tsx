import {  Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { CalcValuesType, ParamsType } from './types';


export function ResultsTable ({calcValues, params}: {calcValues: CalcValuesType, params: ParamsType,}) {



    return (
    <Table size="small" className='table-calc'>
    <TableHead>
        <TableRow>
        <TableCell>

        </TableCell>
        <TableCell>
            Vol à vitesse de finesse maximale
        </TableCell>
        <TableCell>
            Vol à vitesse MacCready
        </TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        <TableRow>
        <TableCell>
            Finesse sol
        </TableCell>
        <TableCell>
            { calcValues.fin_max.toFixed(0)}
        </TableCell>
        <TableCell>
            { calcValues.fin_mc.toFixed(0) }
        </TableCell>
        </TableRow>

        <TableRow>
        <TableCell>
            Vitesse sol
        </TableCell>
        <TableCell>
            { calcValues.vfmax.toFixed(0)} Km/h
        </TableCell>
        <TableCell>
        {calcValues.vmc.toFixed(0)} Km/h
        </TableCell>
        </TableRow>

        <TableRow>
        <TableCell>
            Speed to fly
        </TableCell>
        <TableCell>
            {(calcValues.vfmax + params.Vw).toFixed(0)} Km/h
        </TableCell>
        <TableCell>
            {(calcValues.vmc + params.Vw).toFixed(0)} Km/h
        </TableCell>
        </TableRow>

        <TableRow>
        <TableCell>
        Taux de chute propre du planeur
        </TableCell>
        <TableCell>
        {(calcValues.f_vz(calcValues.vfmax)-params.Vzw).toFixed(2)} m/s
        </TableCell>
        <TableCell>
        {(calcValues.f_vz(calcValues.vmc)-params.Vzw).toFixed(2)} m/s
        </TableCell>
        </TableRow>

        <TableRow>
        <TableCell>
        Taux de chute total
        </TableCell>
        <TableCell>
        {(calcValues.f_vz(calcValues.vfmax)).toFixed(2)} m/s
        </TableCell>
        <TableCell>
            {(calcValues.f_vz(calcValues.vmc)).toFixed(2)} m/s
        </TableCell>
        </TableRow>

        <TableRow>
        <TableCell>
        Taux de chute équivalent au vent de face
        </TableCell>
        <TableCell>
        {( params.Vw * calcValues.f_vz(calcValues.vfmax) / (calcValues.vfmax) ).toFixed(2)} m/s
        </TableCell>
        <TableCell>
            
        </TableCell>
        </TableRow>
    </TableBody>
    </Table>
)}
