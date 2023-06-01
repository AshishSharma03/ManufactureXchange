import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();
  const [userLoggedIn,setUserLoggedIn] = useState(false) 
  useEffect(() => {

    if (userLoggedIn) {
      router.push('/Landing');
    } else {
      router.push('/Login');
    }
  }, []);

  return null;
}
