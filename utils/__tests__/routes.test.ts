import { Routes } from '../routes';
import {expect, it, describe } from '@jest/globals';

describe('Route Utils: ', () => {
    it('default route should be /tracker', () => {
        expect(Routes.DEFAULT).toBe('/tracker');
    });
});
