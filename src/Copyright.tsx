
import { Typography } from "@mui/material"
import { CopyrightSharp } from '@mui/icons-material';

export function Copyright() {

    return (
        <Typography className='copyright'> <CopyrightSharp fontSize='small'/>2025 Bruno Fleisch (source: 
        <a href="https://github.com/CVVL-Planeurs/polaires">https://github.com/CVVL-Planeurs/polaires</a>)
        
        </Typography>

    )
}