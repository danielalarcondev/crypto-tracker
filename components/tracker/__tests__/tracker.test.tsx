import * as React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { render, screen } from '@testing-library/react';
import { expect, it, describe, beforeEach } from '@jest/globals';
import Tracker from '@components/tracker/tracker';

describe('TrackerPage: ', () => {

    beforeEach(() => (
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }))
    ));

    it('should render correctly', () => {

        render(<Tracker />);

        const pagination = screen.getByTestId('tracker-pagination');
        const table = screen.getByTestId('tracker-table');

        expect(pagination).toBeInTheDocument();
        expect(table).toBeInTheDocument();
    });
});
