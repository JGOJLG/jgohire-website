'use client';

import {useEffect} from 'react';

const VIDLEY_RESET_URL='https://jlg-collective-git-main-jgohire.vercel.app/vidley/admin/reset-password';

export default function VidleyRecoveryRedirect(){
  useEffect(()=>{
    const hash=window.location.hash||'';
    const params=new URLSearchParams(hash.startsWith('#')?hash.slice(1):hash);
    const type=params.get('type');
    const accessToken=params.get('access_token');
    if(type==='recovery'&&accessToken){
      window.location.replace(`${VIDLEY_RESET_URL}${hash}`);
    }
  },[]);
  return null;
}
