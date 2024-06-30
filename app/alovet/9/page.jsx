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
    const [años, setAños] = useState([2010, 2013]);


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
        <>
            <div id="background" style={{backgroundImage: `url(/bgf5.jpg)`}}></div>
        <article style={{ textAlign: 'center', marginLeft: '2rem', marginRight: '2rem' }}>
            <ArrowBackIos sx={{ position: 'fixed', left: '2rem', float: 'right', cursor: 'pointer', marginBottom: '1rem' }} onClick={() => {
                router.push('/alovet/8')
            }} />

            <h1 style={{ textAlign: 'center', fontSize: '40px' }}>Alonso vs Vettel: 2010 - 2013</h1>
            <h2 style={{ fontSize: '30px' }}> Resum dels 4 anys </h2>

            <div>
                <div style={{ display: 'inline-block', marginRight: '10rem', verticalAlign: 'middle' }}>
                    <img src={"/alovet/vettel_2013.jpg"} style={{ width: '600px' }}></img>
                    <p style={{ color: "#121f45", fontSize: '25px' }}> 1326 punts (53.96% del seu equip)</p>
                    <p style={{ color: "#121f45", fontSize: '25px' }}> 34 victories (82.93% del seu equip)</p>
                    <p style={{ color: "#121f45", fontSize: '25px' }}> 53 podis (62.54% del seu equip)</p>
                    <p style={{ color: "#121f45", fontSize: '25px' }}> Posició mitjana de classificació: 2.61 </p>
                    <p style={{ color: "#121f45", fontSize: '25px' }}> Posició mitjana de cursa: 2.80 </p>


                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>

                    <img src={"/alovet/alonso_2013.jpg"} style={{ width: '600px' }}></img>
                    <p style={{ color: "#ff2800", fontSize: '25px' }}> 1029 punts (67,48% del seu equip)</p>
                    <p style={{ color: "#ff2800", fontSize: '25px' }}> 11 victories (100% del seu equip)</p>
                    <p style={{ color: "#ff2800", fontSize: '25px' }}> 42 podis (84.00% del seu equip)</p>
                    <p style={{ color: "#ff2800", fontSize: '25px' }}> Posició mitjana de classificació: 5.62 </p>
                    <p style={{ color: "#ff2800", fontSize: '25px' }}> Posició mitjana de cursa: 3.83 </p>

                </div>


            </div>

            <p style={{ color: "#121f45", fontSize: '25px', fontWeight: 'bold' }}> La superioritat de Vettel va ser clara durant els 4 anys; al cap i a la fi, va ser el campió tots els cops. Tot i així, encara es recorda el gran esforç i la gran consistencia d'Alonso durant aquests anys.
                Els aficionats d'Alonso afirmaven inclós que si Alonso hagúes tingut un cotxe a la altura del Redbull, ell hauria sigut el campió indiscutible, i que el fet d'haver lluitat tant a prop 2 dels 4 mundials és un merit enorme degut al seu cotxe inferior.
                Al final si sumem tots els punts de tots els equips durant els 4 anys, és cert que els 2204 punts de Redbull són molt superiors als 1525 de Ferrari. Una xifra molt propera al tercer lloc, els 1451 punts dels Mclaren. Alonso va quedar molt per sobre del seu company, el brasileny Felipe Massa, un pilot
                que 5 anys enrere va quedar subcampió del mon, al 2008, a tan sols 1 punt de Hamilton.
            </p>

            <br />
            <br />
            <p style={{ color: "#121f45", fontSize: '25px', fontWeight: 'bold' }}> Així que qui té rao? Realment va ser Vettel un pilot tan superior a Alonso? O Alonso simplement va tenir mala sort amb el seu cotxe? És molt dificil donar una resposta clara.
                Per sort o per desgràcia, la Fórmula 1 històricament ha sigut sempre un esport de cotxes abans que pilots, així que pot ser aquesta pregunta no és tan important, i pot ser nomès ens hem d'alegrar d'haver sigut testimonis d'aquesta marevellosa competició entre dos grans esportistes.
            </p>

            <hr style={{ height: '3px', boxShadow: '2', backgroundColor: 'black', marginBottom: '2rem' }} />
            <div>

            <h4 style={{ color: "#121f45", fontSize: '20px' }}> Fes ús d'aquest control per seleccionar quina rang d'anys vols veure a les visualitzacions</h4>
            <Slider
                getAriaLabel={() => 'Año'}
                value={años}
                onChangeCommitted={handleChange}
                valueLabelDisplay="auto"
                min={2010}
                max={2013}
                sx={{ width: '10rem' }}
            />
            </div>
            <div>

                <div style={{ margin: 'auto', color: "#121f45", fontSize: '20px', display: 'inline-block', justifyContent: 'center' }}>

                    <h4>Distribució de las posiciones aconseguides durants els anys</h4>
                    <VictoryBar graphsData={graphsData} />

                </div>

                <div style={{ margin: 'auto', color: "#121f45", fontSize: '20px', display: 'inline-block', justifyContent: 'center' }}>

                    <h4>Diferencia de temps en la millor volta de cada cursa</h4>
                    <TimeDiffBar graphsData={graphsData} />

                </div>
            </div>
        </article></>

    )

}