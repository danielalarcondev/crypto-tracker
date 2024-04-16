import { TableRow } from 'flowbite-react';
import { ReactNode } from 'react';

interface TrackerTableRowProps {
    children?: ReactNode
}

export default function TrackerTableRow({children}: TrackerTableRowProps) {
    return (
        <TableRow>
            {children}
        </TableRow>
    );
}
