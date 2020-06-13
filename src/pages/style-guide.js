import Head from 'next/head'
import { Typography, Box } from '@material-ui/core'
import Button from 'components/Button'
import Paper from 'components/Paper'
import Chip from 'components/Chip'
import Avatar from 'components/Avatar'
import Link from 'next/link'

const StyleGuide = () => {
    return (
        <>
            <Head>
                <title>Shuldrz | Style Guide</title>
            </Head>

            <Typography variant="h1">H1 Heading</Typography>
            <Typography variant="h2">H2 Heading</Typography>
            <Typography variant="h3">H3 Heading</Typography>
            <Typography variant="h4">H4 Heading</Typography>
            <Typography variant="h5">H5 Heading</Typography>
            <Typography variant="h6">H6 Heading</Typography>
            <Typography variant="subtitle1">Subtitle 1</Typography>
            <Typography variant="subtitle2">Subtitle 2</Typography>
            <Typography variant="body1">Body 1. The quick brown fox jumps over the lazy goat</Typography>
            <Typography variant="body2">Body 1. The quick brown fox jumps over the lazy goat</Typography>
            <Typography variant="button">Button Text</Typography>
            <br/>
            <Typography variant="caption">Caption</Typography>
            <br/>
            <Link href="/app">
                <a style={{textDecoration:'none'}}>
                    <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    >
                        large Button
                    </Button>
                </a>
            </Link>
            
            <br/>
            <br/>
            <Button variant="contained" size="medium" color="secondary">Medium Button</Button>
            <br/>
            <br/>
            <Button variant="contained" size="medium" color="error">Medium Button</Button>
            <br/>
            <br/>
            <Button variant="contained" size="small" color="warning">small Button</Button>
            <br/>
            <br/>
            <Button variant="contained" disabled>Disabled Button</Button>
            <br/>
            <br/>
            <Paper width="30%">
                This is a Paper
            </Paper>
            <Paper width="30%" color="primary">
                This is a Primary Paper
            </Paper>
            <Paper width="40%" color="error">
                This is a Error Paper
            </Paper>
            <br/>
            <br/>
            <Chip label="400" heart color="warning"/>
            <Chip label="Gold" rank="#FFE926" color="error"/>
            <Chip label="Lede Adeniyi" color="secondary"/>
            <br/>
            <br/>
            <Box width="300px">
                <Avatar alt="lol" src="./images/avatar1.jpg" size="huge" autoWidth/>
                <Avatar alt="Lolly pop" variant="rounded" src="./images/avatar.jg" size="small"/>
                {/* broken images use the first letter of the alt attribute */}
            </Box>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

        </>
    )
}

export default StyleGuide
