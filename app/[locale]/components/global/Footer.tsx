"use client"
import React from 'react'
import styles from "@/styles/utils/footer.module.css"
import Container from '../local/utils/Container'
import Link from 'next/link'
import Image from 'next/image'
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.content}>
                    <div className={styles.navigator}>
                        <Link href={"/"} className={styles.logo}>
                            <Image src={"/icons/logo.svg"} width={20} height={20} alt='logo' />
                        </Link>
                        <ul className={styles.navList}>
                            <li>
                                <Link href={"#aboutUs"}>Contacts</Link>
                            </li>
                            <li>
                                <Link href={"#"}>About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <Link href={"tel: +7(903)156-56-11"}>+7(903)156-56-11</Link>
                    <div className={styles.madeWith}>
                        <h4>Copyright ⓒ 2019 - 2023  Кристаллы Сибири</h4>
                        <h4>Создание, разработка сайта - студия <Link href={"https://www.empire-soft.net/"}>Empire-soft.net</Link></h4>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer