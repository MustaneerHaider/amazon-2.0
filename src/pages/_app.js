import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import ProgressBar from '@badrap/bar-of-progress';
import { Router } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '../app/store';

const progressBar = new ProgressBar({
	size: 4,
	color: '#FF9900',
	className: 'z-50',
	delay: 100
});

Router.events.on('routeChangeStart', progressBar.start);
Router.events.on('routeChangeComplete', progressBar.finish);
Router.events.on('routeChangeError', progressBar.finish);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</SessionProvider>
	);
}

export default MyApp;
