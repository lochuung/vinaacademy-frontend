// actions.ts
'use server'

import {redirect} from 'next/navigation';


export async function registerAction(formData: FormData) {
    // Extract data from FormData
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {

        // Call API
        console.log('Processing register for:', username);

        // Example API call (replace with your actual authentication code)
        // const response = await fetch('https://api.example.com/auth', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(validatedData)
        // });

        // if (!response.ok) {
        //   throw new Error('Authentication failed');
        // }

        console.log('Register successful');

        redirect('/login');
    } catch (error) {
        console.error('Register failed:', error);
        throw error;
    }
}