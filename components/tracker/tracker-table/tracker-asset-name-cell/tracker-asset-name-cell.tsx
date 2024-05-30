'use client';

import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { TableCell } from 'flowbite-react';
import { getAssetIconUrl } from '../../../../services/assets/assets';

interface TrackerAssetNameCellProps {
	name: string;
	symbol: string;
	id: string;
}

export const defaultAssetIconUrl = '/logo.svg';
export const loadingAssetIconUrl = '/loading-icon.png';

export default function TrackerAssetNameCell({ name, symbol, id }: TrackerAssetNameCellProps) {

    const [assetIconUrl, setAssetIconUrl] = useState<string | null>(null);
    const isFirstImageError = useRef(true);
	
    const onImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {

        if (isFirstImageError.current) {

            getAssetIconUrl(id).then((url) => {
                setAssetIconUrl(url);
            });

            isFirstImageError.current = false;
        }


        setAssetIconUrl(defaultAssetIconUrl);
        (event.target as HTMLImageElement).removeAttribute('srcset');
    };
	
    useEffect(() => {
        getAssetIconUrl(symbol).then((url) => {
            setAssetIconUrl(url);
        });
    }, [symbol]);


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
                data-testid="tracker-table-name-image"
                width={32}
                height={32}
                src={assetIconUrl ? assetIconUrl : loadingAssetIconUrl}
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
