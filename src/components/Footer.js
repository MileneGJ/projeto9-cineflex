import styled from 'styled-components';

export default function Footer ({image,title,selectedShowtime,day,time}){

    function MoviePoster(props) {
        return (
            <MPoster>
                <img src={props.image} alt="" />
            </MPoster>
        );
    }

    return(
        <FooterInfo>
                <MoviePoster image={image} />

                <h3>{title}{selectedShowtime? <><br />{day} - {time}</> : ""} </h3> 
            </FooterInfo>
    );
}

const FooterInfo = styled.div`
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
    margin:0 30px 0 15px;
    line-height:35px;
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
box-shadow: 0px 1px 2px 1px rgba(50,50,50,0.1);

img{
    height:90px;
}
`