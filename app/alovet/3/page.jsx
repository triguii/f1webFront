'use client'

import { Slider } from '@mui/material';
import Standings2010 from "@/app/(components)/Standings2010"
import { useState, useEffect } from 'react';
import RaceStandingsTable from '@/app/(components)/RaceStandingsTable';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import ScatterTiempos from '@/app/(components)/ScatterTiempos';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

import ScatterEquipos from '@/app/(components)/ScatterEquipos';

export default function alovetPage () {

    const handleChange = (event, newValue) => {
        setRound(newValue);
    };

    const [graphData, setGraphData] = useState(false)
    const [races, setRaces] = useState([337, 354])
    const [round, setRound] = useState(337)
    const [imageGanador, setImageGanador] = useState('')
    const [lapsData, setLapsData] = useState([])

    const pilots = ["4","20"]
    
    useEffect(() =>  {
        setLapsData([])
        
        pilots.map(pilot => {   
            fetch("http://127.0.0.1:8080/api/getRaceTimes/" + round + "/" + pilot)
            .then((response) => response.json())
            .then((data) => {
  
              let datatoadd = []
  
                data.forEach(element => { 
  
                    element['Tiempo sec'] = (element['Tiempo ms']/1000)
                    datatoadd.push(element)
  
                })
                
                if (lapsData){
                setLapsData(lapsData => [...lapsData, datatoadd])
                }
                else{
                    setLapsData(datatoadd)
                }
  
            })
            
      })

      fetch("http://127.0.0.1:8080/api/getRaceResults/" + round)
      .then((response) => response.json())
      .then((data) => {

          data.sort((a, b) => {

                  return a['Posicion Mundial'] - b['Posicion Mundial']; // Ascending order
              

              // To sort in descending order, use: return b.age - a.age;
          });

          setGraphData(data)
          setImageGanador (data.find((element) => element['Posicion Carrera'] == 1))
          

      })
      },[round])


    const router = useRouter()

    const driverToTeam = {'Hamilton' : 'Mclaren', 'Button' : 'Mclaren', 'Webber' : 'Redbull', 'Vettel' : 'Redbull', 'Alonso' : 'Ferrari'}

    const pathImg = "/alovet/"+imageGanador.Piloto+"_2010.jpg"
        
    


    return (
        graphData ?     <>
        <ArrowBackIos sx={{position:'fixed', left: '2rem', float: 'right', cursor: 'pointer', marginBottom: '1rem'}} onClick={() => {
          router.push('/alovet/2')
        }}/>
        <ArrowForwardIos sx={{position:'fixed', right: '2rem', float: 'left', cursor: 'pointer'}} onClick={() => {
          router.push('/alovet/4')
        }}/>
        <h1>Mundial 2010 : Antes de Abu Dhabi</h1>
        <h2>{graphData[0].name} (Ronda {graphData[0].ronda})</h2>
        <div style={{float:'right', justifyContent: 'center', marginRight: '1rem'}}>
                <img src={pathImg} style={{width: '400px'}}></img>
                <h2>{imageGanador.Piloto} y {driverToTeam[imageGanador.Piloto]} conseguían la victoria.</h2>
                <ScatterTiempos graphsData = {lapsData}/>
                <ScatterEquipos graphsData={graphData}/>


        </div>
        <h4>Selecciona la ronda</h4>

        <Slider
            getAriaLabel={() => 'Ronda'}
            value={round}
            onChange={handleChange}
            marks
            min={races[0]}
            max={races[1]}
            sx={{width: '20rem', marginTop:'1rem', marginLeft:'3rem'}}
        /> 
        <div>
            <h4>Resultados de la carrera</h4>

            <RaceStandingsTable standingsData={graphData}/>



        </div>
        <div>
            <h4>Clasificación del mundial</h4>
            <Standings2010 standingsData={graphData}/>

        </div>


        </> : ''
)

}