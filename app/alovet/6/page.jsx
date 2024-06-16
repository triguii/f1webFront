'use client'

import { React, useEffect, useState } from "react"
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import VictoryBar from "@/app/(components)/VictoryBar";
import { Slider } from "@mui/material";
import TimeDiffBar from "@/app/(components)/TimeDiffBar";


export default function alovetPage() {

    const [graphsData, setgraphsData] = useState([])

    const router = useRouter()
    const [años, setAños] = useState([2010, 2013 ]);


    const handleChange = (event, newValue) => {
        setAños(newValue);
    };


    useEffect(() => {

        setgraphsData([])

        fetch("http://127.0.0.1:8080/api/getRacesYears/4/" + (años[0] - 1) + "/" + (años[1] + 1))
        .then((response) => response.json())
        .then((data) => {

            data.sort((a, b) => {
                if (a.Año != b.Año){
                    return a.Año - b.Año; // Ascending order
                }
                else {
                    return a.Ronda - b.Ronda;
                }
                // To sort in descending order, use: return b.age - a.age;
            })

            setgraphsData(graphsData => [...graphsData, data])

            fetch("http://127.0.0.1:8080/api/getRacesYears/20/" +(años[0] - 1) + "/" + (años[1] + 1))
            .then((response) => response.json())
            .then((data) => {

                data.sort((a, b) => {
                    if (a.Año != b.Año){
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


    return(

    <>
        <ArrowBackIos sx={{ position: 'fixed', left: '2rem', float: 'right', cursor: 'pointer', marginBottom: '1rem' }} onClick={() => {
            router.push('/alovet/5')
            }} />

        <h2>Alonso vs Vettel: 2010 - 2013</h2>
        <Slider
          getAriaLabel={() => 'Año'}
          value={años}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={2010}
          max={2013}
          sx={{width: '10rem', marginLeft: '47%'}}
        />

        <div>
            <h4>Distribución de las posiciones conseguidas</h4>
            <VictoryBar graphsData={graphsData}/>
            
        </div>

        <div>
            <h4>Diferencia de tiempos en la mejor vuelta de cada carrera</h4>
            <TimeDiffBar graphsData={graphsData}/>
            
        </div>
    </>
        
    )

}