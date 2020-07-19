import PropTypes from 'prop-types'
import { Paper as MuiPaper } from '@material-ui/core'
import { useStyles } from './style'
import clsx from 'clsx';



const Paper = (props) => {
    const {className, children, ref} = props     
    const classes = useStyles(props);

    return (
        <MuiPaper ref={ref} className={ clsx(classes.root, className)}>
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
    height: PropTypes.string,
    ref: PropTypes.any
    
}

export default Paper