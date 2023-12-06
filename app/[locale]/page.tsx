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
        <div className={styles.entrance}>
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
                <motion.div onClick={() => {
                  push("#products")
                }} className={styles.arrowDown}>
                  <Image width={17} height={30} src={"/icons/arrowDown.svg"} alt='arrow down icon' />
                </motion.div>
              </motion.div>
              <div className={styles.content}>
                <div className={styles.info}>
                  <p>{entrance("info")}</p>
                </div>
                <div className={styles.products}>
                  <ul>
                    <li>
                      <Link href="#">{entrance("products")}</Link>
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
            return <Product route={e.route} setIsOpen={setIsOpen} isOpen={isOpen} specifications={e.specifications} application={e.applications} advantages={e.advantages} images={e.images} title={e.title} key={Math.random() + `${e.title}`} id={index + 1} />
          }) : products.map((e, index) => {
            return <Product route={e.route} setIsOpen={setIsOpen} isOpen={isOpen} specifications={e.specifications} application={e.applications} advantages={e.advantages} images={e.images} title={e.title} key={Math.random() + `${e.title}`} id={index + 1} />
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
                  <motion.h2 className="h2">{pathname === "/uz" ? "Boshqa maxsulotlat" : "Other products"}</motion.h2>
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
    </>
  )
}

