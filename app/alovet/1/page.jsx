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

    fetch("https://flask-api-lake.vercel.app/api/getRacesYears/4/" + (años[0] - 1) + "/" + (años[1] + 1))
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


        fetch("https://flask-api-lake.vercel.app/api/getRacesYears/20/" + (años[0] - 1) + "/" + (años[1] + 1))
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
    <article style={{ textAlign: 'center', marginLeft: '2rem', marginRight: '2rem' }}>
      <ArrowForwardIosIcon sx={{ position: 'fixed', right: '2rem', float: 'right', cursor: 'pointer' }} onClick={() => {
        router.push('/alovet/2')
      }} />
      <div>
        <h1 style={{ textAlign: 'center', fontSize: '40px' }}>Fernando Alonso vs. Sebastian Vettel </h1>
        <h2> Una exploració visual de la rivalitat entre dos dels grans pilots del segle XXI</h2>
      </div>

      <h1 style={{ textAlign: 'center', fontSize: '35px', marginTop: '10rem' }}>Els dos pilots abans de 2010 </h1>
      <p style={{ color: "#ff2800", fontSize: '25px', fontWeight: 'bold' }}> Abans de 2009, Alonso ja habia sigut campió del món en dos ocasions (2005 i 2006) </p>
      <p style={{ color: "#121f45", fontSize: '25px', fontWeight: 'bold' }}> Vettel va entrar a la Fórmula 1 al 2007, i a la seva tercera temporada ja estaba a Red Bull quedant sotscampió </p>
      <div style={{ margin: '5rem', marginLeft: '15rem', marginRight: '15rem' }}>
        <ImagesPilotsAlonso />
        <ImagesPilotsVettel />
        <Head2headGraph />
      </div>

      <hr style={{ height: '3px', boxShadow: '2', backgroundColor: 'black', marginBottom: '2rem' }} />
        <p style={{ color: "#121f45", fontSize: '25px' }}>
          Tot i que la trajectoria d'Alonso ha sigut més llarga dins de la competició, Vettel ha conseguit uns resultats molt bons als pocs anys
          que ha competit; primer a Toro Rosso, i a 2009 a Red bull, on va acabar la temporada 2on, mentre que Alonso va haver de lluitar per estar
          entre els 10 primers amb un Renault mediocre
        </p>

        <p style={{ color: "#121f45", fontSize: '25px'}}>
          Amb aquestes visualitzacions es pot veure els punts o la posició dels dos pilots al campionat a cadascuna de les curses que van correr. La barra permet escollir
          quins anys es volen filtrar
        </p>
        
        <h4 style={{ textAlign: 'center', marginTop: '1rem'}}>Seleccionar año/s</h4>

        <div style={{ display: 'inline-block', justifyContent: 'center' }}>

        <Slider
          getAriaLabel={() => 'Año'}
          value={años}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={2003}
          max={2009}
          sx={{ width: '10rem' }}
        />

        <StandingsTimeGraph años={años} />
        </div>

        <p style={{ color: "#121f45", fontSize: '25px' }}>
          Aqui podem observer la distribució de posicions aconseguides per cada uns dels pilots en els anys escollits
        </p>

        <h2 style={{ textAlign: 'center' }}>Distribució de posicions</h2>
        <div style={{ display: 'inline-block', justifyContent: 'center' }}>


        <VictoryBar graphsData={graphsData} />
        </div>

    </article>
  )
}