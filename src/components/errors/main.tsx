// import { Button } from '../ui/button';

export const MainErrorFallback = () => {
	return (
		<div
			// Todo: define alert
			role="alert"
		>
			<h2>Ooops, something went wrong :( </h2>
			<button
				onClick={() => window.location.assign(window.location.origin)}
			>
				Refresh
			</button>
		</div>
	);
};