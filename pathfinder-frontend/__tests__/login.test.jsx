/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import Login from '../pages/login';
import React from 'react';

describe('Login Page', () => {
    // Test case by Daniel Liang
    it('renders the login form heading', () => {
        render(<Login />);

        const heading = screen.getByRole('heading', {
            name: /Welcome Back/i,
        });

        expect(heading).toBeInTheDocument();
    });

    // Test case by Krishna Solanki
    it('should render input for username as textbox', () => {
        render(<Login />);
        const input = screen.getByRole('textbox');
        console.log(input);

        expect(input).toBeInTheDocument();
    });
});

