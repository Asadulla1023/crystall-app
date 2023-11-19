import { Metadata } from 'next';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import "@/styles/globals.css"
import { motion } from "framer-motion"
import Header from './components/global/Header';
import Footer from './components/global/Footer';
const locales = ['en', 'uz'];

export const metadata: Metadata = {
  title: 'Crystal shop',
  description: 'Sun Simurg Crystals, LLC. supplies nonlinear optical crystals for laser optics and helps you purchase crystal products to complete your laser system',
  icons: "/icons/logo.svg",
  openGraph: {
    title: "Sun Simurg Crystals, LLC. supplies nonlinear optical crystals for laser optics and helps you purchase crystal products to complete your laser system"
  }
}

export default function LocaleLayout({ children, params: { locale } }: {
  children: React.ReactNode,
  params: {
    locale: string
  }
}) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}