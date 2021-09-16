import Head from 'next/head'
import styles from '../../styles/Home.module.css'

export default function Container({ children }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Weather App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main id="page-content" className={styles.main}>{ children }</main>
			{/* <Footer /> */}
		</div>
	)
}
