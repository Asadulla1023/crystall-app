import Link from 'next/link'
import React, { useState } from 'react'
import styles from "@/styles/utils/scrollTop.module.css"
const ScrollTop = () => {
    const [over, setOver] = useState(false)
    return (
        <div className={styles.chevron}>
            <Link href="#home">
                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_iconCarrier"> 
                    <path d="M6 15L12 9L18 15M12 15H12.01" stroke={"#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                    </g>
                </svg>
            </Link>
        </div>
    )
}

export default ScrollTop