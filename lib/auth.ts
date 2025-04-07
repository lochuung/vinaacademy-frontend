import NextAuth from 'next-auth';
import authConfig from './auth.config';
import {de} from '@faker-js/faker';

const {auth, handlers, signOut, signIn} = NextAuth(authConfig);
export default auth;