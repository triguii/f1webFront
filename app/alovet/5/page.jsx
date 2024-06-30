'use client'

import { React, useEffect, useState } from "react"
import { Select, MenuItem, Checkbox, ListItemText, Switch } from "@mui/material";
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
    const [checked, setChecked] = useState(true);

    const handleChangeSwitch = (event) => {
        setChecked(event.target.checked);
    };

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


    useEffect(() => {

        setLapsData([])

        pilots.map(pilot => {
            fetch("https://flask-api-lake.vercel.app/api/getRaceTimes/" + raceId + "/" + pilotsObject[pilot])
                .then((response) => response.json())
                .then((data) => {

                    let datatoadd = []

                    data.forEach(element => {

                        element['Tiempo sec'] = (element['Tiempo ms'] / 1000)
                        datatoadd.push(element)

                    })

                    setLapsData(lapsData => [...lapsData, datatoadd])

                })

        })
    }, [pilots])


    const pilotsObject = getName2Id()

    return (
        lapsData && standingsData ?
        <>
        <div id="background" style={{backgroundImage: `url(/bgf4.jpg)`}}></div>
            <article style={{ textAlign: 'center', marginLeft: '2rem', marginRight: '2rem' }}>
                <ArrowBackIos sx={{ position: 'fixed', left: '2rem', float: 'right', cursor: 'pointer', marginBottom: '1rem' }} onClick={() => {
                    router.push('/alovet/4')
                }} />
                <ArrowForwardIos sx={{ position: 'fixed', right: '2rem', float: 'left', cursor: 'pointer' }} onClick={() => {
                    router.push('/alovet/6')
                }} />
                <h1 style={{ textAlign: 'center', fontSize: '40px' }}>Abu Dhabi 2010: La cursa final</h1>
                <p style={{ color: "#121f45", fontSize: '25px', fontWeight: 'bold' }}> Amb la classificació terminada, 4 pilots van lluitar per proclamar-se campions del món la nit del 14 de novembre de 2010: Fernando Alonso, Mark Webber, Sebastian Vettel i Lewis Hamilton <br /></p>
                <p style={{ color: "#121f45", fontSize: '25px' }}> Ferrari i Alonso, els favorits a guanyar. Sortia tercer en un circuit famós per lo complicat que és avançar. Si mantenia aquesta posició tota la cursa, l'únic que podria guanyar el mundial seria Webber si acabava primer.</p>
                <p style={{ color: "#121f45", fontSize: '25px' }}> Webber, però, sortia cinqué, mentre el seu company d'equip Vettel aconseguia la pole. Tot i que guanyés Vettel la cursa, Alonso hauria de quedar sisé o pitjor per a guanyar el campionat. És per això que Ferrari van fixar la seva prioritat en quedar per sobre de Webber, creient que Vettel no seria un problema</p>
                <p style={{ color: "#121f45", fontSize: '25px' }}> Hamilton matemàticament també era candidat a guanyar el campionat, però per tal que es dones aquest cas habia de quedar primer obligatoriament, Alonso habia de quedar fora dels 10 primers, Webber no podia quedar millor que sisé i Vettel habia d'estar fora del podi.</p>
                <br />
                <p style={{ color: "#121f45", fontSize: '25px' }}> El campionat de constructors no estava tan lluitat: Redbull ja era el campió abans de la cursa. El segon lloc estaba disputat entre Mclaren, l'equip de Hamilton i Button, i 32 punts per darrere Ferrari, amb Alonso i Massa. Tot i que encara era possible que Ferrari quedés segon, les possibilitats eren molt petites tenint en compte que Hamilton sortia segon, Button quart i Massa sisé.</p>
                <p style={{ color: "#121f45", fontSize: '25px' }}> Molts analistes i aficionats van utilitzar aquestes dades per aclamar la gran temporada de Alonso, ja que dels 389 punts que tenia Ferrari, 246 eren seus: 100 punts més que el seu company d'equip Massa, qui no es trobava ni entre els 5 millors pilots de la classificació. </p>

                <hr style={{ height: '3px', boxShadow: '2', backgroundColor: 'black', marginBottom: '2rem' }} />




                <div style={{ margin: 'auto', color: "#121f45", fontSize: '20px', display: 'inline-block', justifyContent: 'center' }}>
                    <p style={{ color: "#121f45", fontSize: '20px' }}> Utilitza aquest menú per a seleccionar els pilots a visualitzar: </p>


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

                    <h2 style={{ fontSize: '30px' }}>Evolució dels temps de volta al llarg de la cursa</h2>
                    <h4 style={{ fontWeight: 'normal' }}>Els outliers es deben a parades a boxes o cotxes de seguretat. Si vols eliminar-los, desactiva aquest control:</h4>
                    <Switch
                        checked={checked}
                        onChange={handleChangeSwitch}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />

                    <ScatterTiempos graphsData={lapsData} outliers={checked} />
                </div>

                <p style={{ color: "#121f45", fontSize: '25px' }}> Un accident en la primera volta va provocar la sortida del Safety Car, que va provocar que 6 pilots prenguessin la decisió de parar a boxs per tal d'intentar estalviar el temps de parar sota una situació normal. Aquest pilots van posar pneumàtic durs per tal d'intentar aguantar tota la resta de la cursa.  </p>
                <p style={{ color: "#121f45", fontSize: '25px' }}> Webber va parar no molt després, a la volta 11 . Ferrari, buscant que Webber no quedés per sobre de Fernando, van decidir fer parar a Alonso poc després, a la volta 15. Aquesta estrategia els hi va funcionar, i Alonso va sortir una posició endevant de Webber, però en la posició 12 per darrere de Petrov, uns dels 6 pilots que va parar a la primera volta.</p>
                <p style={{ color: "#121f45", fontSize: '25px' }}> Degut al circuit, Alonso va tenir moltes complicacions per avançar a Petrov, i si volia assegurar el campionat ho habia de fer, ja que una primera posició de Vettel li feia perdre. Per desgràcia, Alonso va ser incapaç de avançar al Renault de Petrov en tota la cursa, i Vettel va poder mantenir la primera posició gràcies a la seva parada més
                    tardà, ja que va acumular un avantatge considerable de temps respecte a la resta de pilots.</p>

                <div style={{ margin: 'auto', color: "#121f45", fontSize: '20px', display: 'inline-block', justifyContent: 'center' }}>
                    <p style={{ color: "#121f45", fontSize: '20px' }}> Aqui es pot observar l'evolució de les posicions dels pilots al llarg de la cursa </p>


                    <h4>Evolució de les posicions al llarg de la cursa</h4>
                    <RacePosition graphsData={lapsData} />

                </div>

                <hr style={{ height: '3px', boxShadow: '2', backgroundColor: 'black', marginBottom: '2rem' }} />

                <div>

                    <p style={{ color: "#121f45", fontSize: '20px' }}> Aquests van ser els resultats finals de la cursa, que van consolidar a Sebastian Vettel com a campió del món; el més jove de la historia fins aquell moment. Curiosament, Fernando Alonso era el pilot que tenia el títol de pilot més jove en ser campió del món fins aquell moment.</p>

                    <div style={{ display: 'inline-block', marginRight: '10rem', verticalAlign: 'middle' }}>
                    <RaceStandingsTable standingsData={standingsData} />
                    </div>
                    <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>

                    <img src={"/alovet/vettel-celebrates-victory-in-abu-dhabi.avif"} style={{ width: '1000px' }}></img>
                    </div>
                </div>





            </article></>
            : ''
    )
}