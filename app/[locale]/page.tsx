"use client"
import { useTranslations } from 'next-intl';
import styles from "@/styles/home/index.module.css"
import Container from './components/local/utils/Container';
import Image from 'next/image';
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimation
} from 'framer-motion';
import Link from 'next/link';

import { useInView } from 'react-intersection-observer';
import Footer from './components/global/Footer';
import { usePathname, useRouter } from 'next/navigation';
import Spesification from './components/local/utils/Spesification';
import axios from 'axios';
import ScrollTop from './components/local/utils/ScrollTop';


export default function Index() {
  const entrance = useTranslations("Entrance")
  const pathname = usePathname()
  const { push } = useRouter()
  const other = useTranslations("OtherPr")
  const [isOpen, setIsOpen] = useState(false)
  const handleSendTelegram = (e: {
    preventDefault: () => void,
    target: any
  }) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const obj = Object.fromEntries(data.entries())
    console.log(obj);
    const msg = `Customer Application: ${obj.additional}%0ACustomer Email: ${obj.email}`
    axios({
      method: "post",
      url: `https://api.telegram.org/bot6506618725:AAGvO9uS8jVGzNq5vZnfMaM2eIrJgymJ2t8/sendMessage?chat_id=-1002032821157&text=${msg}`,
    })
    vRef.current.value = ""
    bRef.current.value = ""
  }

  const vRef = useRef<any>()
  const bRef = useRef<any>()
  return (
    <>
      <Spesification isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className={styles.main}>
        <div id='home' className={styles.entrance}>
          <Image src={"/images/bgImage.png"} alt='bg image' width={1920} height={1080} />
          <Container>
            <div className={styles.contentContainer}>
              <motion.div initial={"onLoad"} animate="entrance" variants={{
                onLoad: {
                  opacity: 0
                },
                entrance: {
                  opacity: 1
                }
              }} className={styles.content}>
                <motion.h1 initial="hidden" animate="visible" variants={{
                  hidden: {
                    scale: .8,
                    opacity: 0
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: .2
                    }
                  },
                }}>Sun Simurg</motion.h1>
                <h3>crystals</h3>
              </motion.div>
              <div className={styles.content}>
                <div className={styles.info}>
                  <p>{entrance("info")}</p>
                </div>
                <div className={styles.products}>
                  <ul>
                    <li>
                      <Link href="#" onClick={(e: {
                        preventDefault: () => void
                      }) => {
                        e.preventDefault()
                      }} >{entrance("products")}</Link>
                    </li>
                    <li>
                      <Link href="#lbo">LBO</Link>
                    </li>
                    <li>
                      <Link href="#bbo">BBO</Link>
                    </li>
                    <li>
                      <Link href="#ktp">KTP</Link>
                    </li>
                    <li>
                      <Link href="#kgw">KGW/KYW</Link>
                    </li>
                    <li>
                      <Link href="#other_pr">{entrance("others")}</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div id='products' className={`${styles.entrance} ${styles.productsInformations}`}>
          {pathname === "/uz" ? UZ_PRODUCTS.map((e, index) => {
            return <Product title2={e.title2} subtitle={e.subtitle} route={e.route} setIsOpen={setIsOpen} isOpen={isOpen} specifications={e.specifications} Application={e.Applications} advantages={e.advantages} images={e.images} title={e.title} key={Math.random() + `${e.title}`} id={index + 1} />
          }) : products.map((e, index) => {
            return <Product title2={e.title2} subtitle={e.subtitle} route={e.route} setIsOpen={setIsOpen} isOpen={isOpen} specifications={e.specifications} Application={e.Applications} advantages={e.advantages} images={e.images} title={e.title} key={Math.random() + `${e.title}`} id={index + 1} />
          })}
        </div>
        <div id='other_pr' className={`${styles.entrance} ${styles.productsInformations} ${styles.otherPr}`}>
          <Container>
            <section
              className={styles.product}>
              <motion.div initial="hidden" animate="visible"
                variants={{
                  visible: {
                    opacity: 1,
                    transitionDuration: "1s",
                  },
                  hidden: {
                    opacity: 0,
                    transitionDuration: "1s",
                  }
                }}>
                <div className={styles.infoTop}>
                  <motion.h2 style={{
                    textTransform: "none"
                  }} className="h2">{pathname === "/uz" ? "Boshqa maxsulotlat" : "Other products"}</motion.h2>
                </div>
                <div className={styles.detailss}>
                  <div className={styles.advantagesWrapper}>
                    {pathname === "/uz" ? other_products_uz.map(e => {
                      return <div key={e} className={styles.advantage}>
                        <Image src={"/icons/shape.svg"} alt='shape icon' width={15} height={15} />
                        <h3>{e}</h3>
                      </div>
                    }) : other_products.map(e => {
                      return <div key={e} className={styles.advantage}>
                        <Image src={"/icons/shape.svg"} alt='shape icon' width={15} height={15} />
                        <h3>{e}</h3>
                      </div>
                    })}
                  </div>
                  <Image src={"/images/pink3.JPG"} alt='image' width={700} height={400} />
                </div>
                <form onSubmit={handleSendTelegram} className={styles.additional}>
                  <h3>{other("subtitle")}</h3>
                  <textarea ref={bRef} placeholder={pathname === "/uz" ? "To'ldiring..." : "Type here..."} required name='additional' />
                  <h3>{other("email")}</h3>
                  <input ref={vRef} type="email" name='email' required placeholder='example@mail.com' />
                  <button>{pathname == "/uz" ? "Jo'natish" : other("submit")}</button>
                </form>
              </motion.div>
            </section>
          </Container>
        </div>
        <AboutSection />
        <Contact />
      </main>
      <ScrollTop />
    </>
  )
}

