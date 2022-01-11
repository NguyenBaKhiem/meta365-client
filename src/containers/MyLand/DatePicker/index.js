import React from 'react';
import calendar from "./calendar.png";
import './style.js';
import { Container, Open, Sd } from './style.js';


const DatePicker = () => {
    return (
        <Container>
            <Sd type="date" name="selected_date" />
            <Open>
                <img style={{cursor: 'pointer'}} src={calendar} alt=""/>
            </Open>
        </Container>
    );
}

export default DatePicker;
