import PropTypes from 'prop-types'
import { Paper as MuiPaper } from '@material-ui/core'
import { useStyles } from './style'

const Paper = (props) => {
    const {children} = props
    const classes = useStyles(props);

    return (
        <MuiPaper className={classes.root}>
            { children }
        </MuiPaper>
    )
}

Paper.propTypes = {
    width: PropTypes.string,
    padding: PropTypes.string,
    borderRadius: PropTypes.string,
    color: PropTypes.string,
    marginBottom: PropTypes.string,
}

export default Paper