function Product({ id, title, advantages, images, route, specifications, Application, setIsOpen, isOpen, title2, subtitle }: {
  id: number
  title: string
  title2?: string
  subtitle?: string
  advantages: string[]
  images: string[],
  route: string,
  specifications: any,
  Application: any,
  setIsOpen: Function
  isOpen: boolean
}) {
  const [ref, inView] = useInView({
    triggerOnce: true
  });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  const pathname = usePathname()
  return (
    <Container>
      <section
        id={route.toLocaleLowerCase()}
        ref={ref} className={styles.product}>
        <motion.div initial="hidden"
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              transitionDuration: "1s",
            },
            hidden: {
              opacity: 0,
              transitionDuration: "1s",
            }
          }} >
          <div className={styles.infoTop}>
            <motion.h2 className="h2" style={{
              textTransform: "none"
            }}>{title}</motion.h2>
            {title2 && <motion.h2 className="h2" style={{
              textTransform: "capitalize"
            }}>{title2}</motion.h2>}
            {subtitle && <motion.h2 className="h2" style={{
              textTransform: "capitalize",
              fontSize: 16,
              color: "#fff",
              fontWeight: "400"
            }}>{subtitle}</motion.h2>}
          </div>
          <div className={styles.productInformation}>
            <div className={styles.productSection}>
              <div className={styles.productAdvantages}>
                <Image src={images[0]} width={800} height={850} alt='Some image' />
                <h3>{pathname === "/uz" ? "Afzalliklar" : "Advantages"}</h3>
                <div className={styles.advantagesWrapper}>
                  {advantages.map(e => {
                    return <div key={e} className={styles.advantage}>
                      <Image src={"/icons/shape.svg"} alt='shape icon' width={15} height={15} />
                      <h3>{e}</h3>
                    </div>
                  })}
                </div>
              </div>
            </div>
            <div className={styles.productSection}>
              <h2>{pathname === "/uz" ? "Texnik Xususiyatlari" : "Specifications"}</h2>
              <div className={styles.productSpesics}>
                {specifications?.absor &&
                  <>
                    <h4>{specifications.absor.title}</h4>
                    <div className={styles.productsArray}>
                      {specifications.absor.array.map((e: string) => {
                        return <p key={e}>{e}</p>
                      })}
                    </div>
                  </>}
                {specifications?.bubble && <>
                  <div className={styles.productsArray}>
                    <h4>{specifications.bubble.title}</h4>
                    <p>{specifications.bubble.value}</p>
                  </div>
                </>}
                {specifications?.orient && <>
                  <div className={styles.productsArrayOrient}>
                    <h4>{specifications.orient.title}</h4>
                    <p>{specifications.orient.value}</p>
                  </div>
                </>}
                {specifications?.size && <>
                  <h4>{specifications.size.title} <span style={{
                    color: "#000",
                    fontWeight: "500"
                  }}>(Standard)</span></h4>
                  <div className={styles.productsArray}>
                    {specifications.size.array.map((e: string) => {
                      return <p key={e}>{e}</p>
                    })}
                  </div>
                  <div className={styles.productsArray}>
                    {specifications.size.array2.map((e: string) => {
                      return <p key={e}>{e}</p>
                    })}
                  </div>
                </>}
                {specifications?.capabe && <>
                  <h4>{specifications.capabe.title}</h4>
                  <div className={styles.productsArrayCapabe}>
                    {specifications.capabe.array.map((e: string) => {
                      return <p key={e}>{e}</p>
                    })}
                  </div>
                </>}
              </div>
              <p style={{
                color: "#000"
              }}>{pathname === "/uz" ? "Maxsus o'lchamlar so'rov bo'yicha mavjud" : "Custom sizes available On request"}</p>
              <div className={styles.awd}>
                <div className={styles.awds}>
                  <h4 style={{
                    opacity: 0
                  }}>wefuwhefiu</h4>
                  <p>Standard</p>
                  <p>{ pathname ==="/uz" ? "Ixtiyoriy" :"Optional"}</p>
                </div>
                {specifications.awd.map((e: any) => {
                  return <div key={e} className={styles.awds}>
                    <h4>{e.title} <span>({e.sub})</span></h4>
                    <p>{e.standard}</p>
                    <p>{e.Optional}</p>
                  </div>
                })}
              </div>
            </div>
            <div className={styles.productSection}>
              <h2>{pathname === "/uz" ? "Ilovalar" : "Applications"}</h2>
              <div style={{
                marginTop: 16
              }} className={styles.advantagesWrapper}>
                {Application.map((e: string) => {
                  return <div key={e} className={styles.advantage}>
                    <Image src={"/icons/shape.svg"} alt='shape icon' width={15} height={15} />
                    <h3>{e}</h3>
                  </div>
                })}
              </div>
              <button className={styles.fillForm} onClick={() => {
                setIsOpen(true)
              }}>{pathname === "/uz" ? "Xususiyatlar" : "Customer’s Specification"}</button>
            </div>
          </div>
        </motion.div>
      </section>
    </Container>
  );
}

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true
  });
  const controls = useAnimation();
  const company = useTranslations("Company")
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  return (
    <motion.section ref={ref} id='AboutUs' className={styles.about}>
      <Container>
        <motion.section initial="hidden" animate={controls}
          variants={{
            visible: {
              opacity: 1,
              transitionDuration: "1s",
            },
            hidden: {
              opacity: 0,
              transitionDuration: "1s",
            }
          }} className={styles.information}>
          <div className={styles.companyInformation}>
            <motion.h3 initial="hidden" animate="visible" variants={{
              hidden: {
                opacity: 0
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: .2
                }
              },
            }}>{company("title")} <motion.span initial={"onLoad"} animate="entrance" variants={{
              onLoad: {
                width: 0,
              },
              entrance: {
                width: "75%",
              }
            }} />
            </motion.h3>
            <div className={styles.title}>
              <motion.h1 initial="hidden" animate="visible" variants={{
                hidden: {
                  scale: .8,
                  opacity: 0
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: .2
                  }
                },
              }}>Sun simurg crystals</motion.h1>
              <div className={styles.shadow} />
            </div>
            <div className={styles.inform}>
              <div className={styles.leftSide}>
                <div className={styles.logoDesign}>
                  <Image src={"/images/collab.jpg"} alt='collab image' width={500} height={400} />
                </div>
              </div>
              <div className={styles.rightSide}>
                <p>{company("description")}
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </Container>
    </motion.section>
  )
}

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true
  });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  return (
    <motion.section ref={ref} id='contact' className={styles.contact}>
      <Container>
        <motion.section initial="hidden" animate={controls}
          variants={{
            visible: {
              opacity: 1,
              transitionDuration: "1s",
            },
            hidden: {
              opacity: 0,
              transitionDuration: "1s",
            }
          }} className={styles.information}>
          <div className={styles.companyInformation}>
            <div className={styles.inform}>
              <div className={styles.rightSide}>
                <Image src={"/images/contact.jpg"} width={530} height={300} alt='image' />
              </div>
              <Footer />
            </div>
          </div>
        </motion.section>
      </Container>
    </motion.section>
  )
}

