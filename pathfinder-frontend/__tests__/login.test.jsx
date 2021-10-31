/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../pages/login';

// Test case by Daniel Liang
describe('Login Page', () => {
    it('renders the login form heading', () => {
        render(<Login />);

        const heading = screen.getByRole('heading', {
            name: /Welcome Back/i,
        });

        expect(heading).toBeInTheDocument();
    });
});

