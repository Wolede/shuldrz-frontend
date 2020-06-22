import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    "@global": {
        // MUI typography elements use REMs, so you can scale the global
        // font size by setting the font-size on the <html> element.
        html: {
          fontSize: 12,
          [theme.breakpoints.up("md")]: {
            fontSize: 12
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: 14
          },
          [`@media (min-width: 1600px)`]: {
            fontSize: 16
          }
        },
        '*::-webkit-scrollbar': {
          width: '0.4rem',
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.2)',
          borderRadius: '8px'
        }
    }
}));

export { useStyles }