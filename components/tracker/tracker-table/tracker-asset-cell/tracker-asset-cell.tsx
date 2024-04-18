import { TableCell } from 'flowbite-react';
import { ReactNode } from 'react';

interface TrackerAssetCellProps {
    children?: ReactNode,
	className?: string
}

export default function TrackerAssetCell({ children, className }: TrackerAssetCellProps) {
    return (
        <TableCell 
            className={className}
        >
            {children}
        </TableCell>
    );
}
