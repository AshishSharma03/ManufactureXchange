import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const userLoggedIn = Cookies.get('UserAuth') === 'true';

    if (userLoggedIn) {

      router.push('/Landing');
    } else {
      router.push('/Login');
    }
  }, []);

  return null;
}
