import styled from "styled-components";

export default function Seat ({name, available, selected, action}){
    let colorset
    if (available && selected) {
        colorset = "1";
    } else if (available) {
        colorset = "2";
    } else {
        colorset = "3";
    }

    return (
        <SeatIMG colorset={colorset} onClick={action}>
            {name}
        </SeatIMG>
    )
}


const SeatIMG = styled.div`
width:26px;
height:26px;
display:flex;
justify-content:center;
align-items:center;
font-size:11px;
margin:7px;
background-color:${props => props.colorset === "1" ? "#8DD7CF" : props.colorset === "2" ? "#C3CFD9" : "#FBE192"};
border:solid 1px ${props => props.colorset === "1" ? "#1AAE9E" : props.colorset === "2" ? "#808F9D" : "#F7C52B"};
border-radius:50px;
`
