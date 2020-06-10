import Head from 'next/head'
import { Button as MuiButton, Typography } from '@material-ui/core'
import Button from 'components/Button'
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
            <Link href="/user-home">
                <a style={{textDecoration:'none'}}>
                    <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    >
                        Go to user
                    </Button>
                </a>
            </Link>
            
            <br/>
            <MuiButton variant="contained" color="primary" size="small">small button</MuiButton>
            <br/>
            <br/>
            <MuiButton variant="contained" color="secondary" size="medium">medium button</MuiButton>
            <br/>
            <br/>
            <MuiButton variant="contained" color="secondary" size="large">Large button</MuiButton>
            <br/>
            <br/>
            <MuiButton variant="contained" disabled>Disabled button</MuiButton>
            <br/>
        </>
    )
}

export default StyleGuide
