import Navbar from '@/components/Navbar'
import { useSocket } from '@/Context/SocketContext';
import React, { useEffect } from 'react'

export default function Dashboard() {

  const { socket } = useSocket()

  function receiveNotification(data: string) {
    console.log(data);
  }

  useEffect(() => {

      console.log('Socket connected:', socket);
  
      socket?.on("receiveNotification", receiveNotification);

      return () => {
        socket?.off("receiveNotification");
      };
    
  }, [socket])

  return (
    <>
      <Navbar />
    </>
  )
}
