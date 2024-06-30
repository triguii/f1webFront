'use client'

import ConstructorsTimeGraph from "@/app/(components)/ConstructorStandings"
import { useRouter } from 'next/navigation';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";



export default function alovetPage() {

  const router = useRouter()


  return (
    <>
    <div id="background" style={{backgroundImage: `url(/bgf2.jpg)`}}></div>
    <article style={{ textAlign: 'center', marginLeft: '2rem', marginRight: '2rem' }}>
      <ArrowBackIos sx={{ position: 'fixed', left: '2rem', float: 'right', cursor: 'pointer' }} onClick={() => {
        router.push('/alovet/1')
      }} />
      <ArrowForwardIos sx={{ position: 'fixed', right: '2rem', float: 'left', cursor: 'pointer' }} onClick={() => {
        router.push('/alovet/3')
      }} />

      <div>
        <h1 style={{ textAlign: 'center', fontSize: '40px' }}>Ferrari vs. Red Bull </h1>
        <h2> Els dos equips protagonistes</h2>
      </div>


      <div>
        <div style={{ display: 'inline-block', verticalAlign: 'middle', maxWidth: '40%', marginRight: '5rem' }}>

          <img src="\alovet\ferrari.png" style={{ width: '200px', height: '80px' }} />
          <h4 style={{ color: "#ff2800", fontSize: '30px' }}>Pilots de Ferrari per a 2010: <br />Fernando Alonso<br /> Felipe Massa</h4>
          <p style={{ color: "#ff2800", fontSize: '25px' }}>
                                            · 1829 Curses <br/> 
                                            · 4995 Punts <br/>
                                            · 211 Victories <br/>
                                            · 640 Podis <br/>
                                            · 4.45 Posició mitjana per cursa <br/>
                                            · 2.73 Punts per cursa <br/>


          </p>
          <p style={{ fontSize: '20px' }}>Equip amb molta historia que porta competint a la F1 desde el seu inici al 1950. Compta amb 16 campionats de constructors, sent l'últim a 2007.</p>
        </div>
        <div style={{ display: 'inline-block', verticalAlign: 'middle', maxWidth: '40%' }}>
          <img src="\alovet\redbull.png" style={{ width: '250px', height: '80px' }} />

          <h4 style={{ color: "#121f45", fontSize: '30px' }}>Pilots de Red Bull per a 2010: <br />Sebastian Vettel <br /> Mark Webber</h4>
          <p style={{ color: "#121f45", fontSize: '25px' }}>
                                            · 178 Curses <br/> 
                                            · 257 Punts <br/>
                                            · 6 Victories <br/>
                                            · 19 Podis <br/>
                                            · 8.41 Posició mitjana per cursa <br/>
                                            · 1.44 Punts per cursa <br/>


          </p>
          <p style={{ fontSize: '20px' }}>Equip jove format al 2005, després de la compra de l'escuderia Jaguar. Abans del 2010, nomès comptaven amb 6 victories, totes aconseguides al 2009, on van quedar sotscampions.</p>
        </div>
      </div>
      <hr style={{ height: '3px', boxShadow: '2', backgroundColor: 'black', marginBottom: '2rem' }} />

      <h4 style={{ fontSize: '25px', marginTop: '10rem' }}>Aquesta visualització permet comparar l'evolució i la trajectoria d'aquests dos equips, des del 1997 on es va crear Stewart Racing, equip que va ser comprat per Jaguar a l'any 2000. </h4>

      <ConstructorsTimeGraph />
    </article>
    </>


  )
}