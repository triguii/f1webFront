'use client'

import styles from "./page.module.css";
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";


export default function Home() {

  const router = useRouter()

  useEffect(() => {
    router.push('/alovet/1')
  }, [])


  return (
    <main className={styles.main}>
    </main>
  );
}
