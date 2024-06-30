'use client'

import { React, useEffect, useState } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

import { Select, MenuItem } from "@mui/material";

export default function Head2headGraph ({}){

    const finalRacesAlonsoId = { '2009' : [17, 4, 12, "Nelson Piquet Jr"], '2008' : [35, 4, 12, "Nelson Piquet Jr"]} 
    const finalRacesVettelId = { '2009' : [17, 20, 17, "Mark Webber"], '2008' : [35, 20, 7, "Sébastien Bourdais"]} 

    const [selectedYear, setSelectedYear] = useState('2008')
    const [graphData, setGraphData] = useState(false)
    const [loading, setLoading] = useState(true)

    const handleChange = (event) => {
        setSelectedYear(event.target.value);
    };

    useEffect(() => {

        let datatoappend = []
        const yearDataAlonso = finalRacesAlonsoId[selectedYear]
        const yearDataVettel = finalRacesVettelId[selectedYear]


        fetch("https://flask-api-lake.vercel.app/api/getHead2Head/" +yearDataAlonso[0]+"/"+yearDataAlonso[1]+"/"+yearDataAlonso[2])
        .then((response) => response.json())
        .then((data) => {

            data.forEach(element => {
                element.name = "Alonso vs " + yearDataAlonso[3]
                if (element.driverId == yearDataAlonso[1]){
                    element["Alonso"] = element.points
                    element["Driver"] = "Alonso"
                }
                else {
                    element["Compañero Alonso"] = element.points
                    element["Driver"] = yearDataAlonso[3]

                }

            })

            datatoappend.push(...data)

            fetch("https://flask-api-lake.vercel.app/api/getHead2Head/" +yearDataVettel[0]+"/"+yearDataVettel[1]+"/"+yearDataVettel[2])
            .then((response) => response.json())
            .then((data) => {


   
                datatoappend.push(...data)

                data.forEach(element => {
                    element.name = yearDataVettel[3] + " vs Vettel" 
                    if (element.driverId == yearDataVettel[1]){
                        element["Vettel"] = element.points
                        element["Driver"] = "Vettel"

                    }
                    else {
                        element["Compañero Vettel"] = element.points
                        element["Driver"] = yearDataVettel[3]

                    }
    
                })


                setGraphData(datatoappend)

    
                setLoading(false)
    
            });  


    
        });

    }, [selectedYear])



    return(loading ? '':
    <div style={{display: 'inline-block',  justifyContent: 'center'}}>
        <h4 style={{textAlign: 'center'}}>Comparació de punts dels dos pilots contra els seus companys d'equip</h4>

        <Select
            labelId="selectYear"
            id="selectYear"
            value={selectedYear}
            label="Temporada"
            onChange={handleChange}
            sx={{marginLeft: '10%'}}
        >
            <MenuItem value={'2008'}>Temporada 2008</MenuItem>
            <MenuItem value={'2009'}>Temporada 2009</MenuItem>
        </Select>
        <BarChart
        width={500}
        height={300}
        data={graphData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis label={{ value: "Punts", angle: -90, position: 'insideLeft', offset: -5 }}/>
        <Tooltip />
        <Bar dataKey="Alonso" stackId="Alonso" fill="#ff2800" />
        <Bar dataKey="Compañero Alonso" label="Company d'Alonso" stackId="Alonso" fill="gray" />
        <Bar dataKey="Vettel" stackId="Vettel" fill="#121f45" />
        <Bar dataKey="Compañero Vettel" label="Company de Vettel" stackId="Vettel" fill="gray" />

      </BarChart>
      </div>
    )
}