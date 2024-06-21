import Navbar from '@/components/Navbar'
import { useSocket } from '@/Context/SocketContext';
import React, { useEffect } from 'react'

export default function Dashboard() {

  const s  = useSocket()

  useEffect(() => {

    console.log(s)

    if (s) {
      console.log('Socket connected:', s);
  
      s.on("receiveNotification", (data: String) => {
        console.log("received Notification: " + data);
      });
  
      return () => {
        s.off("receiveNotification");
      };
    }

  }, [])

  return (
    <>
      <Navbar />
    </>
  )
}
