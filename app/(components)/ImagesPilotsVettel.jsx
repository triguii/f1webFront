import styles from '@/app/page.module.css'

export default function ImagesPilotsVettel (){
    return (

        <div class={styles.imageContainer} style={{float: 'right'}}>
            <img src="\alovet\vet2009.jpg" style={{width: '250px',  height: '350px'}}/>
            <div className={styles.tooltip}>
                <h1 style={{color: 'white'}}>Sebastian Vettel</h1>
                <h4 style={{color: 'white'}}>· 23 Años <br/> 
                                            · 43 Carreras <br/> 
                                            · 125 Puntos <br/>
                                            · 9 Podios <br/>
                                            · 4 Victorias <br/>
                                            · 2o Puesto en 2009 <br/>
                                            </h4>
            </div>

        </div>
   
     )
}