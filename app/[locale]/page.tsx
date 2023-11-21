"use client"
import { useTranslations } from 'next-intl';
import styles from "@/styles/home/index.module.css"
import Header from './components/global/Header';
import Container from './components/local/utils/Container';
import Image from 'next/image';
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
  useAnimation
} from 'framer-motion';
import Link from 'next/link';

import { inView } from "framer-motion/dom"
import { useInView } from 'react-intersection-observer';
import { easing } from '@/utils/animations';
import Footer from './components/global/Footer';
import { usePathname, useRouter } from 'next/navigation';


export default function Index() {
  // const t = useTranslations('Index');
  const title = useRef(null)
  const entrance = useTranslations("Entrance")
  const subTitle = useRef(null)
  const { scrollYProgress } = useScroll();
  const pathname = usePathname()
  const l = pathname.split("/")
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [])
  const videoRef = useRef<HTMLVideoElement | any>()
  console.log(isLoading);
  return (
    <>
      <main className={styles.main}>
        <div className={styles.entrance}>
          <video ref={videoRef} autoPlay muted src="/video/intro.mp4" loop />
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
                }}>Sun Semurg</motion.h1>
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
                      <Link href="#products">{entrance("others")}</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div id='products' className={`${styles.entrance} ${styles.productsInformations}`}>
          {l[1] == "" ? UZ_PRODUCTS.map((e, index) => {
            return <Product route={e.route} advantages={e.advantages} images={e.images} title={e.title} key={Math.random() + `${e.title}`} id={index + 1} />
          }) : products.map((e, index) => {
            return <Product route={e.route} advantages={e.advantages} images={e.images} title={e.title} key={Math.random() + `${e.title}`} id={index + 1} />
          })}
        </div>
        <AboutSection />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

function Product({ id, title, advantages, images, route }: {
  id: number
  title: string
  advantages: string[]
  images: string[],
  route: string
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
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      rubberband: false,
      vertical: true,
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [WheelControls]
  )

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
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
          <motion.div variants={{
            hidden: {
              opacity: 0,
              x: -50
            },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 1
              }
            }
          }} className={styles.productInformation}>
            <div className={styles.infoTop}>
              <motion.h2 className="h2">{title}</motion.h2>
              <div className={styles.circle}>{id}</div>
            </div>
            <div className={styles.productAdvantages}>
              <h3>{pathname.split("/")[1] === "" ? "Afzalliklar" : "Advantages"}</h3>
              <div className={styles.advantagesWrapper}>
                {advantages.map(e => {
                  return <div key={e} className={styles.advantage}>
                    <Image src={"/icons/shape.svg"} alt='shape icon' width={15} height={15} />
                    <h3>{e}</h3>
                  </div>
                })}
              </div>
            </div>
          </motion.div>
          <motion.h3 variants={{
            hidden: {
              opacity: 0,
              scale: .8
            },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 1
              }
            }
          }} >{route.toLocaleUpperCase()}</motion.h3>
          <motion.div variants={{
            hidden: {
              opacity: 0,
              scale: .8
            },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 1
              }
            }
          }} ref={sliderRef} className={`keen-slider ${styles.slider}`} style={{ height: 500 }}>
            {images.map((e, index) => {
              return <div key={e} className={`keen-slider__slide number-slide${id} ${styles.slide}`}>
                <Image src={e} width={500} height={650} alt='some image' />
              </div>
            })}
          </motion.div>
          {loaded && instanceRef.current && (
            <div className={`${styles.dots} dots`}>
              {images.slice(0, images.length).map((idx, index) => {
                return (
                  <button
                    key={index * Math.random() ** 44}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(index)
                    }}
                    className={"dot" + (currentSlide === index ? " active" : "")}
                  ></button>
                )
              })}
            </div>
          )}
          {/* <Link className={styles.details} href={"/"}>
            Details
            <Image src={"/icons/vector.svg"} width={16} height={16} alt='45 degree icon' />
          </Link> */}
        </motion.div>
      </section>
    </Container>
  );
}

