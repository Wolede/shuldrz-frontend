import PropTypes from 'prop-types'
import { Paper as MuiPaper } from '@material-ui/core'
import { useStyles } from './style'
import clsx from 'clsx';



const Paper = (props) => {
    const {className, children} = props     
    const classes = useStyles(props);

    return (
        <MuiPaper className={ clsx(classes.root, className)}>
            { children }
        </MuiPaper>
    )
}

Paper.propTypes = {
    width: PropTypes.string,
    padding: PropTypes.string,
    color: PropTypes.string,
    marginBottom: PropTypes.string,
}

export default Paper