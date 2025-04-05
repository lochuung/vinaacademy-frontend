// actions.ts
'use server'

import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  // Extract data from FormData
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const remember = formData.has('remember');

  try {

    // Call API
    console.log('Processing login for:', username);

    // Example API call (replace with your actual authentication code)
    // const response = await fetch('https://api.example.com/auth', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(validatedData)
    // });

    // if (!response.ok) {
    //   throw new Error('Authentication failed');
    // }

    console.log('Login successful');

    redirect('/');
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}