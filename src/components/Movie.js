
import React from "react";
import styled from 'styled-components'
import axios from 'axios'

export default function Movie (props) {
    const [showtimes,setShowtimes] = React.useState([]);

    React.useEffect(()=>{
        const promise = axios.get("");
        promise.then(response =>
            setShowtimes(response.data)
        )
    },[])

    return (
        <Container>
            <h2>Selecione o horário</h2>
            <Showtimes>
                {showtimes.map(time => <img source={time} alt="" />)}
            </Showtimes>
            <Footer>
                <img source={props.image} alt="" />
                <h2>{props.title}</h2>
            </Footer>
        </Container>
    )
}

const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
box-sizing:border-box;

h2{
    margin-top:120px;
    color:#293845;
    font-size:24px;
}
`

const Showtimes = styled.div`
font-size:20px;
color:#293845;

button{
    height:44px;
    width:84px;
    background-color:#E8833A;
    color:#FFFFFF;
    border:none;
    border-radius:3px;
    font-size:18px;
}
`

const Footer = styled.div`
width:100%;
padding: 0 30px;
position:fixed;
bottom:0;
left:0;
background-color:#DFE6ED;
border:solid 1px #9EADBA;
display:flex;
align-items:center;

img{
    width:64px;
    height:70px;
}
`