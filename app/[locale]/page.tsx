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


export default function Index() {
  // const t = useTranslations('Index');
  const title = useRef(null)
  const subTitle = useRef(null)
  const { scrollYProgress } = useScroll();

  return (
    <>
      <main className={styles.main}>
        <div className={styles.entrance}>
          <video autoPlay muted src="/video/intro.mp4" loop />
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
                <motion.div className={styles.arrowDown}>
                  <Image width={17} height={30} src={"/icons/arrowDown.svg"} alt='arrow down icon' />
                </motion.div>
              </motion.div>
              <div className={styles.content}>
                <div className={styles.info}>
                  <p>Sun Simurg Crystals, LLC. supplies nonlinear optical crystals for laser optics and helps you purchase crystal products to complete your laser system</p>
                </div>
                <div className={styles.products}>
                  <ul>
                    <li>
                      <Link href="#">Productions:</Link>
                    </li>
                    <li>
                      <Link href="#">LBO</Link>
                    </li>
                    <li>
                      <Link href="#">BBO</Link>
                    </li>
                    <li>
                      <Link href="#">KTP</Link>
                    </li>
                    <li>
                      <Link href="#">KGW/KYW</Link>
                    </li>
                    <li>
                      <Link href="#">Other</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div id='products' className={`${styles.entrance} ${styles.productsInformations}`}>
          {products.map((e, index) => {
            return <Product advantages={e.advantages} images={e.images} title={e.title} key={Math.random()+`${e.title}`} id={index + 1} />
          })}
        </div>
        <AboutSection />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

function Product({ id, title, advantages, images }: {
  id: number
  title: string
  advantages: string[]
  images: string[]
}) {

  const [ref, inView] = useInView({
    triggerOnce: true
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      console.log("visible");
    } else {
      controls.start("hidden");
      console.log("hidden")
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
  return (
    <Container>
      <section
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
              <h3>Advantages</h3>
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
          }} >KTP</motion.h3>
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

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      console.log("visible");
    } else {
      controls.start("hidden");
      console.log("hidden")
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
            }}>About Company <motion.span initial={"onLoad"} animate="entrance" variants={{
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
                <p>Sun Simurg Crystals, LLC. Is the first commercial company
                  in the RU market supplying nonlinear optical crystals for
                  laser optics. our company has reliable partnerships
                  with crystal growth production facilities of other
                  companies, and also helps to purchase crystal
                  products for completing laser systems in other
                  countries. nonlinear optical elements supplied....
                </p>
                <Link className={styles.details} href={"/"}>
                  Read more
                  <Image src={"/icons/vector.svg"} width={16} height={16} alt='45 degree icon' />
                </Link>
              </div>
              <div className={styles.rightSide}>
                <h3>16+ years</h3>
                <h4>
                  INTERNATIONAL EXPERIENCE IN THE
                  CONSTRUCTION INDUSTRY (MORE
                  THAN 20 CONSTRUCTION PROJECTS
                  HAVE BEEN COMMISSIONED)
                </h4>
                <h3>2019</h3>
                <h4>ACtivities started in russia </h4>
                <h3>
                  4
                </h3>
                <h4>Facility in  russia</h4>
                <h4>2- Designed</h4>
                <h4>1-under construction</h4>
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
      console.log("visible");
    } else {
      controls.start("hidden");
      console.log("hidden")
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
                <h3>CONSULTATION
                  SPECIALISTS
                </h3>
                <form action="#">
                  <input type="text" maxLength={25} required placeholder='Your name' />
                  <input type="text" maxLength={13} required placeholder='Phone number' />
                  <button className={styles.submit}>Submit</button>
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
    advantages: ["broad transparency range from 0.160 µm to 2.6 µm (SHG range from 0.55 µm to 2.6 µm)", "typw I and type II non-critical phase-matching (NCPM) over a wide wavelengtht range", "relatively large effective SHG coefficient (about three times larger than that of KDP)", "high damage threshold (> 10 GW/cm² for 10 ns laser at 1.054 µm)", "wide acceptance angle and small walk-off", "high optical quality (homogeneity Δn 10⁴/cm)"],
    images: ["/images/blue1.JPG", "/images/blue2.JPG", "/images/blue3.JPG"]
  },
  {
    title: "POTASSIUM TITANYL PHOSPHATE KTIOPO₄",
    advantages: ["broad transparency range from 0.160 µm to 2.6 µm (SHG range from 0.55 µm to 2.6 µm)", "typw I and type II non-critical phase-matching (NCPM) over a wide wavelengtht range", "relatively large effective SHG coefficient (about three times larger than that of KDP)", "high damage threshold (> 10 GW/cm² for 10 ns laser at 1.054 µm)", "wide acceptance angle and small walk-off", "high optical quality (homogeneity Δn 10⁴/cm)"],
    images: ["/images/blue1.JPG", "/images/blue2.JPG"]
  }
]
