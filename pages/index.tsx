import Head from 'next/head';
import styled from 'styled-components';
import styles from '../styles/Home.module.css';
import useTranslation from 'next-translate/useTranslation';

const StyledDiv = styled.div`
  padding: 40px;
  font-size: 24px;
  color: black;
`;

export default function Home() {
  const { t } = useTranslation('landing');
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>
        <StyledDiv>{t('greeting')}</StyledDiv>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
