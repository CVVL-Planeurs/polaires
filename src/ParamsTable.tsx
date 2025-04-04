import { Grid2 } from '@mui/material';
import { CalcValuesType, PolaireType } from './types';
import { NumericInput } from './NumericInput.tsx';
import Tooltip from '@mui/material/Tooltip';
import { Typography} from '@mui/material';

export function ParamsTable(
    {onChangeParams, polaire, calcValues}: 
    {onChangeParams: (param: string, value: number) => void, polaire: PolaireType, calcValues: CalcValuesType
    },
) {

    return (
        <>
        <Grid2 container spacing={5}>
          <Grid2 size={{xs:12, sm:6, md:4}}>
            <NumericInput 
            label="Mouvement vertical de la masse d'air"
            min={-5}
            max={0}
            defaultValue={0}
            step={.1}
            unit='m/s'
            onChange={ (e: number) => onChangeParams("Vzw", e)}
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
            onChange={ (e: number) => onChangeParams("Vw", e)}
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
            onChange={ (e: number) => onChangeParams("Mc", e)}
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
            onChange={ (e: number) => onChangeParams("Mp", e)}
          ></NumericInput>
          </Grid2>

          <Grid2 size={{xs:12, sm:6, md:4}}>
            <NumericInput 
            label={"Water-Ballast (max : " + polaire.max_ballast.toFixed(0) + " L )"}
            min={0}
            max={polaire.max_ballast}
            defaultValue={0}
            step={1}
            unit='L'
            onChange={ (e: number) => onChangeParams("Mwb", e)}
            disabled={polaire.max_ballast == 0.0}
          ></NumericInput>
          </Grid2>

          <Grid2 size={{xs:12, sm:6, md:4}}>
            <Tooltip arrow placement="left" title="Masse utilisée pour le calcul de la polaire">
              <Typography>Masse de réfèrence : {polaire.ref_mass} Kg</Typography>

            </Tooltip>

            <Typography>Masse au décollage : {calcValues?.Mt } Kg</Typography>
            <Typography>Charge alaire: {calcValues?.Ca.toFixed(1) } Kg / m² </Typography>


          </Grid2>
        </Grid2>
        <Typography color='warning'>Les valeurs indiquées ci-dessus doivent être dans les limites de masse et de centrage
          autorisées par le constructeur.
        </Typography>
        </>
    )
}