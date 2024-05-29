import { Button, Flowbite } from 'flowbite-react';

interface NoResultsProps {
	onRetry: () => void;
}

export default function NoResults({ onRetry }: NoResultsProps) {
	
    const customTheme = {
        button: {
		  color: {
                primary: 'bg-blue-500/80 hover:bg-blue-500 border border-white text-white',
		  },
        },
	  };

    return (
        <div data-testid="assents-no-results" className={[
            'w-[26rem]',
            'h-32',
            'bg-red-300',
            'rounded-md',
            'p-6'
        	].join(' ')}
        >
            <h1 data-testid="assents-no-results-message" className={[
                'text-md',
                'mb-4'
            	].join(' ')}
            >
				No results. Would you like to try again?
            </h1>
            <Flowbite theme={{ theme: customTheme }}>
                <Button data-testid="assets-no-results-retry-button" onClick={onRetry} fullSized color="primary">
					Retry 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-2 flex self-center">
                    	<path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                	</svg>
                </Button>
            </Flowbite>
            
        </div>
    );
}
