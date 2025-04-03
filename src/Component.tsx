import { Collapse, Container, Stack, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";


export function Component (props: { title: string, children: React.ReactNode}) {

    const {title, children} = props
    const [collapsed, setCollapse] = useState<boolean> (false)

    return (
        <>

        <Container className="container">

                <Typography variant="h6">
                    <IconButton onClick={ () => setCollapse(!collapsed)}>
                    { collapsed ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
                    </IconButton>
                {title}         
                </Typography>
    
            <Collapse in={!collapsed}>
            <Stack spacing={2}>{children}</Stack>
            </Collapse>
        </Container>
        </>
    )
}