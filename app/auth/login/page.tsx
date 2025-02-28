import LoginForm from '@/components/ui/loginform';
import { loginAction } from './actionlogin';

export default function LoginPage() {
  return (
    <main className='flex items-center justify-center h-fit bg-gradient-to-tl from-gray-300 via-gray-200 to-neutral-300 '>
      <div className='w-full max-w-[28%] '>
        <LoginForm formAction={loginAction} />

      </div>
    </main>
  );
}
