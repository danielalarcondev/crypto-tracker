export const tableTheme = {
    root: {
        base: 'w-full text-left text-sm text-neutral-500 dark:text-neutral-400',
        shadow: 'absolute left-0 top-0 -z-10 h-full w-full drop-shadow-md dark:bg-neutral-950',
        wrapper: 'relative'
    },
    body: {
        base: 'group/body dark:text-neutral-200',
        cell: {
            base: 'px-4 md:px-6 py-4 neutral-50 dark:bg-neutral-800'
        }
    },
    head: {
        base: 'group/head text-xs uppercase text-neutral-700 dark:text-neutral-100',
        cell: {
            base: ' px-4 md:px-6 py-4 bg-neutral-100 dark:bg-neutral-600'
        }
    },
    row: {
        base: 'group/row bg-white dark:bg-neutral-800',
        hovered: 'hover:bg-neutral-50 dark:hover:bg-neutral-600',
        striped: 'odd:bg-neutral-50 even:bg-neutral-50 odd:dark:bg-neutral-800 even:dark:bg-neutral-700'
    }
};