function Product({ id, title, advantages, images, route, specifications, application, setIsOpen, isOpen }: {
  id: number
  title: string
  advantages: string[]
  images: string[],
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
            <motion.h2 className="h2">{title}</motion.h2>
          </div>
          <div className={styles.productInformation}>
            <div className={styles.productSection}>
              <div className={styles.productAdvantages}>
                <Image src={images[0]} width={800} height={850} alt='some image' />
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
              <h2>{pathname === "/uz" ? "Texnik xususiyatlari" : "Specifications"}</h2>
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
                  <h4>{specifications.size.title}</h4>
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
              <p>{pathname === "/uz" ? "Maxsus o'lchamlar so'rov bo'yicha mavjud" : "Custom sizes available on request"}</p>
              <div className={styles.awd}>
                {specifications.awd.map((e: any) => {
                  return <div key={e} className={styles.awds}>
                    <h4>{e.title} <span>{e.sub}</span></h4>
                    <p>{e.standard}</p>
                    <p>{e.optional}</p>
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
            </div>
          </div>
          <button onClick={() => {
            setIsOpen(true)
          }}>{pathname === "/uz" ? "Xususiyatlar" : "Specification"}</button>
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
    <motion.section ref={ref} id='aboutUs' className={styles.about}>
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
    title: "POTASSIUM TITANYL PHOSPHATE KTIOPO₄",
    advantages: ["broad transparency range from 0.160 µm to 2.6 µm (SHG range from 0.55 µm to 2.6 µm)", "type I and type II non-critical phase-matching (NCPM) over a wide wavelength range", "relatively large effective SHG coefficient (about three times larger than that of KDP)", "high damage threshold (> 10 GW/cm² for 10 ns laser at 1.054 µm)", "wide acceptance angle and small walk-off", "high optical quality (homogeneity Δn 10⁴/cm)"],
    images: ["/images/blue1.JPG"],
    route: "ktp",
    specifications: {
      absor: {
        title: "Absorption losses",
        array: ["1/cm", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Bubbles, Inclusions, etc.",
        value: "none"
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
          title: "Allowance for Dimensions",
          sub: "mm",
          standard: "0,1",
          optional: "0,05"
        },
        {
          title: "Accuracy of Orientation",
          sub: "min. of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Optional Surface Quality",
          optional: "0/0",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Flatness",
          optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallelism",
          sub: "sec.of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Perpendicularity",
          sub: "min.of arc",
          standard: "<30",
          optional: "<10"
        }
      ]
    },
    applications: [
      "High power Nd: YAG, and Nd:YLF lasers for R % D and military applications",
      "Ti:Sapphire, Alexandrite and Cr:LiSAF lasers",
      "Medical and industrial Nd: YAG lasers",
      "Diode laser pumped Nd: YVO₄, Nd: YAG and Nd:YLF lasers",
      "Third harmonic generation (THG) of Nd: YAG and Nd:YLY lasers",
      "Optical parametric amplifiers OPA and oscillators OPO pumped by Excimer lasers and harmonics of Nd:YAG lasers",
      "Second harmonic genration (SHG) and tripling (THG) of higyh power Nd:YAP laser at 1.34μm"
    ]
  },
  {
    title: "Lithium Triborate (LiB₃O₅ or LBO)",
    advantages: ["broad transparency range from 0.160 µm to 2.6 µm (SHG range from 0.55 µm to 2.6 µm)", "type I and type II non-critical phase-matching (NCPM) over a wide wavelength range", "relatively large effective SHG coefficient (about three times larger than that of KDP)", "high damage threshold (> 10 GW/cm² for 10 ns laser at 1.054 µm)", "wide acceptance angle and small walk-off", "high optical quality (homogeneity Δn 10⁴/cm)"],
    images: ["/images/gold1.JPG"],
    route: "lbo",
    specifications: {
      absor: {
        title: "Absorption losses",
        array: ["1/cm", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Bubbles, Inclusions, etc.",
        value: "none"
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
          title: "Allowance for Dimensions",
          sub: "mm",
          standard: "0,1",
          optional: "0,05"
        },
        {
          title: "Accuracy of Orientation",
          sub: "min. of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Optional Surface Quality",
          optional: "0/0",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Flatness",
          optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallelism",
          sub: "sec.of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Perpendicularity",
          sub: "min.of arc",
          standard: "<30",
          optional: "<10"
        }
      ]
    },
    applications: [
      "High power Nd: YAG, and Nd:YLF lasers for R % D and military applications",
      "Ti:Sapphire, Alexandrite and Cr:LiSAF lasers",
      "Medical and industrial Nd: YAG lasers",
      "Diode laser pumped Nd: YVO₄, Nd: YAG and Nd:YLF lasers",
      "Third harmonic generation (THG) of Nd: YAG and Nd:YLY lasers",
      "Optical parametric amplifiers OPA and oscillators OPO pumped by Excimer lasers and harmonics of Nd:YAG lasers",
      "Second harmonic genration (SHG) and tripling (THG) of higyh power Nd:YAP laser at 1.34μm"
    ]
  },
  {
    title: "POTASSIUM-GADOLINIUM TUNGSTATE (KGW/KGY)",
    advantages: ["high absorbance at 981 nm", "high simulated radiation cross section", "high threshold of laser beam damage", "very low quantum defect λpump/λse", "wide polarized output at 1023-1060 nm", "high tilt efficiency with diode pumping (~60%)", "high concentration of Yb doping"],
    images: ["/images/purple3.JPG"],
    route: "kgw",
    specifications: {
      capabe: {
        title: "PRODUCTIONS CAPABILITIES",
        array: [
          "production of various forms (plates, rods, cubes)",
          "various dopted",
          "different types of coatings"
        ]
      },
      awd: [
        {
          title: "Allowance for Dimensions",
          sub: "mm",
          standard: "0,1",
          optional: "0,05"
        },
        {
          title: "Accuracy of Orientation",
          sub: "min. of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Optional Surface Quality",
          optional: "0/0",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Flatness",
          optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallelism",
          sub: "sec.of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Perpendicularity",
          sub: "min.of arc",
          standard: "<30",
          optional: "<10"
        }
      ]
    },
    applications: [
      "Yb:KGW and Yb:KYW can be used as an ultrashort pulse amplifier.",
      "Yb:KGW and Yb KYW are among the best materials for high power disk lasers",
      "thin (100-150 μm) Yb:KGW and YbKYW crystals are used as lasing sources to generate ultrashort (hundreds of femtoseconds) high- power pulses (>22 W). Standard pumping is 981 nm, output: 1023-1060 nm."
    ]
  },
  {
    title: "BETA BARIUM BORATE (β-BaB₂O₄ OR BBO)",
    advantages: ["Broad phase-matchable region from 410nm to 3500nm", "Wide transmission region from 190nm to 3500nm", "Large effective second-harmonic-generation (SHG) coefficent, d11(BBG)=5,8xd36(KDP)", "High damage threshold of (> 5GW/cm² for 10ns pulse-width at 1064 nm)", "High optional homogeneity Δn 10⁴/cm", "Wide temperature-bandwidth of about 55 C (for type I SHG 1064 nm)", "Good mechanical and physical properties"],
    images: ["/images/transparent2.JPG"],
    route: "bbo",
    specifications: {
      absor: {
        title: "Absorption losses",
        array: ["1/cm", "0,20μm<λ<2,0μm", " < 0,005"]
      },
      bubble: {
        title: "Bubbles, Inclusions, etc.",
        value: "none"
      },
      size: {
        title: "Sizes, mm³",
        array: ["3x3x5", "3x3x10", "3x3x14", "3x3x20", "4x4x12", "5x5x10", "5x5x15"],
        array2: ["10x10x15", "10x10x20", "20x20x10", "6x10x25", "7x7x1,0", "7x7x0,1"]
      },
      orient: {
        title: "Orientation",
        value: "Depends on application, Contact us to determine orientation for you element"
      },
      awd: [
        {
          title: "Allowance for Dimensions",
          sub: "mm",
          standard: "0,1",
          optional: "0,05"
        },
        {
          title: "Accuracy of Orientation",
          sub: "min. of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Optional Surface Quality",
          optional: "0/0",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Flatness",
          optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallelism",
          sub: "sec.of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Perpendicularity",
          sub: "min.of arc",
          standard: "<30",
          optional: "<10"
        }
      ]
    },
    applications: [
      "Second, third, fourth and fifth harmonic generatios of Nd:lasers",
      "Frequency-doubling, -tripling, and -mixing of Dye lasers",
      "Second, third & fourth harmonic generations of Ti:Al₂0₃, and Alexandrite lasers",
      "Optical parametric amplifiers (OPA) and optical parametric oscillators (OPO)",
      "Frequency-doubling, -tripling of ultrashort pulse Ti:Sapphire and Dye lasers",
      "Frequency-doubling of Argon-ion, Cu-vapor and Ruby lasers, External intracavitySHG"
    ]
  },
]

const UZ_PRODUCTS = [
  {
    title: "POTASSIUM TITANYL PHOSPHATE KTIOPO₄",
    advantages: ["Keng shaffoflik diapazoni 0,160 µm dan 2,6 µm gacha (SHG diapazoni 0,55 µm dan 2,6 µm gacha)", "keng to'lqin uzunligi diapazonida I va II turdagi kritik bo'lmagan fazalarni moslashtirish (NCPM).", "nisbatan katta samarali SHG koeffitsienti (KDP dan taxminan uch baravar katta)", "yuqori shikastlanish chegarasi (10 ns lazer uchun > 10 GVt/sm², 1,054 µm)", "keng qabul qilish burchagi va kichik yurish", "yuqori optik sifat (bir xillik Δn 10⁴/sm)"],
    images: ["/images/blue1.JPG"],
    route: "ktp",
    specifications: {
      absor: {
        title: "Absorbtsiya yo'qotishlari",
        array: ["1/cm", "0,20μm<λ<2,0μm", " < 0,005"]
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
          optional: "0,05"
        },
        {
          title: "Orientatsiyaning aniqligi",
          sub: "min. of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Ixtiyoriy sirt sifati",
          optional: "0/0",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Yassilik",
          optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallellik",
          sub: "sec.of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Perpendikulyarlik",
          sub: "min.of arc",
          standard: "<30",
          optional: "<10"
        }
      ]
    },
    applications: [
      "R % D va harbiy ilovalar uchun yuqori quvvatli Nd:YAG va Nd:YLF lazerlari",
      "Ti: Safir, Aleksandrit va Cr: LiSAF lazerlari",
      "Tibbiy va sanoat Nd: YAG lazerlari",
      "Diodli lazer pompalanadigan Nd: YVO₄, Nd: YAG va Nd: YLF lazerlari",
      "Nd: YAG va Nd: YLY lazerlarining uchinchi harmonik avlodi (THG).",
      "Optik parametrik kuchaytirgichlar OPA va eksimer lazerlari tomonidan pompalanadigan OPO osilatorlari va Nd: YAG lazerlarining harmoniklari",
      "Ikkinchi garmonik nasl (SHG) va yuqori quvvatli Nd: YAP lazerining 1.34μmdagi uch baravar (THG)"
    ]
  },
  {
    title: "POTASSIUM TITANYL PHOSPHATE KTIOPO₄",
    advantages: ["Keng shaffoflik diapazoni 0,160 µm dan 2,6 µm gacha (SHG diapazoni 0,55 µm dan 2,6 µm gacha)", "keng to'lqin uzunligi diapazonida I va II turdagi kritik bo'lmagan fazalarni moslashtirish (NCPM).", "nisbatan katta samarali SHG koeffitsienti (KDP dan taxminan uch baravar katta)", "yuqori shikastlanish chegarasi (10 ns lazer uchun > 10 GVt/sm², 1,054 µm)", "keng qabul qilish burchagi va kichik yurish", "yuqori optik sifat (bir xillik Δn 10⁴/sm)"],
    images: ["/images/gold1.JPG"],
    route: "lbo",
    specifications: {
      absor: {
        title: "Absorbtsiya yo'qotishlari",
        array: ["1/cm", "0,20μm<λ<2,0μm", " < 0,005"]
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
          optional: "0,05"
        },
        {
          title: "Orientatsiyaning aniqligi",
          sub: "min. of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Ixtiyoriy sirt sifati",
          optional: "0/0",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Yassilik",
          optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallellik",
          sub: "sec.of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Perpendikulyarlik",
          sub: "min.of arc",
          standard: "<30",
          optional: "<10"
        }
      ]
    },
    applications: [
      "R % D va harbiy ilovalar uchun yuqori quvvatli Nd:YAG va Nd:YLF lazerlari",
      "Ti: Safir, Aleksandrit va Cr: LiSAF lazerlari",
      "Tibbiy va sanoat Nd: YAG lazerlari",
      "Diodli lazer pompalanadigan Nd: YVO₄, Nd: YAG va Nd: YLF lazerlari",
      "Nd: YAG va Nd: YLY lazerlarining uchinchi harmonik avlodi (THG).",
      "Optik parametrik kuchaytirgichlar OPA va eksimer lazerlari tomonidan pompalanadigan OPO osilatorlari va Nd: YAG lazerlarining harmoniklari",
      "Ikkinchi garmonik nasl (SHG) va yuqori quvvatli Nd: YAP lazerining 1.34μmdagi uch baravar (THG)"
    ]
  },
  {
    title: "POTASSIUM-GADOLINIUM TUNGSTATE (KGW/KGY)",
    advantages: ["981 nm da yuqori absorbans", "yuqori simulyatsiya qilingan nurlanish kesimi", "lazer nurlari shikastlanishining yuqori chegarasi", "juda kam kvant λnasos/λse", "1023-1060 nm da keng polarizatsiyali chiqish", "diodli nasos bilan yuqori egilish samaradorligi (~ 60%)", "Yb dopingning yuqori konsentratsiyasi"],
    images: ["/images/purple3.JPG"],
    route: "kgw",
    specifications: {
      capabe: {
        title: "ISHLAB CHIQARISH IMKONIYATLARI",
        array: [
          "turli shakllarni ishlab chiqarish (plastinkalar, novdalar, kublar)",
          "turlicha qabul qilingan",
          "har xil turdagi qoplamalar"
        ]
      },
      awd: [
        {
          title: "O'lchamlar uchun ruxsat",
          sub: "mm",
          standard: "0,1",
          optional: "0,05"
        },
        {
          title: "Orientatsiyaning aniqligi",
          sub: "min. of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Ixtiyoriy sirt sifati",
          optional: "0/0",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Yassilik",
          optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallellik",
          sub: "sec.of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Perpendikulyarlik",
          sub: "min.of arc",
          standard: "<30",
          optional: "<10"
        }
      ]
    },
    applications: [
      "Yb: KGW va Yb: KYW ultra qisqa puls kuchaytirgich sifatida ishlatilishi mumkin.",
      "Yb: KGW va Yb KYW yuqori quvvatli disk lazerlari uchun eng yaxshi materiallardan biridir",
      "yupqa (100-150 μm) Yb:KGW va YbKYW kristallari ultra qisqa (yuzlab femtosekundlar) yuqori quvvatli impulslarni (>22 Vt) hosil qilish uchun lazer manbalari sifatida ishlatiladi. Standart nasos 981 nm, chiqishi: 1023-1060 nm."
    ]
  },
  {
    title: "BETA BARIUM BORATE (β-BaB204 OR BBO)",
    advantages: ["410nm dan 3500nm gacha bo'lgan keng fazaga mos keladigan hudud", "190nm dan 3500nm gacha bo'lgan keng uzatish hududi", "Katta samarali ikkinchi garmonik avlod (SHG) koeffitsienti, d11(BBG)=5,8xd36(KDP)", "Yuqori shikastlanish chegarasi (1064 nm da 10 ns impuls kengligi uchun > 5 GVt/sm²)", "Yuqori ixtiyoriy bir xillik Δn 10⁴/sm", "Keng harorat o'tkazuvchanligi taxminan 55 C (I SHG 1064 nm uchun)", "Yaxshi mexanik va fizik xususiyatlar"],
    images: ["/images/transparent2.JPG"],
    route: "bbo",
    specifications: {
      absor: {
        title: "Absorbtsiya yo'qotishlari",
        array: ["1/cm", "0,20μm<λ<2,0μm", " < 0,005"]
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
          optional: "0,05"
        },
        {
          title: "Orientatsiyaning aniqligi",
          sub: "min. of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Ixtiyoriy sirt sifati",
          optional: "0/0",
          sub: "scratch/dig",
          standard: "10/5"
        },
        {
          title: "Yassilik",
          optional: "λ/10",
          sub: "/at λ=0,633 μm",
          standard: "λ/6"
        },
        {
          title: "Parallellik",
          sub: "sec.of arc",
          standard: "<30",
          optional: "<10"
        },
        {
          title: "Perpendikulyarlik",
          sub: "min.of arc",
          standard: "<30",
          optional: "<10"
        }
      ]
    },
    applications: [
      "Nd: lazerlarning ikkinchi, uchinchi, to'rtinchi va beshinchi garmonik avlodlari",
      "Bo'yoq lazerlarining chastotasini ikki baravar oshirish, uch marta oshirish va aralashtirish",
      "Ti:Al₂0₃ va Aleksandrit lazerlarining ikkinchi, uchinchi va toʻrtinchi garmonik avlodlari",
      "Optik parametrik kuchaytirgichlar (OPA) va optik parametrik osilatorlar (OPO)",
      "Chastotani ikki baravar oshirish, ultra qisqa pulsni uch marta oshirish Ti: Safir va Bo'yoq lazerlari",
      "Argon-ion, Cu-bug' va Ruby lazerlarining chastotasini ikki baravar oshirish, tashqi bo'shliq SHG"
    ]
  },
]

