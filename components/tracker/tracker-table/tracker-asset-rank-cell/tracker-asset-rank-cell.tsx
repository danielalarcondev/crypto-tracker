import { TableCell } from 'flowbite-react';
import { ReactNode } from 'react';

interface TrackerAssetCellProps {
    children?: ReactNode
}

export default function TrackerAssetRankCell({children}: TrackerAssetCellProps) {
    return (
        <TableCell 
            className={[
                'p-4', 
                'w-24', 
                'hidden xl:table-cell'
            ].join(' ')
            }
        >
            {children}
        </TableCell>
    );
}
