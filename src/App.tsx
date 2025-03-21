import { useEffect, useState } from 'react'
import './App.css'
import { polaires } from './polaires'
import Stack from '@mui/material/Stack';
import { Autocomplete, Grid2, TextField, Typography } from '@mui/material';
import { TablePolaire } from './TablePolaire';
import { lusolve } from 'mathjs';
import { PolaireType, CalcValuesType, ParamsType } from './types';
import { Chart } from './Chart';
import {NumericInput} from './NumericInput'; 

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function App() {

  const [curPolaire, setCurPolaire] = useState<PolaireType> (polaires[0])
  const [calcValues, setCalcValues] = useState<CalcValuesType> ()
  const [params, setParams] = useState <ParamsType>({Vzw: 0, Vw: 0})

  useEffect ( () => { updateCalcValues()}, [curPolaire, params])

  function handleChangePolaire(_: any, newPolaire:PolaireType | null) {
    if (! newPolaire) return
    setCurPolaire (newPolaire)
  }

  function updateCalcValues (){
    
    // coefficients de la polaire
    const coefs = lusolve ( 
      [ [ (curPolaire.v1-params.Vw)**2, curPolaire.v1-params.Vw, 1],
        [ (curPolaire.v2-params.Vw)**2, curPolaire.v2-params.Vw, 1],
        [ (curPolaire.v3-params.Vw)**2, curPolaire.v3-params.Vw, 1]]
        , [ curPolaire.w1, curPolaire.w2,curPolaire.w3 ]
    ) as number[][]

    const vfmax = ((coefs[2][0]+params.Vzw) / coefs[0][0]) ** .5
    const f_vz = (vi: number) => (vi**2*coefs[0][0] + (vi)*coefs[1][0] + coefs[2][0] + params.Vzw)

    setCalcValues ({
      coefs: {
        a: coefs[0][0],
        b: coefs[1][0],
        c: coefs[2][0]
      },
      Vfmax: vfmax,
      f_vz: f_vz, 
      fin_max: -1*(vfmax/3.6)/f_vz (vfmax)
    })
  }

  const handleInputChangePolaire = (e: any) => {
    const { name, value } = e.target;
    setCurPolaire((curPolaire) => ({
      ...curPolaire,
      [name]: value,
    }));
  };

  const handleInputParams = (e: any) => {
    const { name, value } = e.target;
    handleChangeParams (name, value)
  };

  function handleChangeParams (name: string, value: any): void {
    setParams ( (params) => ({
      ...params, 
        [name]: value
    }))
  }

  return <>
    <Stack spacing={2} alignItems="start">

        <Typography variant="h6">Choisir une polaire dans la liste suivante:         </Typography>

        <Autocomplete
          options={polaires}
          getOptionLabel={ (p:PolaireType)=>p.model}
          sx= {{width: 300 }}
          renderInput={(params) => <TextField {...params} label="Polaires" />}
          onChange={handleChangePolaire}
          value={curPolaire}
          >
          </Autocomplete>    

          <Accordion>
          <AccordionSummary
            aria-controls="panel2-content"
            id="panel2-header"
            expandIcon={<ExpandMoreIcon />}

          >
          <Typography component="span">Points caractéristiques de la polaire</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Pour la modélisation polynomiale de la polaire du planeur.</Typography>

        <TablePolaire
            handleInputChange={handleInputChangePolaire}
            curPolaire={curPolaire}
            >
          </TablePolaire>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h6">Paramètres</Typography>

      <Grid2 container spacing={10} sx={{width: '100%'}}>
        <Grid2 size={4}>
          <NumericInput 
          label="Mouvement vertical de la masse d'air (ou calage MacCready)"
          min={-5}
          max={5}
          defaultValue={0}
          step={.1}
          unit='m/s'
          onChange={ (e: number) => handleChangeParams("Vzw", e)}
        ></NumericInput>
        </Grid2>

        <Grid2 size={4}>
          <NumericInput 
          label="Vitesse du vent apparent de face"
          min={0}
          max={100}
          defaultValue={0}
          step={5}
          unit='km/h'
          onChange={ (e: number) => handleChangeParams("Vw", e)}
        ></NumericInput>
        </Grid2>

        <Grid2 size={4}></Grid2>

      </Grid2>

     


    
          { calcValues ? (
            <>

          <Typography variant="h6">Résultats des calculs</Typography>

          <Stack>
          <Typography>Finesse max: {calcValues.fin_max > 0 ? calcValues.fin_max.toFixed(0):'--'}</Typography>
          <Typography>Vitesse SOL à finesse max: {calcValues.Vfmax.toFixed(0)} Km/h</Typography>
          <Typography>Vitesse AIR à finesse max: {(calcValues.Vfmax + params.Vw).toFixed(0)} Km/h</Typography>
          <Typography>Taux de chute du planeur à finesse max: {(calcValues.f_vz(calcValues.Vfmax)-params.Vzw).toFixed(2)} m/s</Typography>
          <Typography>Taux de chute total à finesse max: {(calcValues.f_vz(calcValues.Vfmax)).toFixed(2)} m/s</Typography>
          <Typography>Taux de chute équivalent  au vent de face: 
            {( params.Vw * calcValues.f_vz(calcValues.Vfmax) / (calcValues.Vfmax)   ).toFixed(2)} m/s
          </Typography>
          </Stack>

          <Typography variant="h6">Polaire des vitesses</Typography>

          <Chart 
            polaire={curPolaire}
            calcValues={calcValues}
            params={params}
            ></Chart>

</>
): ''}

    </Stack>
  </>
}

export default App