const other_products = [
  "Nd:YAG rods;",
  "Crystals of silver thiogallate AgGaS2;",
  "Production of some optical elements of laser technology from glass, fused quartz (mirrors, polarizers);",
  "If we do not have the necessary components, we provide supplies from partner companies with mandatory 100% testing of key parameters at our stands;",
  "Repolishing and coating of Customer's elements;",
  "Carrying out R&D in the field of nonlinear optical elements, etc.;",
  "Creation of optical modulators and elements of laser power optics with unique parameters."
]

const other_products_uz = [
  "Nd:YAG rodlari;",
  "Kumush tiogallat AgGaS2 kristallari;",
  "Shishadan, eritilgan kvartsdan (oyna, polarizator) lazer texnologiyasining ayrim optik elementlarini ishlab chiqarish;",
  "Agar bizda kerakli komponentlar bo'lmasa, biz hamkor kompaniyalardan stendlarimizda asosiy parametrlarni majburiy 100% sinovdan o'tkazgan holda etkazib beramiz;",
  "Buyurtmachi elementlarini qayta jilozlash va qoplash;",
  "Nochiziqli optik elementlar sohasida ilmiy-tadqiqot ishlarini olib borish va boshqalar;",
  "Noyob parametrlarga ega optik modulyatorlar va lazer quvvat optikasi elementlarini yaratish."
]