'use client'


import { React, useEffect, useState } from "react"
import QualyPlot from "@/app/(components)/QualyPlot"
import { Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import Standings2010 from "@/app/(components)/Standings2010";
import getName2Id from "@/config/name2id";



export default function alovetPage() {

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

    const pilotsObject = getName2Id()

    useEffect(() => {

        fetch("https://flask-api-lake.vercel.app/api/getRaceResults/354")
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


    return (filteredGraphData ?
        <>
        <div id="background" style={{backgroundImage: `url(/bgf1.jpg)`}}></div>
        <article style={{ textAlign: 'center', marginLeft: '2rem', marginRight: '2rem' }}>
            <ArrowBackIos sx={{ position: 'fixed', left: '2rem', float: 'right', cursor: 'pointer', marginBottom: '1rem' }} onClick={() => {
                router.push('/alovet/3')
            }} />
            <ArrowForwardIos sx={{ position: 'fixed', right: '2rem', float: 'left', cursor: 'pointer' }} onClick={() => {
                router.push('/alovet/5')
            }} />
            <h1 style={{ textAlign: 'center', fontSize: '40px' }}>Abu Dhabi 2010: Pelea final por el mundial</h1>
            <h2 style={{ fontSize: '30px' }}> La lluita final per el campionat </h2>
            <p style={{ color: "#121f45", fontSize: '25px', fontWeight: 'bold' }}> L'última cursa de la temporada. Arribats a aquest punt, Alonso nomès tenia 6 punts d'avantatge respecte a Vettel. Per referencia, la distribució de punts d'aquesta cursa era la següent : <br /></p>
            <p style={{ color: "#121f45", fontSize: '25px' }}>
                1º : 25 punts <br />
                2º : 18 punts <br />
                3º : 15 punts <br />
                4º : 12 punts <br />
                5º : 10 punts <br />
                6º : 8 punts <br />
                7º : 6 punts <br />
                8º : 4 punts <br />
                9º : 2 punts <br />
                10º : 1 punts <br />
            </p>
            <p style={{ color: "#121f45", fontSize: '25px', fontWeight: 'bold' }}>
                Degut a l'alta competitivitat al llarg de la temporada, arribats a aquesta última cursa, 4 pilots diferents tenien opcions de guanyar el campionat : Fernando Alonso, Sebastian Vettel, Mark Webber i Lewis Hamilton.
            </p>
            <div style={{ display: 'inline-block', marginRight: '10rem', verticalAlign: 'middle' }}>

                <Standings2010 standingsData={graphData} dataMin={false} />

            </div>

            <hr style={{ height: '3px', boxShadow: '2', backgroundColor: 'black', marginBottom: '2rem' }} />
            <p style={{ color: "#121f45", fontSize: '25px', fontWeight: 'bold' }}>
                Degut a tot el que estaba en joc en aquesta cursa, les sessions de classificació d'aquesta van ser molt importants, en gran part degut a la dificultat d'avançar en aquest circuit durant la cursa. Sortir en una bona posició era importantisim.
            </p>
            <p style={{ color: "#121f45", fontSize: '25px', textAlign:'left' }}>
                Pots utilitzar aquest desplegable per comparar els temps de classificació de tots els pilots de la cursa.
            </p>
            <div>
                <div style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '10rem' }}>

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


                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>

                    <QualyPlot pilots={pilots} pilotsObject={pilotsObject} />

                </div>
            </div>








        </article></>
        : ''
    )
}