import * as React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';
import NoResults from '@components/tracker/no-results/no-results';

describe('Assets No Results: ', () => {
	
    it('should render correctly', () => {
        const { container } = render(<NoResults onRetry={jest.fn()} />);

        const message = screen.getByTestId('assents-no-results-message');
		
        expect(message?.textContent).toBe('No results. Would you like to try again?');
        expect(container).toMatchSnapshot();
    });
	
    it('should call onRetry callback on retry button click', () => {
        const onRetry = jest.fn();
        render(<NoResults onRetry={onRetry} />);

        const button = screen.getByTestId('assets-no-results-retry-button');
        fireEvent.click(button);
		
        expect(onRetry).toHaveBeenCalled();
    });
});
