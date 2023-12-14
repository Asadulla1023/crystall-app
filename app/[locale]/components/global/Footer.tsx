"use client"
import React from 'react'
import styles from "@/styles/utils/footer.module.css"
import Container from '../local/utils/Container'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.navigator}>
                    <Link href={"/"} className={styles.logo}>
                        <Image src={"/icons/logo.svg"} width={20} height={20} alt='logo' />
                    </Link>
                    <Link className={styles.contacts} href={"tel: +998 91 554 80 31"}>+998 91 554 80 31</Link>
                    <Link href={"mailto:SUNSIMURGCRYSTALS@gmail.com"}>SUNSIMURGCRYSTALS@gmail.com</Link>
                    <h4>Uzbekistan, Tashkent city, Katartal street 60</h4>
                </div>
                <div className={styles.madeWith}>
                    <h4>Website creation and development - studio <Link target='_blank' href={"https://www.empire-soft.net/"}>Empire-soft.net</Link></h4>
                </div>
            </div>
        </footer>
    )
}

export default Footer