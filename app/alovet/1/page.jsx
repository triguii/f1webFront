'use client'

import React from "react"
import StandingsTimeGraph from "@/app/(components)/standingsTime"
import Head2headGraph from "@/app/(components)/vsTeammate"
import ImagesPilotsAlonso from "@/app/(components)/ImagesPilotsAlonso"
import ImagesPilotsVettel from "@/app/(components)/ImagesPilotsVettel"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation';



export default function alovetPage () {

    const router = useRouter()


    return(
        <main>
        <ArrowForwardIosIcon sx={{position:'fixed', right: '2rem', float: 'right', cursor: 'pointer'}} onClick={() => {
          router.push('/alovet/2')
        }}/>
        <h2 style={{textAlign: 'center'}}>Cara a cara: Antes de 2010</h2>
        <ImagesPilotsAlonso/>
        <h2 style={{display: 'inline-block', maxWidth: '20rem', marginLeft: '2rem'}}> Un bicampeón que pretenderá volver a ganar en un nuevo equipo con mucha historia</h2>
        <ImagesPilotsVettel/>
        <h2 style={{display: 'inline-block', float: "right" ,maxWidth: '20rem', marginRight: '2rem'}}> Una promesa en alza que buscará el primer mundial para un RedBull cada vez más dominante</h2>
        <Head2headGraph/>
        <StandingsTimeGraph/>

        </main>
    )
}