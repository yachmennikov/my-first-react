import React from 'react'
import classes from './Backdrop.module.scss'

const Backdrop = props => <div className={classes.backdrop} onClick={props.onClick}></div>

export default Backdrop