const WheelControls: KeenSliderPlugin = (slider) => {
  let touchTimeout: ReturnType<typeof setTimeout>
  let position: {
    x: number
    y: number
  }
  let wheelActive: boolean

  function dispatch(e: WheelEvent, name: string) {
    position.x -= e.deltaX
    position.y -= e.deltaY
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      })
    )
  }

  function wheelStart(e: WheelEvent) {
    position = {
      x: e.pageX,
      y: e.pageY,
    }
    dispatch(e, "ksDragStart")
  }

  function wheel(e: WheelEvent) {
    dispatch(e, "ksDrag")
  }

  function wheelEnd(e: WheelEvent) {
    dispatch(e, "ksDragEnd")
  }

  function eventWheel(e: WheelEvent) {
    e.preventDefault()
    if (!wheelActive) {
      wheelStart(e)
      wheelActive = true
    }
    wheel(e)
    clearTimeout(touchTimeout)
    touchTimeout = setTimeout(() => {
      wheelActive = false
      wheelEnd(e)
    }, 50)
  }

  slider.on("created", () => {
    slider.container.addEventListener("wheel", eventWheel, {
      passive: false,
    })
  })
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
              }}>Sun semurg crystals</motion.h1>
              <div className={styles.shadow} />
            </div>
            <div className={styles.inform}>
              <div className={styles.leftSide}>
                <div className={styles.logoDesign}>
                  <h3>LOGO DESIGN</h3>
                </div>
                <p>{company("description")}
                </p>
                <Link className={styles.details} href={"/"}>
                  {company("read")}
                  <Image src={"/icons/vector.svg"} width={16} height={16} alt='45 degree icon' />
                </Link>
              </div>
              <div className={styles.rightSide}>
                <h3>{company("years")}</h3>
                <h4>
                  {company("works")}
                </h4>
                <h3>2019</h3>
                <h4>{company("activities")}</h4>
                <h3>
                  4
                </h3>
                <h4>{company("inrussia")}</h4>
                <h4>2- {company("designed")}</h4>
                <h4>1-{company("construction")}</h4>
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
  const contact = useTranslations("Contacts")
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
                <Image src={"/images/alm.png"} width={530} height={300} alt='image' />
              </div>
              <div className={styles.leftSide}>
                <h3>{contact("title")}
                </h3>
                <form action="#">
                  <input type="text" maxLength={25} required placeholder={contact("name")} />
                  <input type="text" maxLength={13} required placeholder={contact("phone")} />
                  <button className={styles.submit}>{contact("button")}</button>
                </form>
              </div>
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
    images: ["/images/blue1.JPG", "/images/blue2.JPG", "/images/blue3.JPG"],
    route: "ktp"
  },
  {
    title: "Lithium Triborate (LiB3O5 or LBO)",
    advantages: ["broad transparency range from 0.160 µm to 2.6 µm (SHG range from 0.55 µm to 2.6 µm)", "type I and type II non-critical phase-matching (NCPM) over a wide wavelength range", "relatively large effective SHG coefficient (about three times larger than that of KDP)", "high damage threshold (> 10 GW/cm² for 10 ns laser at 1.054 µm)", "wide acceptance angle and small walk-off", "high optical quality (homogeneity Δn 10⁴/cm)"],
    images: ["/images/gold1.JPG","/images/gold2.JPG"],
    route: "lbo"
  },
  {
    title: "POTASSIUM-GADOLINIUM TUNGSTATE (KGW/KGY)",  
    advantages: ["high absorbance at 981 nm", "high simulated radiation cross section", "high threshold of laser beam damage", "very low quantum defect λpump/λse", "wide polarized output at 1023-1060 nm", "high tilt efficiency with diode pumping (~60%)", "high concentration of Yb doping"],
    images: ["/images/purple1.JPG", "/images/purple2.JPG", "/images/purple3.JPG", "/images/purple4.JPG"],
    route: "kgw"
  },
  {
    title: "BETA BARIUM BORATE (β-BaB2O4 OR BBO)",
    advantages: ["Broad phase-matchable region from 410nm to 3500nm", "Wide transmission region from 190nm to 3500nm", "Large effective second-harmonic-generation (SHG) coefficent, d11(BBG)=5,8xd36(KDP)", "High damage threshold of (> 5GW/cm² for 10ns pulse-width at 1064 nm)", "High optional homogeneity Δn 10⁴/cm", "Wide temperature-bandwidth of about 55 C (for type I SHG 1064 nm)", "Good mechanical and physical properties"],
    images: ["/images/transparent1.JPG", "/images/transparent2.JPG"],
    route: "bbo"
  },
]

