import { expect, test } from '@playwright/experimental-ct-react';
import Page from '../../page';

test.use({ viewport: { width: 500, height: 500 } });

test('should work', async ({ mount }) => {
    const component = await mount(<Page />);
    await expect(component).toContainText('About');
});
