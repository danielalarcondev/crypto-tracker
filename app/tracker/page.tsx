import Tracker from '@components/tracker/tracker';

export default function TrackerPage() {

    return (
        <div>
            <div 
                className={[
                    'mb-8', 
                    'pl-2 md:pl-0'
                ].join(' ')
                }
            >
            	<h1
                    data-testid="tracker-page-title"
                    className={[
                        'text-2xl', 
                        'font-bold'
                    ].join(' ')
                    }
                >
					Tracker
                </h1>
                <h2
                    data-testid="tracker-page-subtitle"
                    className={[
                        'flex', 
                        'flex-wrap'
                    	].join(' ')
                    }
                >
					Today&apos;s Cryptocurrency Prices by Market Cap
                </h2>
            </div>

            <Tracker  />
        </div>
    );
}
