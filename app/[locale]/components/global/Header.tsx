"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/styles/utils/header.module.css"
import Container from '../local/utils/Container'
import Link from 'next/link'
import Image from 'next/image'
import { motion, stagger, useAnimate } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate();
    useEffect(() => {
        if (scope.current) {
            const menuAnimations = isOpen
                ? [
                    [
                        "nav",
                        { transform: "translateX(0%)" },
                        { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 }
                    ],
                    [
                        "li",
                        { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
                        { delay: stagger(0.05), at: "-0.1" }
                    ]
                ]
                : [
                    [
                        "li",
                        { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
                        { delay: stagger(0.05, { from: "last" }), at: "<" }
                    ],
                    ["nav", { transform: "translateX(-100%)" }, { at: "-0.1" }]
                ];

            animate([
                [
                    "path.top",
                    { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
                    { at: "<" }
                ],
                ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
                [
                    "path.bottom",
                    { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
                    { at: "<" }
                ],
                // @ts-ignore
                ...menuAnimations
            ]);
        }
    }, [isOpen, scope, animate]);
    return scope;
}

const Header = () => {
    const t = useTranslations("Header")
    const [isOpen, setIsOpen] = useState(false);
    const [langugae, setLanguage] = useState(false)
    const lang = useMenuAnimation(langugae);
    const scope = useMenuAnimation(isOpen);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [nav, setNav] = useState(false);
    const { push } = useRouter()
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset;
            if (currentScrollPosition > lastScrollPosition && isHeaderVisible) {
                setIsHeaderVisible(false);
            } else if (
                currentScrollPosition < lastScrollPosition &&
                !isHeaderVisible
            ) {
                setIsHeaderVisible(true);
            }
            setLastScrollPosition(currentScrollPosition);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isHeaderVisible, lastScrollPosition]);
    const changeBgHandler = () => {
        if (window.scrollY >= 16) {
            setNav(true);
            setLanguage(false)
        } else {
            setLanguage(false)
            setNav(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", changeBgHandler);
    });
    const pathname = usePathname()
    return (
        <div style={
            isHeaderVisible === true
                ? {
                    transition: "0.3s",
                    opacity: 1,
                    transform: "translate3d(0px, 0px, 0px)",
                }
                : {
                    opacity: 0,
                    transform: "translate3d(0px, -113px, 0px)",
                    transition: "0.3s",
                }
        } className={!nav ? styles.header : styles.headerNav}>
            <Container>
                <div className={styles.content}>
                    <Link href={"#home"} onClick={(e: {
                        preventDefault: () => void
                    }) => {
                        e.preventDefault()
                        push("#home")
                    }} className={styles.logo}>
                        <Image src={"/icons/logo.svg"} width={30} height={30} alt='logo' />
                    </Link>
                    <nav className={styles.navigator}>
                        <ul className={styles.navigatorList}>
                            <li className={styles.navigate}>
                                <Link href={"#aboutUs"}>{t("about")}</Link>
                            </li>
                            <li className={styles.navigate}>
                                <Link href={"#contact"}>{t("contact")}</Link>
                            </li>
                            <div className={styles.language}>
                                <button
                                    onClick={() => {
                                        push("/en")
                                    }}
                                >
                                    Eng
                                </button>
                                <button>|</button>
                                <button
                                    onClick={() => {
                                        push("/uz")
                                    }}
                                >
                                    O{"'"}zb
                                </button>
                            </div>
                        </ul>
                    </nav>
                    <div ref={scope}>
                        <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
                        <MenuToggle toggle={() => setIsOpen(!isOpen)} />
                    </div>
                </div>
            </Container>
        </div>
    )
}

const Path = (props: any) => (
    <path
        fill="transparent"
        strokeWidth="3"
        stroke="var(--background)"
        strokeLinecap="round"
        {...props}
    />
);
export function Menu({ isOpen, setIsOpen }: {
    setIsOpen: Function,
    isOpen: boolean
}) {
    const { push } = useRouter()
    const pathname = usePathname()
    const t = useTranslations("Header")
    return (
        <nav className={styles.menu}>
            <Link href={"#home"} onClick={(e: {
                preventDefault: () => void
            }) => {
                e.preventDefault()
                push("#home")
            }} className={styles.logo}>
                <Image src={"/icons/logo.svg"} width={20} height={20} alt='logo' />
            </Link>
            <ul>
                <li><Link onMouseDown={() => {
                    setIsOpen(!isOpen)
                }} href={"#aboutUs"}>{t("about")}</Link></li>
                <li><Link onMouseDown={() => {
                    setIsOpen(!isOpen)
                }} href={"#contact"}>{t("contact")}</Link></li>
                <div className={styles.language}>
                    <button
                        onClick={() => {
                            push("/en")
                        }}
                    >
                        Eng
                    </button>
                    <button>|</button>
                    <button
                        onClick={() => {
                            push("/uz")
                        }}
                    >
                        O{"'"}zb
                    </button>
                </div>
            </ul>
        </nav>
    );
}


const MenuToggle = ({ toggle }: any) => (
    <button className={styles.menuOpener} onClick={toggle}>
        <svg width="23" height="18" viewBox="0 0 23 18">
            <Path
                d="M 2 2.5 L 20 2.5"
                className={styles.top}
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" }
                }}
            />
            <Path d="M 2 9.423 L 20 9.423" opacity="1" className={styles.middle} />
            <Path
                d="M 2 16.346 L 20 16.346"
                className={styles.bottom}
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" }
                }}
            />
        </svg>
    </button>
);


export default Header