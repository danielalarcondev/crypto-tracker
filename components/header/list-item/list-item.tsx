import classNames from 'classnames';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ListItemProps {
	id: string,
	path: string,
	text: string,
	isMenuOpen: boolean,
	shouldBeHidden: boolean
}

export default function ListItem({ id, path, text, isMenuOpen, shouldBeHidden }: ListItemProps) {
   
    const pathname = usePathname();
    const isActiveLink = pathname.startsWith(path);

    return (
        <li
            id={id}
            className={classNames([
                'pl-3',
                'pr-3',
                'text-xl',
                'hover:cursor-pointer',
                'border-b-4', 'hover:text-primary-500'
           		].join(' '), {
                	'border-primary-500': isActiveLink,
                	'border-transparent': !isActiveLink,
                	'w-[calc(100%-8px)] h-16 mr-2': isMenuOpen,
                	'w-fit h-[calc(100%+1px)]': !isMenuOpen,
                	'hidden': shouldBeHidden
           		})
            }>
            <Link
                href={path}
                className={[
                    'menu-anchor',
                    'block',
                    'md:bg-transparent',
                    'h-full',
                    'flex',
                    'items-center',
                    'mt-1'
                ].join(' ')}>
                {text}
            </Link>
        </li>
    );
}
