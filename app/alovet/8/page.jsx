'use client'

import { Slider, Switch } from '@mui/material';
import Standings2010 from "@/app/(components)/Standings2010"
import { useState, useEffect } from 'react';
import RaceStandingsTable from '@/app/(components)/RaceStandingsTable';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import ScatterTiempos from '@/app/(components)/ScatterTiempos';


import ScatterEquipos from '@/app/(components)/ScatterEquipos';

export default function alovetPage() {

    const handleChange = (event, newValue) => {
        setRound(newValue);
    };


    const handleChangeSwitch = (event) => {
      setChecked(event.target.checked);
    };

    const [graphData, setGraphData] = useState(false)
    const [checked, setChecked] = useState(true);
    const [races, setRaces] = useState([880, 899])
    const [round, setRound] = useState(880)
    const [imageGanador, setImageGanador] = useState('')
    const [lapsData, setLapsData] = useState([])

    const pilots = ["4", "20"]

    useEffect(() => {
        setLapsData([])

        pilots.map(pilot => {
            fetch("https://flask-api-lake.vercel.app/api/getRaceTimes/" + round + "/" + pilot)
                .then((response) => response.json())
                .then((data) => {

                    let datatoadd = []

                    data.forEach(element => {

                        element['Tiempo sec'] = (element['Tiempo ms'] / 1000)
                        datatoadd.push(element)

                    })

                    datatoadd.sort((a, b) => {
                        
                        return a.Vuelta - b.Vuelta
                        
                    })

                    if (lapsData) {
                        setLapsData(lapsData => [...lapsData, datatoadd])
                    }
                    else {
                        setLapsData(datatoadd)
                    }

                })

        })

        fetch("https://flask-api-lake.vercel.app/api/getRaceResults/" + round)
            .then((response) => response.json())
            .then((data) => {

                data.sort((a, b) => {

                    return a['Posicion Mundial'] - b['Posicion Mundial']; // Ascending order


                    // To sort in descending order, use: return b.age - a.age;
                });

                setGraphData(data)
                setImageGanador(data.find((element) => element['Posicion Carrera'] == 1))


            })
    }, [round])


    const router = useRouter()

    const driverToTeam = { 'Hamilton': 'Mercedes', 'Button': 'Mclaren', 'Webber': 'Redbull', 'Vettel': 'Redbull', 'Alonso': 'Ferrari', 'Räikkönen' : 'Lotus', 'Rosberg' : 'Mercedes', 'Maldonado' : 'Williams' }

    const pathImg = "/alovet/" + imageGanador.Piloto + "_2010.jpg"




    return (
        graphData ?
        <>
            <div id="background" style={{backgroundImage: `url(/bgf3.jpg)`}}></div>
            <article style={{ textAlign: 'center', marginLeft: '2rem', marginRight: '2rem' }}>
                <ArrowBackIos sx={{ position: 'fixed', left: '2rem', float: 'right', cursor: 'pointer', marginBottom: '1rem' }} onClick={() => {
                    router.push('/alovet/7')
                }} />
                <ArrowForwardIos sx={{ position: 'fixed', right: '2rem', float: 'left', cursor: 'pointer' }} onClick={() => {
                    router.push('/alovet/9')
                }} />
                <h1 style={{ textAlign: 'center', fontSize: '40px' }}>Mundial de 2013 : Últim enfrontament</h1>
                <h2 style={{ fontSize: '30px' }}> Victoria final de Vettel </h2>

                <p style={{ color: "#121f45", fontSize: '25px', fontWeight: 'bold' }}> Tot i el subcampionat d'Alonso, 2013 va ser una temporada senzilla per al pilot alemany. També va suposar el primer any de Hamilton a Mercedes</p>
                <hr style={{ height: '3px', boxShadow: '2', backgroundColor: 'black', marginBottom: '2rem' }} />


                <h4 style={{ color: "#121f45", fontSize: '20px' }}> Fes ús d'aquest control per seleccionar quina cursa vols veure de la temporada i veure l'evolució</h4>

                <Slider
                    getAriaLabel={() => 'Ronda'}
                    value={round}
                    onChangeCommitted={handleChange}
                    marks
                    min={races[0]}
                    max={races[1]}
                    sx={{ width: '20rem', marginTop: '1rem', marginLeft: '3rem' }}
                />



                <h2>{graphData[0].name} (Ronda {graphData[0].ronda})</h2>
                <div>
                    <div style={{ display: 'inline-block', marginRight: '10rem', verticalAlign: 'middle' }}>

                        <img src={pathImg} style={{ width: '400px' }}></img>
                        <h2>{imageGanador.Piloto} i {driverToTeam[imageGanador.Piloto]} van aconseguir la victoria.</h2>
                    </div>
                    <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>

                        <h4>Resultados de la carrera</h4>

                        <RaceStandingsTable standingsData={graphData} />
                    </div>
                </div>
                <div style={{ margin: 'auto', color: "#121f45", fontSize: '20px', display: 'inline-block', justifyContent: 'center' }}>
                    <h4>Clasificació del mundial després de la cursa</h4>
                    <Standings2010 standingsData={graphData} />

                </div>

                <div style={{ margin: 'auto', color: "#121f45", fontSize: '20px', display: 'inline-block', justifyContent: 'center' }}>
                    <h4>En quant als diferents equips, així va ser com van quedar a la cursa</h4>
                    <ScatterEquipos graphsData={graphData} />


                </div>
                <div style={{ margin: 'auto', color: "#121f45", fontSize: '20px', display: 'inline-block', justifyContent: 'center' }}>
                    <h4>I els nostres dos protagonistes, aquí podem veure la seva evolució dels temps de les voltes al llarg de la cursa. </h4>
                    <h4 style={{fontWeight: 'normal'}}>Els outliers es deben a parades a boxes o cotxes de seguretat. Si vols eliminar-los, desactiva aquest control:</h4>
                    <Switch
                        checked={checked}
                        onChange={handleChangeSwitch}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />

    
                    <ScatterTiempos graphsData={lapsData} outliers={checked}/>

                </div>





            </article></> : ''
    )

}