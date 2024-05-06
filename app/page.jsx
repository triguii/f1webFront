'use client'

import styles from "./page.module.css";
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';


export default function Home() {

  const router = useRouter()

  return (
    <main className={styles.main}>
      <Button variant= 'contained' onClick={() => {
          router.push('/alovet/1')
      }}>
        Fernando Alonso vs Vettel (2010 - 2013)
      </Button>
    </main>
  );
}
