import React from 'react'
import styles from "@/styles/404/404.module.css"
import Link from 'next/link'
import Image from 'next/image'
const Page = () => {
    return (
        <div className={styles.pageNotFound}>
            <h1>Page not found - 404</h1>
            <Link href={"/"} style={{
                fontSize: 28,
                marginTop: 40,
                textDecoration: "underline"
            }}>Go back to home</Link>
            <Image src={"/images/404.jpg"} className={styles.backgroundImage} alt='background image for 404' height={2160} width={3840}/>
        </div>
    )
}

export default Page