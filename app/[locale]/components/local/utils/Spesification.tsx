import React, { useEffect, useRef } from 'react'
import styles from "@/styles/utils/spesification.module.css"
import Container from './Container'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

interface Specifics {
    isOpen: boolean
    setIsOpen: Function
}

const Spesification = ({ isOpen, setIsOpen }: Specifics) => {
    const t = useTranslations("Spesifications")
    useEffect(() => {
        if (isOpen === true) {
            document.body.style.overflow = "hidden"
        }
        else {
            document.body.style.overflowY = "scroll"
            document.body.style.overflowX = "hidden"
        }
    }, [isOpen])
    const valueRef = useRef<any>()
    const valueRef1 = useRef<any>()
    const valueRef2 = useRef<any>()
    const valueRef3 = useRef<any>()
    const valueRef4 = useRef<any>()
    const valueRef5 = useRef<any>()
    const valueRef6 = useRef<any>()
    const valueRef7 = useRef<any>()
    const valueRef8 = useRef<any>()
    const valueRef9 = useRef<any>()
    const valueRef10 = useRef<any>()
    const valueRef11 = useRef<any>()
    const valueRef12 = useRef<any>()
    const valueRef13 = useRef<any>()
    const valueRef14 = useRef<any>()
    const { push, refresh } = useRouter()
    const sendMessages = (e: React.FormEvent<HTMLFormElement> | any): void => {
        e.preventDefault()
        const data = new FormData(e.target)
        const obj = Object.fromEntries(data.entries())
        const msg = `Nonlinear optical crystal: ${obj.ktp} %0ADimensions of the optical elemen: ${obj.dimension}%0AOrientation: ${obj.orient}%0AType phase matching: ${obj.phase}%0ALasing wavelength, nm: ${obj.wavelength}%0AType of coating: ${obj.coating}%0AQuantity, pcs: ${obj.quantity}%0ADimensional tolerance: ${obj.dimension}%0AFlatness: ${obj.flatness}%0AParallelism, arcsec: ${obj.arcsec}%0APerpendicularity, arcmin: ${obj.arcmin}%0ASize of the chamfers: ${obj.chamfers}%0AOptical surface quality: ${obj.scratch}%0AAdditional text: ${obj.additional}%0AUser email: ${obj.email}`
        axios({
            method: "post",
            url: `https://api.telegram.org/bot6506618725:AAGvO9uS8jVGzNq5vZnfMaM2eIrJgymJ2t8/sendMessage?chat_id=-1002032821157&text=${msg}`,
        })
        setIsOpen(false)
        valueRef.current.value = ""
        valueRef1.current.value = ""
        valueRef2.current.value = ""
        valueRef3.current.value = ""
        valueRef4.current.value = ""
        valueRef5.current.value = ""
        valueRef6.current.value = ""
        valueRef7.current.value = ""
        valueRef8.current.value = ""
        valueRef9.current.value = ""
        valueRef10.current.value = ""
        valueRef11.current.value = ""
        valueRef12.current.value = ""
        valueRef13.current.value = ""
        valueRef14.current.value = ""
    }

    const path = usePathname()
    return (
        <div className={isOpen == true ? styles.spesification : styles.hidden}>
            <div className={styles.container}>
                <Container>
                    <div className={styles.content}>
                        <h1>{t("title")}</h1>
                        <form onSubmit={sendMessages} action="" className={styles.formFill}>
                            <div className={styles.information}>
                                <div className={styles.queue}>№</div>
                                <div className={styles.options}>Options</div>
                                <div className={styles.values}>Values (To type)</div>
                                <div className={styles.values}>Values</div>
                            </div>
                            <div className={styles.information}>
                                <div className={styles.queue}>1.</div>
                                <div className={styles.options}>Nonlinear optical crystal</div>
                                <div className={styles.values}>
                                    <input type="text" ref={valueRef} placeholder="Type value" required name='ktp' />
                                </div>
                                <div className={styles.values}>KTP</div>
                            </div>
                            <div className={styles.information}>
                                <div className={styles.queue}>2.</div>
                                <div className={styles.options}>Dimensions of the optical element, mm³ (* - crystal length)</div>
                                <div className={styles.values}>
                                    <input type="text" ref={valueRef1} placeholder="Type value" required name='dimension' />
                                </div>
                                <div className={styles.values}>4x4x10*</div>
                            </div>
                            <div className={styles.information}>
                                <div className={styles.queue}>3.</div>
                                <div className={styles.options}>Orientation</div>
                                <div className={styles.values}>
                                    <input type="text" ref={valueRef2} placeholder="Type value" required name='orient' />
                                </div>
                                <div className={styles.values}>X cut</div>
                            </div>
                            <div className={styles.information}>
                                <div className={styles.queue}>4.</div>
                                <div className={styles.options}>Type phase matching</div>
                                <div className={styles.values}>
                                    <input type="text" ref={valueRef3} placeholder="Type value" required name='phase' />
                                </div>
                                <div className={styles.values}>ㅤ</div>
                            </div>
                            <div className={styles.information}>
                                <div className={styles.queue}>5.</div>
                                <div className={styles.options}>Lasing wavelength, nm</div>
                                <div className={styles.values}>
                                    <input type="text" ref={valueRef4} placeholder="Type value" required name='wavelength' />
                                </div>
                                <div className={styles.values}>1320 nm</div>
                            </div>
                            <div className={styles.information}>
                                <div className={styles.queue}>6.</div>
                                <div className={styles.options}>Type of coating (specify wavelengths of antireflection and reflection coefficients)</div>
                                <div className={styles.values}>
                                    <input type="text" ref={valueRef5} placeholder="Type value" required name='coating' />
                                </div>
                                <div className={styles.values}>AR/AR@ 1320+1064
                                    @1064  R{"<"}1%
                                    @1320  R{"<"}0,15</div>
                            </div>
                            <div className={styles.information}>
                                <div className={styles.queue}>7.</div>
                                <div className={styles.options}>Quantity, pcs.</div>
                                <div className={styles.values}>
                                    <input type="text" ref={valueRef6} placeholder="Type value" required name='quantity' />
                                </div>
                                <div className={styles.values}>8</div>
                            </div>
                            <div className={styles.information}>
                                <div className={styles.queue}>8.</div>
                                <div className={styles.options}>Dimensional tolerance (aperture), mm <br />Dimensional tolerance (length), mm</div>
                                <div className={styles.values}>
                                    <input type="text" ref={valueRef7} placeholder="Type value" required name='tolerance' />
                                </div>
                                <div className={styles.values}>+0,1 ÷ 0,0 <br />+0,5 ÷ 0,0</div>
                            </div>
                            <div className={styles.information}>
                                <div className={styles.queue}>9.</div>
                                <div className={styles.options}>Flatness (at =633nm)</div>
                                <div className={styles.values}>
                                    <input type="text" ref={valueRef8} placeholder="Type value" required name='flatness' />
                                </div>
                                <div className={styles.values}>/6</div>
                            </div>
                            <div className={styles.information}>
                                <div className={styles.queue}>10.</div>
                                <div className={styles.options}>Parallelism, arcsec</div>
                                <div className={styles.values}>
                                    <input type="text" ref={valueRef9} placeholder="Type value" required name='arcsec' />
                                </div>
                                <div className={styles.values}>10</div>
                            </div>
                            <div className={styles.information}>
                                <div className={styles.queue}>11.</div>
                                <div className={styles.options}>Perpendicularity, arcmin</div>
                                <div className={styles.values}>
                                    <input type="text" ref={valueRef10} placeholder="Type value" required name='arcmin' />
                                </div>
                                <div className={styles.values}>15</div>
                            </div>
                            <div className={styles.information}>
                                <div className={styles.queue}>12.</div>
                                <div className={styles.options}>The size of the chamfers along the aperture and on the side surfaces</div>
                                <div className={styles.values}>
                                    <input type="text" ref={valueRef11} placeholder="Type value" required name='chamfers' />
                                </div>
                                <div className={styles.values}>0,3x45</div>
                            </div>
                            <div className={styles.information}>
                                <div className={styles.queue}>13.</div>
                                <div className={styles.options}>Optical surface quality, scratch/dig</div>
                                <div className={styles.values}>
                                    <input type="text" ref={valueRef12} placeholder="Type value" required name='scratch' />
                                </div>
                                <div className={styles.values}>10/5</div>
                            </div>
                            <div className={styles.additional}>
                                <h3>{t("subtitle")}</h3>
                                <textarea ref={valueRef13} placeholder={t("additional")} required name='additional' />
                                <h3>{t("email")}</h3>
                                <input type="email" ref={valueRef14} name='email' required placeholder='example@mail.com' />
                                <button>{path == "/uz" ? "Jo'natish" : "Submit"}</button>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
            <div className={styles.bg} onClick={() => {
                setIsOpen(false)
            }}></div>
        </div>
    )
}

export default Spesification