'use client'

import ConstructorsTimeGraph from "@/app/(components)/ConstructorStandings"
import { useRouter } from 'next/navigation';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";



export default function alovetPage () {
    
    const router = useRouter()


    return(
        <>
        <ArrowBackIos sx={{position:'fixed', left: '2rem', float: 'right', cursor: 'pointer'}} onClick={() => {
          router.push('/alovet/1')
        }}/>
        <ArrowForwardIos sx={{position:'fixed', right: '2rem', float: 'left', cursor: 'pointer'}} onClick={() => {
          router.push('/alovet/3')
        }}/>

        <h2 style={{textAlign: 'center'}}>Cara a cara: Antes de 2010: Los equipos</h2>
        <div style={{float: 'left', alignContent:'center'}}>

        <img src="\alovet\ferrari.png" style={{width: '200px',  height: '80px'}}/>
        <h4 style={{display: 'inline-block'}}>Pilotos de Ferrari para 2010: <br/>Fernando Alonso<br/> Felipe Massa</h4>
        </div>
        <div style={{float: 'right'}}>
        <h4 style={{display: 'inline-block', marginRight: '1rem'}}>Pilotos de Red Bull para 2010: <br/>Sebastian Vettel<br/> Mark Webber</h4>

        <img src="\alovet\redbull.png" style={{width: '250px',  height: '80px'}}/>
        </div>
        <ConstructorsTimeGraph/>
        </>


    )
}