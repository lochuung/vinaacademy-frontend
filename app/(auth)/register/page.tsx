import { Card } from '@/components/ui/card';
import { registerAction } from './actionregister';
import RegisterForm from '@/components/ui/registerform';

export default function RegisterPage() {
  return (
    <main className='flex items-center justify-center h-fit bg-gradient-to-tl from-gray-300 via-gray-300 to-neutral-300'>
      <div className='w-full sm:max-w-[57%] '> 
        <RegisterForm formAction={registerAction} />
      </div>
    </main>
  );
}
