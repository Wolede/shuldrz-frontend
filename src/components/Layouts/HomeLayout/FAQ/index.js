import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box, useMediaQuery, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import Button from 'components/Button'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link'
import ReactMarkdown from 'react-markdown';

const FAQ = props => {
    const { faqPage, faqs } = props
    const classes = useStyles()
    const theme = useTheme();
    const isDesktop= useMediaQuery(theme.breakpoints.up('xl'));

    return (
        <Container maxWidth={isDesktop ? 'xl' : 'lg'}>
            <Box id='faq' paddingBottom='10rem'>
                <Box marginBottom='2.5rem' textAlign='center' margin='0 auto' >
                    <Typography variant='h2' className={classes.subHeader} gutterBottom>
                        Frequently Asked Questions.
                    </Typography>
                    <Typography variant="subtitle2" 
                    style={{ margin: '0 auto', maxWidth: isDesktop ? '43.75rem' : '50rem' }}>
                         Answers to questions you may have. Remember we are just friends willing to help; if you are in crisis and need a professional, please reach out to your federal or state government agencies.
                    </Typography>
                </Box>

                <Box margin='0 auto' maxWidth={isDesktop ? '43.75rem' : '50rem'} marginBottom='2rem'>
                    {faqs.map((faq, key) => (

                        <ExpansionPanel
                            className={classes.paper}
                            key={key}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant='h5' className={classes.headerText}>
                                    {faq.question}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Box>
                                    <ReactMarkdown source={faq.answer} />
                                </Box>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </Box>

                {!faqPage && (
                    <Box textAlign='center' margin='0 auto' maxWidth={isDesktop ? '43.75rem' : '50rem'}>
                        <Link href='/faq'>
                            <a style={{textDecoration: 'none'}}>
                                <Button color="primary" variant="contained">Find out more</Button>              
                            </a>
                        </Link>
                    </Box>
                )}

            </Box>
        </Container>
    )
}

FAQ.propTypes = {
    faqPage: PropTypes.bool
}

export default FAQ
