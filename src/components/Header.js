import styled from 'styled-components';

export default function Header(props) {
    return (
        <HeaderContent>
            {props.children}
            <h1>CINEFLEX</h1>
        </HeaderContent>
    );
}

const HeaderContent = styled.div` 
width:100%;
background-color: #C3CFD9;
height:70px;
display:flex;
justify-content:center;
align-items:center;
position:fixed;
top:0;
left:0;

    h1{
        font-size:34px;
        color:#E8833A;
    }

    button{
        position:fixed;
        top:20px;
        left:30px;
        height:30px;
        width:60px;
        background-color:#E8833A;
        color:#FFFFFF;
        border:none;
        border-radius:3px;
        font-size:14px;
    }

`