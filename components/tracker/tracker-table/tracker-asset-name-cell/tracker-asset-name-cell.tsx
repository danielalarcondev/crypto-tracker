'use client';

import React, { SyntheticEvent } from 'react';
import Image from 'next/image';

import { TableCell } from 'flowbite-react';

interface TrackerAssetNameCellProps {
	name: string;
	symbol: string;
}

export default function TrackerAssetNameCell({ name, symbol }: TrackerAssetNameCellProps) {

    const iconUrl = `https://assets.coincap.io/assets/icons/${symbol.toLocaleLowerCase()}@2x.png`;
    const defaultUrl = '/logo.svg';

    const onImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
        (event.target as HTMLImageElement).src = defaultUrl;
    };

    return (
        <TableCell 
            className={[
                'flex', 
                'w-fit', 
                'max-w-32', 
                'gap-2', 
                'whitespace-nowrap', 
                'font-medium', 
                ['text-gray-900', 'dark:text-white'].join(' ')]
                .join(' ')
            }
        >
            <Image 
                width={32}
                height={32}
                src={iconUrl}
                alt="icon"
                onError={onImageError}
                className={[
                    'w-8', 
                    'h-8'
                	].join(' ')
                }
            />
            <div 
                className={[
                    'flex', 
                    'flex-col', 
                    'self-center'
                	].join(' ')
                }
            >
                <span 
                    className={[
                        'font-bold'
                    ].join(' ')
                    }
                >
                    {name}
                </span>
                <small 
                    className={[
                        'text-neutral-400', 
                        'pl-0.5'
                    ].join(' ')
                    }
                >
                    {symbol}
                </small>
            </div>
        </TableCell>
    );
}
