import './App.css'

import { useMemo, useState } from 'react'
import Stack from '@mui/material/Stack';
import {  Typography } from '@mui/material';
import { lusolve, } from 'mathjs';

import { PolaireType, CalcValuesType, ParamsType } from './types';
import { polaires } from './polaires'

import { Component } from './Component.tsx';
import { PolaireSelect } from './PolaireSelect.tsx';
import { ParamsTable } from './ParamsTable.tsx';
import { Chart } from './Chart';
import { ResultsTable } from './ResultsTable.tsx';
import { Copyright } from './Copyright.tsx';


const DEFAULT_PARAMS = { Vzw: 0, Vw: 0, Mp: 80, Mwb: 0, Mc: 0 };
const CUR_POLAIRE_KEY = 'curPolaire';


function App() {

  const lastPolaireIdx = useMemo(() => {
    const storedPolaire = localStorage.getItem(CUR_POLAIRE_KEY);
    if (storedPolaire) {
      const idx = polaires.findIndex((x) => x.model === storedPolaire);
      return idx !== -1 ? idx : 0;
    }
    return 0;
  }, []);

  const [curPolaire, setCurPolaire] = useState<PolaireType> (polaires[lastPolaireIdx])
  const [params, setParams] = useState <ParamsType>(DEFAULT_PARAMS)
  const calcValues = useMemo <CalcValuesType> ( runCalculations, [curPolaire, params])

  function handleChangePolaire(newPolaire:PolaireType) {
    setCurPolaire (newPolaire)
    localStorage.setItem(CUR_POLAIRE_KEY, newPolaire.model)
  }


  function handleChangeParams (name: string, value: number|string): void {
    setParams ( (params) => ({
      ...params, 
        [name]: value
    }))
  }


  function runCalculations (){
    
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

    // masse totale au décollage
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

    return {
      coefs: { a,b,c },
      vfmax,
      f_vz, 
      vmc, 
      fin_max: -1*(vfmax/3.6)/f_vz (vfmax),
      fin_mc: -1*(vmc/3.6)/f_vz (vmc),
      Mt,
      Ca: Mt / curPolaire.wing_area
    }
  }


  return   (
    <Stack spacing={4} alignItems="start">

      <Component title="Polaire du planeur à utiliser">
        <PolaireSelect
          onChangePolaire={handleChangePolaire}
          polaires={polaires}
          defaultPolaire={polaires[lastPolaireIdx]}
        ></PolaireSelect>
      </Component>

      <Component title="Paramètres">
        <ParamsTable 
          onChangeParams={handleChangeParams}
          polaire={curPolaire}
          calcValues={calcValues}
          />
      </Component>

      <Component title="Résultats des calculs">
        <ResultsTable 
          calcValues={calcValues}
          params={params}
        />
      </Component>

      <Component title="Polaire des vitesses">
        <Chart 
          calcValues={calcValues}
          params={params}
          polaire={curPolaire}
          ></Chart>

          <Typography color="warning">
            La courbe ci-dessus est une modélisation mathématique de la polaire du planeur; les valeurs extrèmes sont approximatives. 
          </Typography>
      </Component>

      <Copyright/>

    </Stack>
  ) 
}

export default App
