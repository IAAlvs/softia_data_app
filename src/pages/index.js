import React from 'react';
import Link from 'next/link';
import {useUser} from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';


function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if(user){
    router.push('/dashboard');
  }
  else
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a la aplicación</h1>
        <Link legacyBehavior href="/cloud">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Ir al Cloud
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Home;
