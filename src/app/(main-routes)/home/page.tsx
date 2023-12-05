import dynamic from 'next/dynamic';

const HomeContainerNoSSR = dynamic(() => import('@/container/Home'), { ssr: false });

const HomePage = () => {
	return <HomeContainerNoSSR />;
};

export default HomePage;
