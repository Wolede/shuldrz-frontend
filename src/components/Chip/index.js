import PropTypes from 'prop-types'
import { Chip as MuiChip } from '@material-ui/core'
import { useStyles } from './style'

// To learn how to use, visit https://material-ui.com/components/chips/

const Chip = props => {
    const { variant, color, size, onDelete, icon, label, heart, rank } = props
    const classes = useStyles(props)

    // choose predefined icon 
    let avatar;
    const chooseIcon = () => {
        if(heart) {
            avatar = <img alt="heart" src="./icons/heart2.svg" />
        } else if (rank) {
            avatar = <div style={{ width: '1.5rem', height: '1.5rem', backgroundColor: rank, borderRadius: '100%'  }}></div>
        } else {
            avatar = null
        }
    }
    chooseIcon()

    // Only Primary and Secondary is allowed in the color prop so we're mitigating for that 
    let coloured;
    const primaryOrSecondaryColor = () => {
        if (color === 'primary' || color === 'secondary') {
            coloured = color
        } else {
            coloured = 'inherit'
        }
    }
    primaryOrSecondaryColor()

    return (
        <MuiChip
        variant={variant} 
        color={coloured} 
        size={size} 
        onDelete={onDelete}
        icon={icon}
        avatar={avatar}
        className={classes.root}
        label={label}
        />
    )
}

Chip.propTypes = {
    variant: PropTypes.string,
    heart: PropTypes.bool,
    rank: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    onDelete: PropTypes.func,
    icon: PropTypes.any,
    avatar: PropTypes.any,
    label: PropTypes.string,
}

export default Chip