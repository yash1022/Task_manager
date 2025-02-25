import React, { useContext, useState } from 'react'
import { SettingsContext } from '../context/SettingsContext'

const SetPomodoro = () => {

    const [newTimer, setNewTimer] = useState({
        work: 0.0,
        short: 10.0,
        long: 30.0,
        active: 'work'
    })

    const {updateExecute} = useContext(SettingsContext)

    const handleChange = input => {
        const {name, value} = input.target
        switch (name) {
            case 'work':
                setNewTimer({
                    ...newTimer,
                    work: parseInt(value)
                })
                break;
            case 'shortBreak':
                setNewTimer({
                    ...newTimer,
                    short: parseInt(value)
                })
                break;
            case 'longBreak':
                setNewTimer({
                    ...newTimer,
                    long: parseInt(value)
                })
                break;
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        updateExecute(newTimer)
    }
    return (
        <div className="form-container" style={{marginTop:'-25px'}}>
            <h2 style={{fontFamily:"Montserrat,serif"}}>Pomodoro</h2>
            <medium style={{fontFamily:"Montserrat,serif"}}>Be productive the right way.</medium>
            <form noValidate onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input className="input" type="number" name="work" onChange={handleChange} value={newTimer.work} />
                    <input className="input" type="number" name="shortBreak" onChange={handleChange} value={newTimer.short} />
                    <input className="input" type="number" name="longBreak" onChange={handleChange} value={newTimer.long} />
                </div>
                <button type='submit' style={{fontFamily:"Montserrat,serif"}}>Set Timer</button>
            </form>
        </div>
    )
}

export default SetPomodoro