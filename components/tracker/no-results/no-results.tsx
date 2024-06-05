import { Button, Flowbite } from 'flowbite-react';

interface NoResultsProps {
	onRetry: () => void;
}

export default function NoResults({ onRetry }: NoResultsProps) {
	
    const customTheme = {
        button: {
		  color: {
                primary: 'bg-primary-500 hover:bg-primary-600 text-white',
		  },
        },
	  };

    return (
        <div data-testid="assents-no-results" className={[
            'flex',
            'flex-col',
            'w-full',
            'h-fit',
            'bg-neutral-100 dark:bg-neutral-800',
            'rounded-md',
            'p-6',
            'items-center',
            'self-center'
        	].join(' ')}
        >
            <h1 data-testid="assents-no-results-title" className={[
                'text-md',
                'mb-1',
                'flex',
                'gap-1'
            	].join(' ')}
            >
                <span>No results</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 self-center">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>

            </h1>
            <h2 data-testid="assents-no-results-description" className={[
                'text-md',
                'mb-4'
            	].join(' ')}
            >
                Would you like to try again?
            </h2>
            <Flowbite theme={{ theme: customTheme }}>
                <Button data-testid="assets-no-results-retry-button" className='w-24 h-24 flex flex-wrap content-center rounded-full self-center' onClick={onRetry} fullSized color="primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 flex self-center hover:rotate-90">
                    	<path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                	</svg>
                </Button>
            </Flowbite>
            
        </div>
    );
}
