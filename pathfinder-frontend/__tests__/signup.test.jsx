/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Signup from '../pages/signup';

// Test case by Daniel Liang
describe('Signup Page', () => {
    it('renders the signup heading', () => {
        render(<Signup />);

        const heading = screen.getByRole('heading', {
            name: /Get Started/i,
        });

        expect(heading).toBeInTheDocument();
    });
});

