import '../styles/global.css';

import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import Navbar from '@/templates/Navbar';
import { Notifications } from '@mantine/notifications';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <Notifications/>
    <Navbar links={[
      {link:'/',label:'Home'},
      {link:'/todo/',label:'To Do',private:true},
      {link:'/auth/',label:'Login',private:false},
      {link:'/logout/',label:'logout',private:true},
    ]}/>
    <Component {...pageProps} />
  </MantineProvider>
);

export default MyApp;
