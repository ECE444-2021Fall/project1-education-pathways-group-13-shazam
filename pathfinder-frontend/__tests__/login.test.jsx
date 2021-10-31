/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../pages/login';

describe('Login Page', () => {
    // Test case by Daniel Liang
    it('renders the login form heading', () => {
        render(<Login />);

        const heading = screen.getByRole('heading', {
            name: /Welcome Back/i,
        });

        expect(heading).toBeInTheDocument();
    });
});

