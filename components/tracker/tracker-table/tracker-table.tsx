import { Asset } from '@common-types/assets';
import { tableTheme } from '@components/tracker/tracker-table/table-theme';
import TrackerAssetCell from '@components/tracker/tracker-table/tracker-asset-cell/tracker-asset-cell';
import TrackerAssetNameCell from '@components/tracker/tracker-table/tracker-asset-name-cell/tracker-asset-name-cell';
import TrackerAssetRankCell from '@components/tracker/tracker-table/tracker-asset-rank-cell/tracker-asset-rank-cell';
import TrackerTableRow from '@components/tracker/tracker-table/tracker-table-row/tracker-table-row';
import { formatLargeNumber, formatPercentageNumber } from '@utils/format';
import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-react';

export interface TrackerTableProps {
	assets: Asset[]
}

export default function TrackerTable({ assets }: TrackerTableProps) {
    return (
        <div
            data-testid="tracker-table"
            className={[
                'overflow-x-auto',
                'rounded-lg'
            ].join(' ')
            }
        >
            <Table theme={tableTheme}>
                <TableHead>

                    <TableHeadCell 
                        className={[
                            'hidden xl:table-cell', 
                            'w-24'
                        ].join(' ')
                        }
                    >
						#
                    </TableHeadCell>

                    <TableHeadCell 
                        className={[
                            'w-fit'
                        ].join(' ')
                        }
                    >
						Name
                    </TableHeadCell>
					
                    <TableHeadCell 
                        className={[
                            'w-32'
                        ].join(' ')
                        }
                    >
						Price
                    </TableHeadCell>
                    
                    <TableHeadCell 
                        className={[
                            'hidden xs:table-cell', 
                            'w-32'
                        ].join(' ')
                        }
                    >
						24h %
                    </TableHeadCell>
                    
                    <TableHeadCell 
                        className={[
                            'hidden xl:table-cell', 
                            'w-32'
                        ].join(' ')
                        }
                    >
						Market cap
                    </TableHeadCell>
                    
                    <TableHeadCell 
                        className={[
                            'hidden lg:table-cell', 
                            'w-32'
                        ].join(' ')
                        }
                    >
						Supply
                    </TableHeadCell>
                    
                    <TableHeadCell 
                        className={[
                            'hidden sm:table-cell', 
                            'w-32'
                        ].join(' ')
                        }
                    >
						Volume 24h
                    </TableHeadCell>

                </TableHead>

                <TableBody 
                    className={[
                        'divide-y'
                    	].join(' ')
                    }
                >
                    { assets.map((asset) => (
                        <TrackerTableRow key={asset.id}>
                            
                            <TrackerAssetRankCell>
                                {asset.rank}
                            </TrackerAssetRankCell>
							
                            <TrackerAssetNameCell name={asset.name} symbol={asset.symbol} />

                            <TrackerAssetCell 
                                className={[
                                    'w-32'
                                ].join(' ')
                                }
                            >
                                {`$${formatLargeNumber(asset.priceUsd)}`}
                            </TrackerAssetCell>

                            <TrackerAssetCell 
                                className={[
                                    'hidden xs:table-cell', 
                                    'w-32'
                                ].join(' ')
                                }
                            >
                                {formatPercentageNumber(asset.changePercent24Hr)}
                            </TrackerAssetCell>
                            
                            <TrackerAssetCell 
                                className={[
                                    'hidden xl:table-cell', 
                                    'w-32'
                                ].join(' ')
                                }
                            >
                                {formatLargeNumber(asset.marketCapUsd)}
                            </TrackerAssetCell>
                            
                            <TrackerAssetCell 
                                className={[
                                    'hidden lg:table-cell', 'w-32'
                                ].join(' ')
                                }
                            >
                                {formatLargeNumber(asset.supply)}
                            </TrackerAssetCell>
                            
                            <TrackerAssetCell 
                                className={[
                                    'hidden sm:table-cell', 
                                    'w-32'
                                ].join(' ')
                                }
                            >
                                {formatLargeNumber(asset.volumeUsd24Hr)}
                            </TrackerAssetCell>

                        </TrackerTableRow>
                    ))}
					
                </TableBody>
            </Table>
        </div>
    );
}
