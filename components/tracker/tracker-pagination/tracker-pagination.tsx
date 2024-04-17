'use client';

import './tracker-pagination.css';
import ResponsivePagination from 'react-responsive-pagination';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames';

interface TrackerPaginationProps {
	currentPage: number;
	setCurrentPage: Dispatch<SetStateAction<number>>
	totalPages: number
}

export default function TrackerPagination({ currentPage, setCurrentPage, totalPages }: TrackerPaginationProps) {

    const [shouldHide, setShouldHide] = useState(true);

    useEffect(() => {
        setShouldHide(false);
    }, []);

    return (
        <div 
            data-testid="tracker-pagination"
            className={[
                'mb-6',
                'mx-auto',
                'w-56 sm:w-[32rem]',
                'min-h-10'].join(' ')
            }
        >
            <ResponsivePagination
                total={totalPages}
                current={currentPage}
                onPageChange={setCurrentPage}
                className={classNames([
                    'inline-flex',
                    'w-full',
                    'justify-center'
                	].join(' '), 
                	{
                    	'hidden': shouldHide
                	})
                }
                pageItemClassName={[
                    'w-8',
                    'h-10',
                    'rounded-full',
                    'mr-2',
                    'shrink-0',
                    'pointer',
                    'hover:bg-primary-500/10'
                ].join(' ')
                }
                activeItemClassName={[
                    'bg-primary-500 hover:!bg-primary-500',
                    'text-white'
                ].join(' ')
                }
                pageLinkClassName={[
                    'w-full',
                    'h-full',
                    'flex',
                    'justify-center',
                    'content-center',
                    'flex-wrap',
                    'shrink-0'
                ].join(' ')
                }
                previousClassName={[
                    'border-none',
                    'text-3xl',
                    'navigation-span-pointer',
                    'hover:scale-110'
                ].join(' ')
                }
                nextClassName={[
                    'border-none',
                    'text-3xl',
                    'navigation-span-pointer',
                    'hover:scale-110'
                ].join(' ')
                }
            />
        </div>
    );
}
