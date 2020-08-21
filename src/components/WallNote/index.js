import React from 'react'
import PropTypes from 'prop-types'

const WallNote = props => {
    const {
        title,
        note,
        hearts,
        color,
        link,
        date,
        dedication,
    } = props
    return (
        <div>
            {title}
            {note}
            {hearts}
            {color}
            {link}
            {date}
            {dedication}
        </div>
    )
}

WallNote.propTypes = {

}

export default WallNote
