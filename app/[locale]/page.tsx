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
    const msg = `Customer application: ${obj.additional}%0ACustomer Email: ${obj.email}`
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
                      <Link href="#KGW">KGW/KYW</Link>
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
            return <Product title2={e.title2} subtitle={e.subtitle} route={e.route} setIsOpen={setIsOpen} isOpen={isOpen} specifications={e.specifications} application={e.applications} advantages={e.advantages} images={e.images} title={e.title} key={Math.random() + `${e.title}`} id={index + 1} />
          }) : products.map((e, index) => {
            return <Product title2={e.title2} subtitle={e.subtitle} route={e.route} setIsOpen={setIsOpen} isOpen={isOpen} specifications={e.specifications} application={e.applications} advantages={e.advantages} images={e.images} title={e.title} key={Math.random() + `${e.title}`} id={index + 1} />
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

function Product({ id, title, advantages, images, route, specifications, application, setIsOpen, isOpen, title2, subtitle }: {
  id: number
  title: string
  title2?: string
  subtitle?: string
  advantages: string[]
  images: {
    file: string,
    w: number,
    h: number
  },
  route: string,
  specifications: any,
  application: any,
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
                <Image src={images.file} width={images.w} height={images.h} alt='Some image' />
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
              }}>{pathname === "/uz" ? "Maxsus o'lchamlar so'rov bo'yicha mavjud" : "Custom sizes available on request"}</p>
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
                {application.map((e: string) => {
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
    advantages: ["Broad transparency range from 0.160µm to 2.6µm (SHG range from 0.55µm to 2.6µm)", "Type I and type II non-critical phase-matching (NCPM) over a wide wavelength range", "Relatively large effective SHG coefficient (about three times larger than that of KDP)", "High damage threshold (> 10 gw/cm² for 10ns laser at 1.054µm)", "Wide acceptance angle and small walk-off", "High optical homogeneity Δn 1/10⁶cm"],
    images: {
      w: 365,
      h: 301,
      file:"/images/lib.jpg"
    },
    route: "lbo",
    specifications: {
      absor: {
        title: "Absorption losses",
        array: ["1/cm, at", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Bubbles, inclusions, etc.",
        value: "None"
      },
      orient: {
        title: "Orientation",
        value: "Depends on application"
      },
      size: {
        title: "Sizes, mm³",
        array: ["3x3x5", "3x3x10", "3x3x14", "3x3x20", "4x4x12", "5x5x10", "5x5x15"],
        array2: ["10x10x15", "10x10x20", "20x20x10", "6x10x25", "7x7x1,0", "7x7x0,1"]
      },
      awd: [
        {
          title: "Allowance for dimensions",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Accuracy of orientation",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Optical surface quality",
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
    applications: [
      "High power nd: YAG and nd:YLF lasers for R & D",
      "Ti:Sapphire, Alexandrite and cr:LiSaf lasers",
      "Medical and industrial nd: YAG lasers",
      "Diode laser pumped nd: YVO₄, nd: YAG and nd:YLF lasers",
      "Third harmonic generation (THG) of nd: YAG and nd:YLF lasers",
      "Optical parametric amplifiers OPA and oscillators OPO pumped by excimer lasers and harmonics of nd:YAG lasers",
      "Second harmonic genration (SHG) and tripling (THG) of high power nd:YAP laser at 1.34μm"
    ]
  },
  {
    title: "Beta-Barium Borate (β-BaB₂O₄ or BBO)",
    advantages: ["Broad phase-matchable SHG range from 410nm to 3500nm", "Wide transmission region from 190nm to 3500nm", "Large effective second-harmonic-generation (SHG) coefficent, d₁₁(BBO)=5,8xd₃₆(KDP)", "High damage threshold of (> 5gw/cm² for 10ns pulse-width at 1064nm)", "High optical homogeneity Δn 1/10⁶cm", "Wide  temperature-bandwidth of about 55C (for type  SHG 1064nm)", "Good mechanical and physical properties"],
    images: {
        w: 349,
        h: 311,
        file: "/images/barium.jpg"
    },
    route: "bbo",
    specifications: {
      absor: {
        title: "Absorption losses",
        array: ["1/cm, at", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Bubbles, inclusions, etc.",
        value: "None"
      },
      size: {
        title: "Sizes, mm³",
        array: ["3x3x5", "4x4x7", "4x6x7", "5x5x7", "5x5x10", "5x7x10"],
        array2: ["8x10x12", "5x5x1", "5x5x0,5", "7x7x0,1", "7x7x0,01"]
      },
      orient: {
        title: "Orientation",
        value: "Depends on application, contact us to determine orientation for your element"
      },
      awd: [
        {
          title: "Allowance for dimensions",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Accuracy of orientation",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Optical surface quality",
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
    applications: [
      "Second, third, fourth and fifth harmonic generatios of nd:Lasers",
      "Frequency-doubling, -tripling, and -mixing of dye lasers",
      "Second, third & fourth harmonic generations of Ti:Al₂O₃, and alexandrite lasers",
      "Optical parametric amplifiers (OPA) and optical parametric oscillators (OPO)",
      "Frequency-doubling, -tripling of ultrashort pulse ti:Sapphire and dye lasers",
      "Frequency-doubling of argon-ion, cu-vapor and ruby lasers, external intracavity (SHG)"
    ]
  },
  {
    title: "Potassium Tytanil Phosphate (KTP)",
    advantages: ["Broad transparency range from 0.160µm to 2.6µm (SHG range from 0.55µm to 2.6µm)", "Type I and type II non-critical phase-matching (NCPM) over a wide wavelength range", "Relatively large effective SHG coefficient (about three times larger than that of KDP)", "High damage threshold (> 10 gw/cm² for 10ns laser at 1.054µm)", "Wide acceptance angle and small walk-off", "High optical quality (homogeneity Δn 1/10⁶cm)"],
    images: {
      w: 347,
      h: 339,
      file:"/images/ktp.jpg"
    },
    route: "ktp",
    specifications: {
      absor: {
        title: "Absorption losses",
        array: ["1/cm, at", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Bubbles, inclusions, etc.",
        value: "None"
      },
      orient: {
        title: "Orientation",
        value: "Depends on application, contact us to determine orientation for your element"
      },
      size: {
        title: "Sizes, mm³",
        array: ["3x3x5", "3x3x10", "3x3x14", "3x3x20", "4x4x12", "5x5x10", "5x5x15"],
        array2: ["10x10x15", "10x10x20", "20x20x10", "6x10x25", "7x7x1,0", "7x7x0,1"]
      },
      awd: [
        {
          title: "Allowance for dimensions",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Accuracy of orientation",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Optical surface quality",
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
    applications: [
      "High power nd: YAG and nd:YLF lasers for R & D",
      "Ti:Sapphire, Alexandrite and cr:LiSaf lasers",
      "Medical and industrial nd: YAG lasers",
      "Diode laser pumped nd: YVO₄, nd: YAG and nd:YLF lasers",
      "Third harmonic generation (THG) of nd: YAG and nd:YLF lasers",
      "Optical parametric amplifiers OPA and oscillators OPO pumped by excimer lasers and harmonics of nd:YAG lasers",
      "Second harmonic genration (SHG) and tripling (THG) of high power nd:YAP laser at 1.34μm"
    ]
  },
  {
    title: `Potassium-Gadolinium Tungstate (Yb:KGW)`,
    title2: "Potassium-Gttrium Gungstate (Yb:KYW)",
    subtitle: "Doped With Yttrium Yb",
    advantages: ["High absorbance at 981nm", "High simulated radiation cross section", "High threshold of laser beam damage", "Very low quantum defect λpump/λse", "Wide polarized output at 1023-1060nm", "High tilt efficiency with diode pumping (~60%)", "High concentration of yb doping"],
    images: {
      w: 403,
      h: 363,
      file:"/images/KGW.jpg"
    },
    route: "KGW",
    specifications: {
      capabe: {
        title: "PRODUCTIONS CAPABILITIES",
        array: [
          "Production of various forms (plates, rods, cubes)",
          "Various dopted",
          "Different types of coatings"
        ]
      },
      awd: [
        {
          title: "Allowance for dimensions",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Accuracy of orientation",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Optical surface quality",
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
    applications: [
      "Yb:KGW and yb:KYW can be used as an ultrashort pulse amplifier.",
      "Yb:KGW and yb:KYW are among the best materials for high power disk lasers",
      "Thin (100-150μm) (100-150μm) yb:KGW and yb:KYW crystals are used as lasing sources to generate ultrashort (hundreds of femtoseconds) high- power pulses (>22 w). standard pumping is 981nm, output: 1023-1060nm."
    ]
  }
]

const UZ_PRODUCTS = [
  {
    title: "Lithium Triborate (LiB₃O₅; or LBO)",
    advantages: ["Keng shaffoflik diapazoni 0,160µm dan 2,6µm gacha (SHG diapazoni 0,55µm dan 2,6µm gacha)", "Keng to'lqin uzunligi diapazonida  va II turdagi kritik bo'lmagan fazalarni moslashtirish (NCPM).", "Nisbatan katta samarali SHG koeffitsienti (KDP dan taxminan uch baravar katta)", "Yuqori shikastlanish chegarasi (10ns lazer uchun > 10 gvt/sm², 1,054µm)", "Keng qabul qilish burchagi va kichik yurish", "Yuqori optik bir xillik Δn 1/10⁶cm"],
    images: {
      w: 365,
      h: 301,
      file:"/images/lib.jpg"
    },
    route: "lbo",
    specifications: {
      absor: {
        title: "Absorbtsiya yo'qotishlari",
        array: ["1/cm, at", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Pufakchalar, qo'shimchalar va boshqalar.",
        value: "Yo'q"
      },
      orient: {
        title: "Orientatsiya",
        value: "Ilovaga bog'liq"
      },
      size: {
        title: "Hajmi, mm³",
        array: ["3x3x5", "3x3x10", "3x3x14", "3x3x20", "4x4x12", "5x5x10", "5x5x15"],
        array2: ["10x10x15", "10x10x20", "20x20x10", "6x10x25", "7x7x1,0", "7x7x0,1"]
      },
      awd: [
        {
          title: "O'lchamlar uchun ruxsat",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Orientatsiyaning aniqligi",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Ixtiyoriy sirt sifati",
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
    applications: [
      "Yuqori quvvatli nd: YAG va nd: YLF R&D uchun lazerlar",
      "Ti: safir, aleksandrit va cr: lisaf lazerlari",
      "Tibbiy va sanoat nd: YAG lazerlari",
      "Diodli lazer pompalanadigan nd: YVO₄, nd: YAG va nd: YLF lazerlari",
      "Nd: YAG va nd: YLF lazerlarining uchinchi harmonik avlodi (THG).",
      "Optik parametrik kuchaytirgichla OPA va eksimer lazerlari tomonidan pompalanadigan OPO osilatorlari va nd: YAG lazerlarining harmoniklari",
      "Ikkinchi garmonik nasl (SHG) va yuqori quvvatli nd: YAP lazerining 1.34μmdagi uch baravar (THG)"
    ]
  },
  {
    title: "Beta-Barium Borate (β-BaB₂O₄ or BBO)",
    advantages: ["Keng fazaga mos keladigan SHG diapazoni 410nm dan 3500nm gacha", "190nm dan 3500nm gacha bo'lgan keng uzatish hududi", "Katta samarali ikkinchi garmonik avlod (SHG) koeffitsienti, d₁₁(BBO)=5,8xd₃₆(KDP)", "Yuqori shikastlanish chegarasi (1064nm da 10ns impuls kengligi uchun > 5 gvt/sm²)", "Yuqori ixtiyoriy bir xillik Δn 1/10⁶sm", "Keng harorat o'tkazuvchanligi taxminan 55C (i SHG 1064nm uchun)", "Yaxshi mexanik va fizik xususiyatlar"],
    images: {
      w: 349,
      h: 311,
      file: "/images/barium.jpg"
  },
    route: "bbo",
    specifications: {
      absor: {
        title: "Absorbtsiya yo'qotishlari",
        array: ["1/cm, at", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Pufakchalar, qo'shimchalar va boshqalar.",
        value: "Yo'q"
      },
      orient: {
        title: "Orientatsiya",
        value: "Ilovaga bog'liq"
      },
      size: {
        title: "Hajmi, mm³",
        array: ["3x3x5", "3x3x10", "3x3x14", "3x3x20", "4x4x12", "5x5x10", "5x5x15"],
        array2: ["10x10x15", "10x10x20", "20x20x10", "7x7x1,0", "7x7x0,1"]
      },
      awd: [
        {
          title: "O'lchamlar uchun ruxsat",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Orientatsiyaning aniqligi",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Ixtiyoriy sirt sifati",
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
    applications: [
      "Nd: Lazerlarning ikkinchi, uchinchi, to'rtinchi va beshinchi garmonik avlodlari",
      "Bo'yoq lazerlarining chastotasini ikki baravar oshirish, uch marta oshirish va aralashtirish",
      "Ti:Al₂O₃ va aleksandrit lazerlarining ikkinchi, uchinchi va toʻrtinchi garmonik avlodlari",
      "Optik parametrik kuchaytirgichlar (OPA) va optik parametrik osilatorlar (OPA)",
      "Chastotani ikki baravar oshirish, ultra qisqa pulsni uch marta oshirish ti: Safir va bo'yoq lazerlari",
      "Argon-ion,  Cu-bug va Ruby lazerlarining chastotasini ikki baravar oshirish, tashqi bo'shliq SHG"
    ]
  },
  {
    title: "Potassium Tytanil Phosphate (KTP)",
    advantages: ["Keng shaffoflik diapazoni 0,160µm dan 2,6µm gacha (SHG diapazoni 0,55µm dan 2,6µm gacha)", "Keng to'lqin uzunligi diapazonida  va II turdagi kritik bo'lmagan fazalarni moslashtirish (NCPM).", "Nisbatan katta samarali SHG koeffitsienti (KDP dan taxminan uch baravar katta)", "Yuqori shikastlanish chegarasi (10ns lazer uchun > 10 gvt/sm², 1,054µm)", "Keng qabul qilish burchagi va kichik yurish", "Yuqori Optik Sifat (Bir Xillik Δn 1/10⁶sm)"],
    images: {
      w: 347,
      h: 339,
      file:"/images/ktp.jpg"
    },
    route: "ktp",
    specifications: {
      absor: {
        title: "Absorbtsiya yo'qotishlari",
        array: ["1/cm, at", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Pufakchalar, qo'shimchalar va boshqalar.",
        value: "Yo'q"
      },
      orient: {
        title: "Orientatsiya",
        value: "Ilovaga bog'liq"
      },
      size: {
        title: "Hajmi, mm³",
        array: ["3x3x5", "3x3x10", "3x3x14", "3x3x20", "4x4x12", "5x5x10", "5x5x15"],
        array2: ["10x10x15", "10x10x20", "20x20x10", "6x10x25", "7x7x1,0", "7x7x0,1"]
      },
      awd: [
        {
          title: "O'lchamlar uchun ruxsat",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Orientatsiyaning aniqligi",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Ixtiyoriy sirt sifati",
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
    applications: [
      "Yuqori quvvatli nd: YAG va nd: YLF R & D uchun lazerlar",
      "Ti: safir, aleksandrit va cr: lisaf lazerlari",
      "Tibbiy va sanoat nd: YAG lazerlari",
      "Diodli lazer pompalanadigan nd: yvo₄, nd: YAG va nd: YLF lazerlari",
      "Nd: yag va nd: ylf lazerlarining uchinchi harmonik avlodi (THG).",
      "Optik parametrik kuchaytirgichlar opa va eksimer lazerlari tomonidan pompalanadigan OPO osilatorlari va nd: yag lazerlarining harmoniklari",
      "Ikkinchi garmonik nasl (SHG) va yuqori quvvatli nd: YAP lazerining 1.34μmdagi uch baravar (THG)"
    ]
  },
  {
    title: "Potassium-Gadolinium Tungstate (Yb:KGW)",
    title2: "Potassium-Yttrium Tungstate (Yb:KYW)",
    subtitle: "Itriy Yb Bilan qo'shilgan",
    advantages: ["981nm da yuqori absorbans", "Yuqori simulyatsiya qilingan nurlanish kesimi", "Lazer nurlari shikastlanishining yuqori chegarasi", "Juda kam kvant λnasos/λse", "1023-1060nm da keng polarizatsiyali chiqish", "Diodli nasos bilan yuqori egilish samaradorligi (~ 60%)", "Yb dopingning yuqori konsentratsiyasi"],
    images: {
      w: 403,
      h: 363,
      file:"/images/KGW.jpg"
    },
    route: "KGW",
    specifications: {
      capabe: {
        title: "ISHLAB CHIQARISH IMKONIYATLARI",
        array: [
          "Turli shakllarni ishlab chiqarish (plastinkalar, novdalar, kublar)",
          "Turlicha qabul qilingan",
          "Har xil turdagi qoplamalar"
        ]
      },
      awd: [
        {
          title: "O'lchamlar uchun ruxsat",
          sub: "mm",
          standard: "0,1",
          Optional: "0,05"
        },
        {
          title: "Orientatsiyaning aniqligi",
          sub: "min.of arc",
          standard: "<30",
          Optional: "<10"
        },
        {
          title: "Ixtiyoriy sirt sifati",
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
    applications: [
      "Yb: KGW va yb: KYW ultra qisqa puls kuchaytirgich sifatida ishlatilishi mumkin.",
      "Yb: KGW va yb KYW yuqori quvvatli disk lazerlari uchun eng yaxshi materiallardan biridir",
      "Yupqa (100-150μm) yb:KGW va ybkyw kristallari ultra qisqa (yuzlab femtosekundlar) yuqori quvvatli impulslarni (>22 vt) hosil qilish uchun lazer manbalari sifatida ishlatiladi. standart nasos 981nm, chiqishi: 1023-1060nm."
    ]
  }
]

const other_products = [
  "Nd:YAG rods;",
  "Crystals of silver thiogallate AgGaS₂;",
  "Production of some optical elements of laser technology from glass, fused quartz (mirrors, polarizers);",
  "If we do not have the necessary components, we provide supplies from partner companies with mandatory 100% testing of key parameters at our stands;",
  "Repolishing and coating of customer's elements;",
  "Carrying out R & D in the field of nonlinear optical elements, etc.;",
  "Creation of optical modulators and elements of laser power optics with unique parameters."
]

const other_products_uz = [
  "Nd:YAG rodlari;",
  "Kumush tiogallat AgGaS₂ kristallari;",
  "Shishadan, eritilgan kvartsdan (oyna, polarizator) lazer texnologiyasining ayrim optik elementlarini ishlab chiqarish;",
  "Agar bizda kerakli komponentlar bo'lmasa, biz hamkor kompaniyalardan stendlarimizda asosiy parametrlarni majburiy 100% sinovdan o'tkazgan holda yetkazib beramiz;",
  "Buyurtmachi elementlarini qayta jilozlash va qoplash;",
  "Nochiziqli optik elementlar sohasida ilmiy-tadqiqot ishlarini olib borish va boshqalar;",
  "Noyob parametrlarga ega optik modulyatorlar va lazer quvvat optikasi elementlarini yaratish."
]