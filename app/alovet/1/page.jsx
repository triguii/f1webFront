'use client'

import { React, useState, useEffect } from "react"
import StandingsTimeGraph from "@/app/(components)/standingsTime"
import Head2headGraph from "@/app/(components)/vsTeammate"
import ImagesPilotsAlonso from "@/app/(components)/ImagesPilotsAlonso"
import ImagesPilotsVettel from "@/app/(components)/ImagesPilotsVettel"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation';
import { Slider } from "@mui/material"
import VictoryBar from "@/app/(components)/VictoryBar"



export default function alovetPage() {

  const router = useRouter()
  const [años, setAños] = useState([2003, 2009]);
  const [graphsData, setgraphsData] = useState([])


  const handleChange = (event, newValue) => {
    setAños(newValue);
  };

  useEffect(() => {

    setgraphsData([])

    fetch("http://127.0.0.1:8080/api/getRacesYears/4/" + (años[0] - 1) + "/" + (años[1] + 1))
      .then((response) => response.json())
      .then((data) => {

        data.sort((a, b) => {
          if (a.Año != b.Año) {
            return a.Año - b.Año; // Ascending order
          }
          else {
            return a.Ronda - b.Ronda;
          }
          // To sort in descending order, use: return b.age - a.age;
        })

        setgraphsData(graphsData => [...graphsData, data])


        fetch("http://127.0.0.1:8080/api/getRacesYears/20/" + (años[0] - 1) + "/" + (años[1] + 1))
          .then((response) => response.json())
          .then((data) => {

            data.sort((a, b) => {
              if (a.Año != b.Año) {
                return a.Año - b.Año; // Ascending order
              }
              else {
                return a.Ronda - b.Ronda;
              }
              // To sort in descending order, use: return b.age - a.age;
            })

            setgraphsData(graphsData => [...graphsData, data])


          })


      })


  }, [años])




  return (
    <main>
      <ArrowForwardIosIcon sx={{ position: 'fixed', right: '2rem', float: 'right', cursor: 'pointer' }} onClick={() => {
        router.push('/alovet/2')
      }} />
      <h2 style={{ textAlign: 'center' }}>Cara a cara: Antes de 2010</h2>

      <ImagesPilotsAlonso />
      <ImagesPilotsVettel />
      <Head2headGraph />
      <h4 style={{ textAlign: 'center' }}>Seleccionar año/s</h4>

      <Slider
        getAriaLabel={() => 'Año'}
        value={años}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={2003}
        max={2009}
        sx={{ width: '10rem', marginLeft: '47%' }}
      />
      <StandingsTimeGraph años={años} />
      <h2 style={{ textAlign: 'center' }}>Distribución de posiciones</h2>

      <VictoryBar graphsData={graphsData} />

    </main>
  )
}