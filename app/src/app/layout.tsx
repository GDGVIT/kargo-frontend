import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import { AuthProvider } from '../components/Auth/AuthProvider/AuthProvider';
import { NotificationProvider } from '../components/ui/Notification/Notification';
import Header from '../components/ui/Header/Header';
import Footer from '../components/ui/Footer/Footer';
import Sidebar from '../components/ui/Sidebar/Sidebar';
import AcceptCookies from '../components/AcceptCookies/AcceptCookies';
import LayoutWrapper from '../components/ui/LayoutWrapper/LayoutWrapper';
import ServiceWorkerRegister from '../components/ServiceWorkerRegister/ServiceWorkerRegister';

export const metadata: Metadata = {
  title: 'Kargo',
  description:
    'Kargo lets you deploy containerized applications with full flexibility — AI-powered setup, secure infrastructure, and Kubernetes-native scaling, all from a powerful web interface.',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
    shortcut: '/icon.svg',
  },
  openGraph: {
    title: 'Kargo',
    description:
      'Kargo lets you deploy containerized applications with full flexibility — AI-powered setup, secure infrastructure, and Kubernetes-native scaling, all from a powerful web interface.',
    url: 'https://kargo.dscvit.com',
    siteName: 'Kargo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kargo Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kargo',
    description:
      'Kargo lets you deploy containerized applications with full flexibility — AI-powered setup, secure infrastructure, and Kubernetes-native scaling, all from a powerful web interface.',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  appleWebApp: {
    capable: true,
    title: 'Kargo',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  metadataBase: new URL('https://kargo.dscvit.com'),
  alternates: {
    canonical: 'https://kargo.dscvit.com',
    types: {
      'application/rss+xml': '/feed.xml',
      'application/atom+xml': '/feed.atom',
    },
    languages: {
      'en-US': '/',
      'en-GB': '/gb',
      'fr-FR': '/fr',
      'es-ES': '/es',
      'de-DE': '/de',
    },
  },
  keywords: [
    'kargo',
    'deployment',
    'containerized applications',
    'kubernetes',
    'AI-powered setup',
    'secure infrastructure',
    'web interface',
    'scaling',
    'devops',
    'cloud-native',
    'microservices',
    'application management',
    'CI/CD',
    'continuous integration',
    'continuous deployment',
    'infrastructure as code',
  ],
  authors: [
    {
      name: 'Upayan Mazumder',
      url: 'https://dscvit.com',
    },
  ],
  applicationName: 'Kargo',
  publisher: 'GDGVIT',
  category: 'Technology',
};

export const viewport = {
  themeColor: '#1f2432',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script src="/env.js" strategy="beforeInteractive" />
        <NotificationProvider>
          <AuthProvider>
            <Sidebar />
            <LayoutWrapper>
              <Header />
              {children}
              <Footer />
              <ServiceWorkerRegister />
            </LayoutWrapper>
            <AcceptCookies />
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
