import TrackerPage from '@/tracker/page';
import { expect, test } from '@playwright/experimental-ct-react';

test.use({ viewport: { width: 500, height: 500 } });

test('Tracker page', async ({ mount }) => {
    const component = await mount(<TrackerPage />);
    await expect(component).toContainText('Hey, this is the tracker');
});