const products = [
  {
    title: "Lithium Triborate (LiB₃O₅ or LBO)",
    advantages: ["Broad Transparency Range From 0.160µm To 2.6µm (SHG Range From 0.55µm To 2.6µm)", "Type I And Type II Non-Critical Phase-Matching (NCPM) Over A Wide Wavelength Range", "Relatively Large Effective SHG Coefficient (About Three Times Larger Than That Of KDP)", "High Damage Threshold (> 10 GW/cm² For 10ns Laser At 1.054µm)", "Wide Acceptance Angle And Small Walk-Off", "High Optical Quality (Homogeneity Δn 10⁴/cm)"],
    images: ["/images/lib.jpg"],
    route: "lbo",
    specifications: {
      absor: {
        title: "Absorption Losses",
        array: ["1/cm, at", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Bubbles, Inclusions, etc.",
        value: "None"
      },
      orient: {
        title: "Orientation",
        value: "Depends On Application"
      },
      size: {
        title: "Sizes, mm³",
        array: ["3x3x5", "3x3x10", "3x3x14", "3x3x20", "4x4x12", "5x5x10", "5x5x15"],
        array2: ["10x10x15", "10x10x20", "20x20x10", "6x10x25", "7x7x1,0", "7x7x0,1"]
      },
      awd: [
        {
          title: "Allowance For Dimensions",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Accuracy Of Orientation",
          sub: "min. of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Optical Surface Quality",
          Optional: "5/2",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Flatness",
          Optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallelism",
          sub: "sec.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Perpendicularity",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        }
      ]
    },
    Applications: [
      "High Power Nd: YAG And Nd:YLF Lasers For R & D",
      "Ti:Sapphire, Alexandrite And Cr:LiSAF Lasers",
      "Medical And Industrial Nd: YAG Lasers",
      "Diode Laser Pumped Nd: YVO₄, Nd: YAG And Nd:YLF Lasers",
      "Third Harmonic Generation (THG) Of Nd: YAG And Nd:YLY Lasers",
      "Optical Parametric Amplifiers OPA And Oscillators OPO Pumped By Excimer Lasers And Harmonics Of Nd:YAG Lasers",
      "Second Harmonic Genration (SHG) And Tripling (THG) Of High Power Nd:YAP Laser At 1.34μm"
    ]
  },
  {
    title: "Beta-Barium Borate (β-BaB₂O₄ or BBO)",
    advantages: ["Broad Phase-Matchable SHG Region From 410nm To 3500nm", "Wide Transmission Region From 190nm To 3500nm", "Large Effective Second-Harmonic-Generation (SHG) Coefficent, d₁₁(BBG)=5,8xd₃₆(KDP)", "High Damage Threshold Of (> 5GW/cm² For 10ns Pulse-Width At 1064nm)", "High Optional Homogeneity Δn 10⁴/cm", "Wide Temperature-BandWidth Of About 55 C (for Type I SHG 1064nm)", "Good Mechanical And Physical Properties"],
    images: ["/images/barium.jpg"],
    route: "bbo",
    specifications: {
      absor: {
        title: "Absorption Losses",
        array: ["1/cm, at", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Bubbles, Inclusions, etc.",
        value: "None"
      },
      size: {
        title: "Sizes, mm³",
        array: ["3x3x5", "4x4x7", "4x6x7", "5x5x7", "5x5x10", "5x7x10"],
        array2: ["8x10x12", "5x5x1", "5x5x0,5", "6x10x25", "7x7x0,1", "7x7x0,01"]
      },
      orient: {
        title: "Orientation",
        value: "Depends On Application, Contact Us To Determine Orientation For Your Element"
      },
      awd: [
        {
          title: "Allowance For Dimensions",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Accuracy Of Orientation",
          sub: "min. of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Optical Surface Quality",
          Optional: "5/2",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Flatness",
          Optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallelism",
          sub: "sec.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Perpendicularity",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        }
      ]
    },
    Applications: [
      "Second, Third, FOurth And Fifth Harmonic Generatios Of Nd:Lasers",
      "Frequency-Doubling, -Tripling, And -Mixing Of Dye Lasers",
      "Second, Third & Fourth Harmonic Generations Of Ti:Al₂0₃, And Alexandrite Lasers",
      "Optical Parametric Amplifiers (OPA) And Optical Parametric Oscillators (OPO)",
      "Frequency-Doubling, -Tripling Of Ultrashort Pulse Ti:Sapphire And Dye Lasers",
      "Frequency-Doubling Of Argon-ion, Cu-vapor And Ruby Lasers, External Intracavity (SHG)"
    ]
  },
  {
    title: "Potassium Tytanil Phosphate (KTP)",
    advantages: ["Broad Transparency Range From 0.160µm To 2.6µm (SHG Range From 0.55µm To 2.6µm)", "Type I And Type II Non-Critical Phase-Matching (NCPM) Over A Wide Wavelength Range", "Relatively Large Effective SHG Coefficient (About Three Times Larger Than That Of KDP)", "High Damage Threshold (> 10 GW/cm² For 10ns Laser At 1.054µm)", "Wide Acceptance Angle And Small Walk-Off", "High Optical Quality (Homogeneity Δn 10⁴/cm)"],
    images: ["/images/ktp.jpg"],
    route: "ktp",
    specifications: {
      absor: {
        title: "Absorption Losses",
        array: ["1/cm, at", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Bubbles, Inclusions, etc.",
        value: "None"
      },
      orient: {
        title: "Orientation",
        value: "Depends On Application, Contact Us To Determine Orientation For Your Element"
      },
      size: {
        title: "Sizes, mm³",
        array: ["3x3x5", "3x3x10", "3x3x14", "3x3x20", "4x4x12", "5x5x10", "5x5x15"],
        array2: ["10x10x15", "10x10x20", "20x20x10", "6x10x25", "7x7x1,0", "7x7x0,1"]
      },
      awd: [
        {
          title: "Allowance For Dimensions",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Accuracy Of Orientation",
          sub: "min. of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Optical Surface Quality",
          Optional: "5/2",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Flatness",
          Optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallelism",
          sub: "sec.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Perpendicularity",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        }
      ]
    },
    Applications: [
      "High Power Nd: YAG And Nd:YLF Lasers For R & D",
      "Ti:Sapphire, Alexandrite And Cr:LiSAF Lasers",
      "Medical And Industrial Nd: YAG Lasers",
      "Diode Laser Pumped Nd: YVO₄, Nd: YAG And Nd:YLF Lasers",
      "Third Harmonic Generation (THG) Of Nd: YAG And Nd:YLY Lasers",
      "Optical Parametric Amplifiers OPA And Oscillators OPO Pumped By Excimer Lasers And Harmonics Of Nd:YAG Lasers",
      "Second Harmonic Genration (SHG) And Tripling (THG) Of High Power Nd:YAP Laser At 1.34μm"
    ]
  },
  {
    title: `Potassium-Gadolinium Tungstate (Yb:KGW)`,
    title2: "Potassium-Gttrium Gungstate (Yb:KYW)",
    subtitle: "Doped With Yttrium Yb",
    advantages: ["High Absorbance At 981nm", "High Simulated Radiation Cross Section", "High Threshold Of Laser Beam Damage", "Very Low Quantum Defect λpump/λse", "Wide Polarized Output At 1023-1060nm", "High Tilt Efficiency With Diode Pumping (~60%)", "High Concentration Of Yb Doping"],
    images: ["/images/kgw.jpg"],
    route: "kgw",
    specifications: {
      capabe: {
        title: "PRODUCTIONS CAPABILITIES",
        array: [
          "Production Of Various Forms (Plates, Rods, Cubes)",
          "Various Dopted",
          "Different Types Of Coatings"
        ]
      },
      awd: [
        {
          title: "Allowance For Dimensions",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Accuracy Of Orientation",
          sub: "min. of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Optical Surface Quality",
          Optional: "5/2",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Flatness",
          Optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallelism",
          sub: "sec.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Perpendicularity",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        }
      ]
    },
    Applications: [
      "Yb:KGW And Yb:KYW Can Be Used As An Ultrashort Pulse Amplifier.",
      "Yb:KGW And Yb KYW Are Among The Best Materials For High Power Disk Lasers",
      "Thin (100-150μm) Yb:KGW And YbKYW Crystals Are Used As Lasing Sources To Generate Ultrashort (Hundreds Of Femtoseconds) High- Power Pulses (>22 W). Standard Pumping Is 981nm, Output: 1023-1060nm."
    ]
  }
]

const UZ_PRODUCTS = [
  {
    title: "Lithium Triborate (LiB₃O₅; or LBO)",
    advantages: ["Keng Shaffoflik Diapazoni 0,160µm Dan 2,6µm Gacha (SHG Diapazoni 0,55µm Dan 2,6µm Gacha)", "Keng To'lqin Uzunligi Diapazonida I Va II Turdagi Kritik Bo'lmagan Fazalarni Moslashtirish (NCPM).", "Nisbatan Katta Samarali SHG Koeffitsienti (KDP Dan Taxminan Uch Baravar Katta)", "Yuqori Shikastlanish Chegarasi (10ns Lazer Uchun > 10 GVt/sm², 1,054µm)", "Keng Qabul Qilish Burchagi Va Kichik Yurish", "Yuqori Optik Sifat (Bir Xillik Δn 10⁴/sm)"],
    images: ["/images/lib.jpg"],
    route: "lbo",
    specifications: {
      absor: {
        title: "Absorbtsiya Yo'qotishlari",
        array: ["1/cm, at", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Pufakchalar, Qo'shimchalar Va Boshqalar.",
        value: "Yo'q"
      },
      orient: {
        title: "Orientatsiya",
        value: "Ilovaga Bog'liq"
      },
      size: {
        title: "Hajmi, mm³",
        array: ["3x3x5", "3x3x10", "3x3x14", "3x3x20", "4x4x12", "5x5x10", "5x5x15"],
        array2: ["10x10x15", "10x10x20", "20x20x10", "6x10x25", "7x7x1,0", "7x7x0,1"]
      },
      awd: [
        {
          title: "O'lchamlar Uchun Ruxsat",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Orientatsiyaning Aniqligi",
          sub: "min. of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Ixtiyoriy Sirt Sifati",
          Optional: "5/2",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Yassilik",
          Optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallellik",
          sub: "sec.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Perpendikulyarlik",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        }
      ]
    },
    Applications: [
      "Yuqori Quvvatli Nd: YAG Va Nd: YLF R&D Uchun Lazerlar",
      "Ti: Safir, Aleksandrit Va Cr: LiSAF Lazerlari",
      "Tibbiy Va Sanoat Nd: YAG Lazerlari",
      "Diodli Lazer Pompalanadigan Nd: YVO₄, Nd: YAG Va Nd: YLF Lazerlari",
      "Nd: YAG Va Nd: YLY Lazerlarining Uchinchi Harmonik Avlodi (THG).",
      "Optik Parametrik Kuchaytirgichlar OPA Va Eksimer Lazerlari Tomonidan Pompalanadigan OPO Osilatorlari Va Nd: YAG Lazerlarining Harmoniklari",
      "Ikkinchi Garmonik Nasl (SHG) Va Yuqori Quvvatli Nd: YAP Lazerining 1.34μmdagi Uch Baravar (THG)"
    ]
  },
  {
    title: "Beta-Barium Borate (β-BaB₂O₄ or BBO)",
    advantages: ["410nm Dan 3500nm Gacha Bo'lgan Keng Fazaga Mos Keladigan Hudud", "190nm Dan 3500nm Gacha Bo'lgan Keng Uzatish Hududi", "Katta Samarali Ikkinchi Garmonik Avlod (SHG) Koeffitsienti, d₁₁(BBG)=5,8xd₃₆(KDP)", "Yuqori Shikastlanish Chegarasi (1064nm Da 10ns Impuls Kengligi Uchun > 5 GVt/sm²)", "Yuqori Ixtiyoriy Bir Xillik Δn 10⁴/sm", "Keng Harorat O'tkazuvchanligi Taxminan 55 C (I SHG 1064nm Uchun)", "Yaxshi Mexanik Va Fizik Xususiyatlar"],
    images: ["/images/barium.jpg"],
    route: "bbo",
    specifications: {
      absor: {
        title: "Absorbtsiya Yo'qotishlari",
        array: ["1/cm, at", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Pufakchalar, Qo'shimchalar Va Boshqalar.",
        value: "Yo'q"
      },
      orient: {
        title: "Orientatsiya",
        value: "Ilovaga Bog'liq"
      },
      size: {
        title: "Hajmi, mm³",
        array: ["3x3x5", "3x3x10", "3x3x14", "3x3x20", "4x4x12", "5x5x10", "5x5x15"],
        array2: ["10x10x15", "10x10x20", "20x20x10", "6x10x25", "7x7x1,0", "7x7x0,1"]
      },
      awd: [
        {
          title: "O'lchamlar Uchun Ruxsat",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Orientatsiyaning Aniqligi",
          sub: "min. of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Ixtiyoriy Sirt Sifati",
          Optional: "5/2",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Yassilik",
          Optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallellik",
          sub: "sec.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Perpendikulyarlik",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        }
      ]
    },
    Applications: [
      "Nd: Lazerlarning Ikkinchi, Uchinchi, to'rtinchi Va beshinchi Garmonik Avlodlari",
      "Bo'yoq Lazerlarining Chastotasini Ikki Baravar Oshirish, Uch Marta Oshirish Va Aralashtirish",
      "Ti:Al₂0₃ Va Aleksandrit Lazerlarining Ikkinchi, Uchinchi Va Toʻrtinchi Garmonik Avlodlari",
      "Optik Parametrik Kuchaytirgichlar (OPA) Va Optik Parametrik Osilatorlar (OPO)",
      "Chastotani Ikki Baravar Oshirish, Ultra Qisqa Pulsni Uch Marta Oshirish Ti: Safir Va Bo'yoq Lazerlari",
      "Argon-ion, Cu-bug' Va Ruby Lazerlarining Chastotasini Ikki Baravar Oshirish, Tashqi Bo'shliq SHG"
    ]
  },
  {
    title: "Potassium Tytanil Phosphate (KTP)",
    advantages: ["Keng Shaffoflik Diapazoni 0,160µm Dan 2,6µm Gacha (SHG Diapazoni 0,55µm Dan 2,6µm Gacha)", "Keng To'lqin Uzunligi Diapazonida I Va II Turdagi Kritik Bo'lmagan Fazalarni Moslashtirish (NCPM).", "Nisbatan Katta Samarali SHG Koeffitsienti (KDP Dan Taxminan Uch Baravar Katta)", "Yuqori Shikastlanish Chegarasi (10ns Lazer Uchun > 10 GVt/sm², 1,054µm)", "Keng Qabul Qilish Burchagi Va Kichik Yurish", "Yuqori Optik Sifat (Bir Xillik Δn 10⁴/sm)"],
    images: ["/images/ktp.jpg"],
    route: "ktp",
    specifications: {
      absor: {
        title: "Absorbtsiya Yo'qotishlari",
        array: ["1/cm, at", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Pufakchalar, Qo'shimchalar Va Boshqalar.",
        value: "Yo'q"
      },
      orient: {
        title: "Orientatsiya",
        value: "Ilovaga Bog'liq"
      },
      size: {
        title: "Hajmi, mm³",
        array: ["3x3x5", "3x3x10", "3x3x14", "3x3x20", "4x4x12", "5x5x10", "5x5x15"],
        array2: ["10x10x15", "10x10x20", "20x20x10", "6x10x25", "7x7x1,0", "7x7x0,1"]
      },
      awd: [
        {
          title: "O'lchamlar Uchun Ruxsat",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Orientatsiyaning Aniqligi",
          sub: "min. of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Ixtiyoriy Sirt Sifati",
          Optional: "5/2",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Yassilik",
          Optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallellik",
          sub: "sec.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Perpendikulyarlik",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        }
      ]
    },
    Applications: [
      "Yuqori Quvvatli Nd: YAG Va Nd: YLF R&D Uchun Lazerlar",
      "Ti: Safir, Aleksandrit Va Cr: LiSAF Lazerlari",
      "Tibbiy Va Sanoat Nd: YAG Lazerlari",
      "Diodli Lazer Pompalanadigan Nd: YVO₄, Nd: YAG Va Nd: YLF Lazerlari",
      "Nd: YAG Va Nd: YLY Lazerlarining Uchinchi Harmonik Avlodi (THG).",
      "Optik Parametrik Kuchaytirgichlar OPA Va Eksimer Lazerlari Tomonidan Pompalanadigan OPO Osilatorlari Va Nd: YAG Lazerlarining Harmoniklari",
      "Ikkinchi Garmonik Nasl (SHG) Va Yuqori Quvvatli Nd: YAP Lazerining 1.34μmdagi Uch Baravar (THG)"
    ]
  },
  {
    title: "Potassium-Gadolinium Tungstate (Yb:KGW)",
    title2: "Potassium-Yttrium Tungstate (Yb:KYW)",
    subtitle: "Itriy Yb Bilan qo'shilgan",
    advantages: ["981nm Da Yuqori Absorbans", "Yuqori Simulyatsiya Qilingan Nurlanish Kesimi", "Lazer Nurlari Shikastlanishining Yuqori Chegarasi", "Juda Kam Kvant λNasos/λse", "1023-1060nm Da Keng Polarizatsiyali Chiqish", "Diodli Nasos Bilan Yuqori Egilish Samaradorligi (~ 60%)", "Yb Dopingning Yuqori Konsentratsiyasi"],
    images: ["/images/kgw.jpg"],
    route: "kgw",
    specifications: {
      capabe: {
        title: "ISHLAB CHIQARISH IMKONIYATLARI",
        array: [
          "Turli Shakllarni Ishlab Chiqarish (Plastinkalar, Novdalar, Kublar)",
          "Turlicha Qabul Qilingan",
          "Har Xil Turdagi Q+oplamalar"
        ]
      },
      awd: [
        {
          title: "O'lchamlar Uchun Ruxsat",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Orientatsiyaning Aniqligi",
          sub: "min. of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Ixtiyoriy Sirt Sifati",
          Optional: "5/2",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Yassilik",
          Optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallellik",
          sub: "sec.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Perpendikulyarlik",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        }
      ]
    },
    Applications: [
      "Yb: KGW Va Yb: KYW Ultra Qisqa Puls Kuchaytirgich Sifatida Ishlatilishi Mumkin.",
      "Yb: KGW Va Yb KYW Yuqori Quvvatli Disk Lazerlari Uchun Eng Yaxshi Materiallardan Biridir",
      "Yupqa (100-150μm) Yb:KGW Va YbKYW Kristallari Ultra Qisqa (Yuzlab Femtosekundlar) Yuqori Quvvatli Impulslarni (>22 Vt) Hosil Qilish Uchun Lazer Manbalari Sifatida Ishlatiladi. Standart Nasos 981nm, Chiqishi: 1023-1060nm."
    ]
  }
]

const other_products = [
  "Nd:YAG Rods;",
  "Crystals Of Silver Thiogallate AgGaS₂;",
  "Production Of Some Optical Elements Of Laser Technology From Glass, Fused Quartz (Mirrors, Polarizers);",
  "If We Do Not Have The Necessary Components, We Provide Supplies From Partner Companies With Mandatory 100% Testing Of Key Parameters At Our Stands;",
  "Repolishing And Coating Of Customer's Elements;",
  "Carrying Out R&D In The Field Of Nonlinear Optical Elements, etc.;",
  "Creation Of Optical Modulators And Elements Of Laser Power Optics With Unique Parameters."
]

const other_products_uz = [
  "Nd:YAG Rodlari;",
  "Kumush Tiogallat AgGaS₂ Kristallari;",
  "Shishadan, Eritilgan Kvartsdan (Oyna, Polarizator) Lazer Texnologiyasining Ayrim Optik Elementlarini Ishlab Chiqarish;",
  "Agar Bizda Kerakli Komponentlar Bo'lmasa, Biz Hamkor Kompaniyalardan Stendlarimizda Asosiy Parametrlarni Majburiy 100% Sinovdan O'tkazgan Holda Yetkazib Beramiz;",
  "Buyurtmachi Elementlarini qayta jilozlash Va qoplash;",
  "Nochiziqli Optik Elementlar Sohasida Ilmiy-Tadqiqot Ishlarini Olib Borish Va Boshqalar;",
  "Noyob Parametrlarga Ega Optik Modulyatorlar Va Lazer Quvvat Optikasi Elementlarini Yaratish."
]