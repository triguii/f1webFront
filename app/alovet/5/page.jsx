'use client'

import { React, useEffect, useState } from "react"
import { Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import ScatterTiempos from "@/app/(components)/ScatterTiempos";
import RacePosition from "@/app/(components)/RacePosition";
import RaceStandingsTable from "@/app/(components)/RaceStandingsTable";
import getName2Id from "@/config/name2id";

export default function alovetPage() {

    const handleChange = (event) => {

        const {
            target: { value },
        } = event;


        setPilots(value)

    }

    const raceId = 355

    const router = useRouter()

    const [pilots, setPilots] = useState([])
    const [standingsData, setStandingsData] = useState([])
    const [lapsData, setLapsData] = useState([])


    useEffect(() => {

        fetch("https://flask-api-lake.vercel.app/api/getRaceResults/" + raceId)
        .then((response) => response.json())
        .then((data) => {

            data.sort((a, b) => {

                    return a['Posicion Mundial'] - b['Posicion Mundial']; // Ascending order
                

                // To sort in descending order, use: return b.age - a.age;
            });

            setStandingsData(data)


        })

    }, [])

    
    useEffect(() =>  {

        setLapsData([])

        pilots.map(pilot => {   
            fetch("https://flask-api-lake.vercel.app/api/getRaceTimes/" + raceId + "/" + pilotsObject[pilot])
            .then((response) => response.json())
            .then((data) => {
  
              let datatoadd = []
  
                data.forEach(element => { 
  
                    element['Tiempo sec'] = (element['Tiempo ms']/1000)
                    datatoadd.push(element)
  
                })
                
                setLapsData(lapsData => [...lapsData, datatoadd])
  
            })
            
      })
      },[pilots])


    const pilotsObject = getName2Id()

    return (
        <>
            <ArrowBackIos sx={{ position: 'fixed', left: '2rem', float: 'right', cursor: 'pointer', marginBottom: '1rem' }} onClick={() => {
                router.push('/alovet/4')
            }} />
            <ArrowForwardIos sx={{ position: 'fixed', right: '2rem', float: 'left', cursor: 'pointer' }} onClick={() => {
                router.push('/alovet/6')
            }} />
            <h2>Abu Dhabi 2010: La carrera</h2>
            <Select
                labelId="checkboxPilots"
                id="checkboxPilots"
                multiple
                value={pilots}
                onChange={handleChange}
                sx={{ width: '15rem' }}

            >
                {Object.keys(pilotsObject).map((name) => (
                    <MenuItem key={name} value={name}>
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}


            </Select>
            <div >
            <h4>Evolución de los tiempos de vuelta a lo largo de la carrera</h4>

            <ScatterTiempos graphsData={lapsData}/>
            <h4>Evolución de las posiciones a lo largo de la carrera</h4>

            <RacePosition graphsData={lapsData}/>
            </div>
            
            <RaceStandingsTable standingsData={standingsData}/>





        </>
    )
}