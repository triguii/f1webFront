import styles from '@/app/page.module.css'


export default function ImagesPilotsAlonso (){
    return (

        <div class={styles.imageContainer} style={{float: 'left'}}>
            <img src="\alovet\alo2009.jpg" style={{width: '250px',  height: '350px'}}/>
            <div className={styles.tooltip}>
                <h1 style={{color: 'white'}}>Fernando Alonso</h1>
                <h4 style={{color: 'white'}}>· 29 Años <br/>
                                            · 140 Carreras <br/>
                                            · 577 Puntos <br/>
                                            · 53 Podios <br/>
                                            · 21 Victorias <br/>
                                            · 2 Mundiales de pilotos <br/>
                                            · 9o Puesto en 2009 <br/>
                                            </h4>
            </div>

        </div>
   
     )
}

