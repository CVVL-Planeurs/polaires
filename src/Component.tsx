import { Container, Stack, Typography } from "@mui/material"

export function Component (props: { title: string, children: React.ReactNode}) {

    const {title, children} = props


    return (
        <>
        <Container className="container">
             <Typography variant="h6">{title} </Typography>
            <Stack spacing={2}>{children}</Stack>
        </Container>
        </>
    )
}