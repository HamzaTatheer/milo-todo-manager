import React from 'react';
import {ReactNode, useEffect } from 'react';
import useUserStore from '@/models/user';
import { useRouter } from 'next/router';
import { Loader } from '@mantine/core';



type IMainProps = {
  children: ReactNode;
};

export default function PrivateRoute(props: IMainProps) {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(()=>{
    if(user.data==null){
      router.push('/');
    }
  },[user]);

  //use mantine progress bar
  return <>{user.data != null ? props.children : null}</>;
}
