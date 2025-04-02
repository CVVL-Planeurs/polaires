import './App.css'

import { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import { Autocomplete, Grid2, TextField, Typography, Tooltip, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { lusolve, } from 'mathjs';
import { Component } from './Component.tsx';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { PolaireType, CalcValuesType, ParamsType } from './types';
import { Chart } from './Chart';
import { polaires } from './polaires'
import { TablePolaire } from './TablePolaire';

import {NumericInput} from './NumericInput.tsx'; 
import { CopyrightSharp } from '@mui/icons-material';



function App() {

  const [curPolaire, setCurPolaire] = useState<PolaireType> (polaires[0])
  const [calcValues, setCalcValues] = useState<CalcValuesType> ()
  const [params, setParams] = useState <ParamsType>({Vzw: 0, Vw: 0, Mp: 80, Mwb: 0, Mc:0})

  useEffect ( updateCalcValues, [curPolaire, params])

  function handleChangePolaire(_: unknown, newPolaire:PolaireType | null) {
    if (! newPolaire) return
    setCurPolaire (newPolaire)
  }

  function updateCalcValues (){
    
    // résolution des coefficients de la polaire
    const coefs = lusolve ( 
      [ [ (curPolaire.v1-params.Vw)**2, curPolaire.v1-params.Vw, 1],
        [ (curPolaire.v2-params.Vw)**2, curPolaire.v2-params.Vw, 1],
        [ (curPolaire.v3-params.Vw)**2, curPolaire.v3-params.Vw, 1]]
        , [ curPolaire.w1+params.Vzw, curPolaire.w2+params.Vzw,curPolaire.w3+params.Vzw ]
    ) as number[][]

    // coefficients de la polaire de référence
    let a = coefs[0][0] 
    let b = coefs[1][0]
    let c = coefs[2][0]

    // masse total au décollage
    const Mt = (curPolaire.empty_mass?? curPolaire.ref_mass) + params.Mp + params.Mwb

    // facteur de charge de la masse au décollage
    const loading_factor =  Math.sqrt(Mt / curPolaire.ref_mass)

    // ajustements des coefficients de la polaire avec la masse au décollage 
    a = a / loading_factor
    b = b * 1.
    c = c * loading_factor

    const vfmax = (c / a) ** .5
    const f_vz = (vi: number) => (vi**2*a + vi*b + c )

    // vitesse optimale selon maccready
    const vmc = ((c - params.Mc) / a) ** .5 

    // vitesse de croisière
    // const vcr = vmc * params.Mc / (params.Mc - f_vz(vmc))

    setCalcValues ({
      coefs: {
        a: a, 
        b: b,
        c: c, 
      },
      Vfmax: vfmax,
      f_vz: f_vz, 
      vmc: vmc, 
      fin_max: -1*(vfmax/3.6)/f_vz (vfmax),
      fin_mc: -1*(vmc/3.6)/f_vz (vmc),
      Mt: Mt,
      Ca: Mt / curPolaire.wing_area
    })
  }

  const handleInputChangePolaire = (e:  React.ChangeEvent<HTMLInputElement> ) => {
    if (!e || !e.target) return 
    const { name, value } = e.target;
    setCurPolaire((curPolaire) => ({
      ...curPolaire,
      [name]: value,
    }));
  };

  function handleChangeParams (name: string, value: unknown): void {
    setParams ( (params) => ({
      ...params, 
        [name]: value
    }))
  }

  return  calcValues?  (
    <Stack spacing={2} alignItems="start">


      <Component title="Polaire du planeur à utiliser">


        <Autocomplete
          options={polaires}
          getOptionLabel={ (p:PolaireType)=>p.model}
          sx= {{width: 200 }}
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
      </Component>



      <Component title="Paramètres">

        <Grid2 container spacing={5}>
          <Grid2 size={{xs:12, sm:6, md:4}}>
            <NumericInput 
            label="Mouvement vertical de la masse d'air"
            min={-5}
            max={0}
            defaultValue={0}
            step={.1}
            unit='m/s'
            onChange={ (e: number) => handleChangeParams("Vzw", e)}
          ></NumericInput>
          </Grid2>

          <Grid2 size={{xs:12, sm:6, md:4}}>
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

          <Grid2 size={{xs:12, sm:6, md:4}}>
            <NumericInput 
            label="Calage MacCready"
            min={0}
            max={5}
            defaultValue={0}
            step={.1}
            unit='m/s'
            onChange={ (e: number) => handleChangeParams("Mc", e)}
          ></NumericInput>
          </Grid2>

          
          <Grid2 size={{xs:12, sm:6, md:4}}>
            <NumericInput 
            label="Masse du/des pilote(s) (avec parachute et equipements)"
            min={50}
            max={250}
            defaultValue={80}
            step={1}
            unit='Kg'
            onChange={ (e: number) => handleChangeParams("Mp", e)}
          ></NumericInput>
          </Grid2>

          <Grid2 size={{xs:12, sm:6, md:4}}>
            <NumericInput 
            label={"Water-Ballast (max : " + curPolaire.max_ballast.toFixed(0) + " Kg )"}
            min={0}
            max={curPolaire.max_ballast}
            defaultValue={0}
            step={1}
            unit='L'
            onChange={ (e: number) => handleChangeParams("Mwb", e)}
          ></NumericInput>
          </Grid2>

          <Grid2 size={{xs:12, sm:6, md:4}}>
            <Tooltip arrow placement="left" title="Masse utilisée pour le calcul de la polaire">
              <Typography>Masse de réfèrence : {curPolaire.ref_mass} Kg</Typography>

            </Tooltip>

            <Typography>Masse au décollage : {calcValues?.Mt } Kg</Typography>
            <Typography>Charge alaire: {calcValues?.Ca.toFixed(1) } Kg / m² </Typography>


          </Grid2>
        </Grid2>
        <Typography color='warning'>Les valeurs indiquées ci-dessus doivent être dans les limites de masse et de centrage
          autorisées par le constructeur.
        </Typography>

      </Component>

      <Component title="Résultats des calculs">
    
          <Typography variant="h6"></Typography>

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
                  { calcValues.Vfmax.toFixed(0)} Km/h
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
                  {(calcValues.Vfmax + params.Vw).toFixed(0)} Km/h
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
                {(calcValues.f_vz(calcValues.Vfmax)-params.Vzw).toFixed(2)} m/s
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
                {(calcValues.f_vz(calcValues.Vfmax)).toFixed(2)} m/s
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
                {( params.Vw * calcValues.f_vz(calcValues.Vfmax) / (calcValues.Vfmax) ).toFixed(2)} m/s
                </TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

        </Component>



        <Component title="Polaire des vitesses">
          <Chart 
            calcValues={calcValues}
            params={params}
            ></Chart>

            <Typography color="warning">La polaire est une modélisation mathématique dont les valeurs extrèmes sont approximatives. 

            </Typography>
        </Component>

        <Typography> <CopyrightSharp   />Bruno Fleisch, 2025</Typography>
    </Stack>
  ) : ''
}

export default App
