/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from '../pages/index';

// Test case by Daniel Liang
describe('Landing Page', () => {
    it('renders the introduction heading', () => {
        render(<Landing />);

        const heading = screen.getByRole('heading', {
            name: /Selecting courses is hard\.\.\./i,
        });

        expect(heading).toBeInTheDocument();
    });
});

