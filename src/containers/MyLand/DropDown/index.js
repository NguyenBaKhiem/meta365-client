import React, {useState} from 'react';
import {Select, Options, Wapper, Ul, Li} from './style'


const Dropdown = () => {
    const [state, setState] = useState('All');
    const [show, setShow] = useState(false)
 
    return (
        <Wapper>
            <Select onClick={()=>setShow(!show)}>
                {state}
            </Select>
            {
                show && <Options>
                    <Ul>
                        <Li onClick={() => {setState('All'); setShow(false)}}>
                            All
                        </Li>
                        <Li  onClick={() => {setState('Market');  setShow(false)}}>
                            Market
                        </Li>
                        <Li  onClick={() => {setState('Regular Auction');  setShow(false)}}>
                            Regular Auction
                        </Li>
                        <Li  onClick={() => {setState('Reverse Auction');  setShow(false)}}>
                            Reverse Auction
                        </Li>
                    </Ul>
                </Options>
            }
        </Wapper>
        
    );
}

export default Dropdown;
