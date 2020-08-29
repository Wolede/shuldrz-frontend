import Head from 'next/head'
import MainLayout from 'components/Layouts/MainLayout'
import WallLayout from 'components/Layouts/WallLayout'
import { Box, Container, Typography } from '@material-ui/core'
import Button from 'components/Button'
import Link from 'next/link'

const PublicWall = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Wall</title>
            </Head>
            <MainLayout withFooter>
                <Box id='hero-front' paddingTop='9.25rem' paddingBottom="4rem">
                    <Container maxWidth='lg'>
                        <Box marginBottom='3.5rem' textAlign="center" margin='0 auto'>
                            <Typography variant='h2' gutterBottom>
                                Shuldrz Wall.
                            </Typography>
                        </Box>
                        <WallLayout isPublic={true} />
                    </Container>
                    <Box paddingTop="2.5rem" paddingBottom="2.5rem" textAlign="center">
                        <Link href='/login'>
                            <a style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary" size="medium">Login to see more</Button>    
                            </a>
                        </Link>
                    </Box>
                </Box>
            </MainLayout>
        </div>
    )
}

export default PublicWall
