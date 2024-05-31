import { useMemo } from 'react';

interface TrackerTableSkeletonProps {
	recordsNumber: number
}

function TableRecords({ recordsNumber }: TrackerTableSkeletonProps) {

    return (
        <div>
            { [...Array(recordsNumber)].map((element, index) => (
                <div key={index} className='w-full h-[72px] flex gap-6 p-6 dark:bg-neutral-800'>
                    <div className="flex-1 h-full flex flex-wrap gap-6 items-center content-center">
                        <div className="flex-0 w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-300" />
                        <div className="flex-1 h-6 bg-neutral-200 dark:bg-neutral-300" />
                    </div>
                    <div className="flex-[2] lg:flex-[3] flex flex-wrap items-center">
                        <div className="flex-1 h-6 bg-neutral-200 dark:bg-neutral-300" />
                    </div>
        	</div>
            ))}
        </div>
    );
}

export default function TrackerTableSkeleton({ recordsNumber }: TrackerTableSkeletonProps) {

    return (
        <div data-testid="tracker-table-skeleton" className={['w-full h-fit bg-neutral-50 animate-pulse rounded-lg'].join(' ')}>
            <div className="w-full bg-neutral-100 dark:bg-neutral-600 flex flex-wrap items-center gap-4 p-4 rounded-t-lg">
                <div className="flex-1 h-4 bg-neutral-200 dark:bg-neutral-300" />
                <div className="flex-1 h-4 bg-neutral-200 dark:bg-neutral-300" />
                <div className="flex-1 h-4 bg-neutral-200 dark:bg-neutral-300" />
                <div className="flex-1 h-4 bg-neutral-200 dark:bg-neutral-300" />
                <div className="flex-1 h-4 bg-neutral-200 dark:bg-neutral-300" />
                <div className="flex-1 h-4 bg-neutral-200 dark:bg-neutral-300" />
            </div>

            <hr></hr>

            <div>
                <TableRecords recordsNumber={recordsNumber} />
            </div>

            <div className=" w-full h-[98px] bg-neutral-100 dark:bg-neutral-600 flex flex-wrap gap-6 justify-center content-center rounded-b-lg">
                <div className="flex-0 w-8 h-10 rounded-full bg-neutral-200 dark:bg-neutral-300" />
                <div className="flex-0 w-8 h-10 rounded-full bg-neutral-200 dark:bg-neutral-300" />
                <div className="flex-0 w-8 h-10 rounded-full bg-neutral-200 dark:bg-neutral-300" />
                <div className="flex-0 w-8 h-10 rounded-full bg-neutral-200 dark:bg-neutral-300" />
                <div className="flex-0 w-8 h-10 rounded-full bg-neutral-200 dark:bg-neutral-300" />
                <div className="flex-0 w-8 h-10 rounded-full bg-neutral-200 dark:bg-neutral-300" />
            </div>
        </div>
    );
}
