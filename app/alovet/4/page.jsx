'use client'


import {React, useEffect, useState} from "react"
import QualyPlot from "@/app/(components)/QualyPlot"
import { Select, MenuItem, Checkbox, ListItemText  } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import Standings2010 from "@/app/(components)/Standings2010";



export default function alovetPage () {

    const router = useRouter()
    const [graphData, setGraphData] = useState(false)
    const [filteredGraphData, setFilteredGraphData] = useState(false)



    const handleChange = (event) => {

        const {
            target: { value },
          } = event;


        setPilots(value)
    }


    const [pilots, setPilots] = useState([])

    const pilotsObject = {
        "Sebastian Vettel" : "20",
        "Fernando Alonso" : "4",
        "Lewis Hamilton" : "1",
        "Mark Webber" : "17"
    }

    useEffect (() => {
        fetch("http://127.0.0.1:8080/api/getRaceResults/354")
        .then((response) => response.json())
        .then((data) => {

            data.sort((a, b) => {

                    return a['Posicion Mundial'] - b['Posicion Mundial']; // Ascending order
                

                // To sort in descending order, use: return b.age - a.age;
            });

            setGraphData(data)
            setFilteredGraphData(data)


        })
    }, [])

    useEffect(() => {
        if (graphData){
            setFilteredGraphData(graphData.filter((element) => pilots.includes(element["Piloto Nombre"] + " " + element["Piloto"])))
        }

    }, [pilots])


    return(
        <>
            <ArrowBackIos sx={{position:'fixed', left: '2rem', float: 'right', cursor: 'pointer', marginBottom: '1rem'}} onClick={() => {
            router.push('/alovet/3')
            }}/>
            <ArrowForwardIos sx={{position:'fixed', right: '2rem', float: 'left', cursor: 'pointer'}} onClick={() => {
            router.push('/alovet/5')
            }}/>
            <h2>Abu Dhabi 2010: Pelea final por el mundial</h2>

            <Select
            labelId="checkboxPilots"
            id="checkboxPilots"
            multiple
            value={pilots}
            onChange={handleChange}
            sx={{width: '15rem'}}

            >
                {Object.keys(pilotsObject).map((name) => (
                    <MenuItem key={name} value={name}>
                        <ListItemText primary={name} />
                    </MenuItem>
            ))}


            </Select>
            <QualyPlot pilots={pilots}  pilotsObject={pilotsObject}/>
            <h4>Clasificación en el mundial antes de la carrera</h4>
            <Standings2010 standingsData={filteredGraphData} dataMin={true}/>

        </>
    )
}