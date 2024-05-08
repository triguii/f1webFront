'use client'

import ConstructorsTimeGraph from "@/app/(components)/ConstructorStandings"
import { useRouter } from 'next/navigation';
import { ArrowBackIos } from "@mui/icons-material";



export default function alovetPage () {
    
    const router = useRouter()

    return(
        <>
        <ArrowBackIos sx={{position:'fixed', left: '2rem', float: 'right', cursor: 'pointer'}} onClick={() => {
          router.push('/alovet/1')
        }}/>
        <h2 style={{textAlign: 'center'}}>Cara a cara: Antes de 2010: Los equipos</h2>

        <img src="\alovet\ferrari.png" style={{width: '250px',  height: '120px', float: 'left'}}/>
        <img src="\alovet\redbull.png" style={{width: '250px',  height: '80px', float: 'right'}}/>
        <ConstructorsTimeGraph/>
        </>


    )
}