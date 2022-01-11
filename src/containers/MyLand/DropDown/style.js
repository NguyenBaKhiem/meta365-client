import styled from "styled-components";

export const Wapper = styled.div`
    position: relative;
`;

export const Select = styled.div`
    border: 1px solid #00B67F; 
    background: #1E2027;
    border-radius: 12px;
    position: relative;
    display: flex;
    width: 200px;
    overflow: hidden;
    line-height: 3;
    overflow: hidden;
    &::after {
        content: '▼';
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 1em;
        cursor: pointer;
        pointer-events: none;
        -webkit-transition: .25s all ease;
        -o-transition: .25s all ease;
        transition: .25s all ease;
        color: #00B67F;
        
    }
    color: #fff;
    padding: 0 10px;
    cursor: pointer;
`;

export const Options = styled.div`
    position: absolute;
    margin-top: 5px;
    z-index: 100;
    background: #1E2027;
    overflow: hidden;
    width: 200px;
    border: 1px solid #00B67F; 
    border-radius: 12px;
`;

export const Ul = styled.ul`
    list-style-type: none;
    background: transparent;  
    & * ~ * {
        border-top: .5px solid rgba(192, 192, 192, 0.5);
    }
`;

export const Li = styled.li`
    color: #C0C0C0;
    font-size: 14px;
    cursor: pointer;
    padding: 16px;
    &:hover{
        background:#00B67F;
        color: #fff;
    }
`;