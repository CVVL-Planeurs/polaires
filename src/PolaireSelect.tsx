import React from 'react';
import { PolaireType } from './types';
import { Autocomplete, Accordion, AccordionSummary,AccordionDetails, Typography, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TablePolaire } from './TablePolaire.tsx';


export function PolaireSelect (
    {onChangePolaire,  polaires, defaultPolaire }:
    {onChangePolaire: (newPolaire:PolaireType) => void,  polaires: PolaireType[], defaultPolaire: PolaireType}
) {
    
    const [curPolaire, setCurPolaire] = React.useState<PolaireType>(defaultPolaire);
    
    const handleInputChangePolaire = (e:  React.ChangeEvent<HTMLInputElement> ) => {
        if (!e || !e.target) return 
        const { name, value } = e.target;
        setCurPolaire((curPolaire) => ({
          ...curPolaire,
          [name]: value,
        }));
        onChangePolaire(curPolaire)
      }

      return (
        <>
    <Autocomplete   
          options={polaires}
          getOptionLabel={ (p:PolaireType)=>p.model}
          sx= {{width: 200 }}
          renderInput={(params) => <TextField {...params} label="Polaires" />}
          onChange={ (_: unknown, newPolaire:PolaireType | null) => {onChangePolaire(newPolaire!); setCurPolaire(newPolaire!)} }
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
    </>
      )
    }