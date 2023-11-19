import { Metadata } from 'next';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import "@/styles/globals.css"
import { motion } from "framer-motion"
import Header from './components/global/Header';
import Footer from './components/global/Footer';
const locales = ['en', 'uz']
import { NextIntlClientProvider } from 'next-intl';;

export const metadata: Metadata = {
  title: 'Crystal shop',
  description: 'Sun Simurg Crystals, LLC. supplies nonlinear optical crystals for laser optics and helps you purchase crystal products to complete your laser system',
  icons: "/icons/logo.svg",
  openGraph: {
    title: "Sun Simurg Crystals, LLC. supplies nonlinear optical crystals for laser optics and helps you purchase crystal products to complete your laser system"
  }
}
export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'uz' }];
}


export default async function LocaleLayout({ children, params: { locale } }: {
  children: React.ReactNode,
  params: {
    locale: string
  }
}) {
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}