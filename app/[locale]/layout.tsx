import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import "@/styles/globals.css"
import Header from './components/global/Header';
const locales = ['en', 'uz']
import { NextIntlClientProvider } from 'next-intl';import { unstable_setRequestLocale } from 'next-intl/server';
;

export const metadata: Metadata = {
  title: 'Crystal shop',
  description: 'Sun Simurg Crystals, LLC. supplies nonlinear optical crystals for laser optics and helps you purchase crystal products to complete your laser system',
  icons: "/icons/logo.svg",
  openGraph: {
    title: "Sun Simurg Crystals, LLC. supplies nonlinear optical crystals for laser optics and helps you purchase crystal products to complete your laser system"
  }
}
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'uz' }];
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
  if (!locales.includes(locale as any)) notFound();
 
  unstable_setRequestLocale(locale);
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