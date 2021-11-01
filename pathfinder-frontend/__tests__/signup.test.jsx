/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import Signup from '../pages/signup';

describe('Signup Page', () => {
    // Test case by Daniel Liang
    it('renders the signup heading', () => {
        render(<Signup />);

        const heading = screen.getByRole('heading', {
            name: /Get Started/i,
        });

        expect(heading).toBeInTheDocument();
    });
    
    // Test case by Daniel Liang
    // During signup, the user needs to create a password and retype it to confirm.
    // If the confirmation does not match the original password, an alert should be shown.
    it('detects that password confirmation does not match the password', () => {
        render(<Signup />);
        
        // The four text fields and submit button of the signup form
        const firstName = screen.getByPlaceholderText('First Name');
        const lastName = screen.getByPlaceholderText('Last Name');
        const password = screen.getByPlaceholderText('Password');
        const confirmPassword = screen.getByPlaceholderText('Confirm Password');
        const signupButton = screen.getByText('Sign Up');
        
        // Fill in all the fields, type the wrong password confirmation and submit
        fireEvent.change(firstName, {target: {value: 'Some'}});
        fireEvent.change(lastName, {target: {value: 'One'}});
        fireEvent.change(password, {target: {value: '12345678'}});
        fireEvent.change(confirmPassword, {target: {value: '123456789'}});
        fireEvent.click(signupButton);
        
        // An alert should appear above the password fields
        const passwordAlert = screen.getByText('The passwords did not match.');
        expect(passwordAlert).toBeInTheDocument();
    });

    // Test case by Yanchen Ma
    it('renders the signup button', () => {
        render(<Signup />);

        const button = screen.getByRole('button', {
            name: /Sign Up/i,
        });

        expect(button).toBeInTheDocument();
    });
});

