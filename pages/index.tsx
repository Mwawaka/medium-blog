import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Post from "../components/Post";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>|Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <Post/>
    </div>
  );
};

export default Home;
