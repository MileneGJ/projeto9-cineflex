import React from "react";
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

export default function InTheaters () {
    const [movieList,setMovieList] = React.useState([]);

    React.useEffect(()=>{
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(response =>
            setMovieList(response.data.map(movie=>({
                image:movie.posterURL,
                ID:movie.id
            })
                ))
        )
    },[])

    function MoviePoster (props) {
        return(
        <Link key={props.index} to={`/movie/${props.index}`}>
            <MPoster>
                <img  src={props.image} alt="" />
            </MPoster>
        </Link>
        )
    }

    return(
        <Container>
            <h2>Selecione o filme</h2>
            <MovieList>
                {movieList.map(movie => <MoviePoster index={movie.ID} image={movie.image} />)}
            </MovieList>
        </Container>
    );
}

const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
box-sizing:border-box;
width:100%;
padding: 0 30px;
h2{
    margin-top:120px;
    color:#293845;
    font-size:24px;
}
`

const MovieList = styled.div`
margin-top:50px;
display: flex;
flex-wrap: wrap;
justify-content:space-around;

img{
    height:210px;
    width:146px;
}
`

const MPoster = styled.div`
padding:10px;
border-radius:5px;
box-shadow: 0px 2px 4px 2px rgba(50,50,50,0.1);
margin-bottom:18px;
`