const UZ_PRODUCTS = [
  {
    title: "POTASSIUM TITANYL PHOSPHATE KTIOPO₄",
    advantages: ["Keng shaffoflik diapazoni 0,160 µm dan 2,6 µm gacha (SHG diapazoni 0,55 µm dan 2,6 µm gacha)", "keng to'lqin uzunligi diapazonida I va II turdagi kritik bo'lmagan fazalarni moslashtirish (NCPM).", "nisbatan katta samarali SHG koeffitsienti (KDP dan taxminan uch baravar katta)", "yuqori shikastlanish chegarasi (10 ns lazer uchun > 10 GVt/sm², 1,054 µm)", "keng qabul qilish burchagi va kichik yurish", "yuqori optik sifat (bir xillik Δn 10⁴/sm)"],
    images: ["/images/blue1.JPG", "/images/blue2.JPG", "/images/blue3.JPG"],
    route: "ktp"
  },
  {
    title: "POTASSIUM TITANYL PHOSPHATE KTIOPO₄",
    advantages: ["Keng shaffoflik diapazoni 0,160 µm dan 2,6 µm gacha (SHG diapazoni 0,55 µm dan 2,6 µm gacha)", "keng to'lqin uzunligi diapazonida I va II turdagi kritik bo'lmagan fazalarni moslashtirish (NCPM).", "nisbatan katta samarali SHG koeffitsienti (KDP dan taxminan uch baravar katta)", "yuqori shikastlanish chegarasi (10 ns lazer uchun > 10 GVt/sm², 1,054 µm)", "keng qabul qilish burchagi va kichik yurish", "yuqori optik sifat (bir xillik Δn 10⁴/sm)"],
    images: ["/images/gold1.JPG","/images/gold3.png"],
    route: "lbo"
  },
  {
    title: "POTASSIUM-GADOLINIUM TUNGSTATE (KGW/KGY)",
    advantages: ["981 nm da yuqori absorbans", "yuqori simulyatsiya qilingan nurlanish kesimi", "lazer nurlari shikastlanishining yuqori chegarasi", "juda kam kvant λnasos/λse", "1023-1060 nm da keng polarizatsiyali chiqish", "diodli nasos bilan yuqori egilish samaradorligi (~ 60%)", "Yb dopingning yuqori konsentratsiyasi"],
    images: ["/images/purple1.JPG", "/images/purple2.JPG", "/images/purple3.JPG", "/images/purple4.JPG"],
    route: "kgw"
  },
  {
    title: "BETA BARIUM BORATE (β-BaB204 OR BBO)",
    advantages: ["410nm dan 3500nm gacha bo'lgan keng fazaga mos keladigan hudud", "190nm dan 3500nm gacha bo'lgan keng uzatish hududi", "Katta samarali ikkinchi garmonik avlod (SHG) koeffitsienti, d11(BBG)=5,8xd36(KDP)", "Yuqori shikastlanish chegarasi (1064 nm da 10 ns impuls kengligi uchun > 5 GVt/sm²)", "Yuqori ixtiyoriy bir xillik Δn 10⁴/sm", "Keng harorat o'tkazuvchanligi taxminan 55 C (I SHG 1064 nm uchun)", "Yaxshi mexanik va fizik xususiyatlar"],
    images: ["/images/transparent1.JPG", "/images/transparent2.JPG"],
    route: "bbo"
  },
]