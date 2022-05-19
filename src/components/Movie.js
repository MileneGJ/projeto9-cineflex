
import React from "react";
import styled from 'styled-components'
import axios from 'axios'
import { useParams } from 'react-router-dom';

export default function Movie() {
    const [showtimes, setShowtimes] = React.useState([]);
    const { idFilme } = useParams();
    React.useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);
        promise.then(response => {
            setShowtimes({
                image: response.data.posterURL,
                title:response.data.title,
                ID: response.data.id,
                days: response.data.days
            })
        });
    }, [])

    function Showtime({ days }) {
        return (
            <>
                <p>{days.weekday} - {days.date}</p>
                {days.showtimes.map(times =>
                    <button key={times.id}>{times.name}</button>
                )}
            </>
        )
    }

    function MoviePoster (props) {
        return(
            <MPoster>
                <img  src={props.image} alt="" />
            </MPoster>
        )
    }

    return (
        <Container>
            <h2>Selecione o horário</h2>
            <Showtimes>
                {showtimes.days ? showtimes.days.map(day => <Showtime key={day.id} days={day} />) : "Carregando"}
            </Showtimes>
            <Footer>
                <MoviePoster image={showtimes.image} />
                <h3>{showtimes.title}</h3>
            </Footer>
        </Container>
    )
}

const Container = styled.div`

padding: 0 30px;
box-sizing:border-box;
margin-bottom:160px;
h2{
    text-align:center;
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
    margin-right:10px;
}

p{
    margin:30px 0;
}
`

const Footer = styled.div`
width:100%;
height:120px;
padding: 0 30px;
position:fixed;
bottom:0;
left:0;
background-color:#DFE6ED;
border:solid 1px #9EADBA;
display:flex;
align-items:center;


h3{
    color:#293845;
    font-size:26px;
    margin-left:15px;
}
`

const MPoster = styled.div` 
width:64px;
height:90px;
padding:5px;
overflow:hidden;
background-color:#FFFFFF;
display:flex;
justify-content:center;

img{
    height:90px;
}
`