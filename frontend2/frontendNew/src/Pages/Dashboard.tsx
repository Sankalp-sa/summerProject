import Navbar from '@/components/Navbar'
import { useAuth } from '@/Context/AuthContext';
import { useSocket } from '@/Context/SocketContext';
import React, { useEffect } from 'react'

export default function Dashboard() {

  const { socket } = useSocket()

  const { user } = useAuth()

  function receiveNotification(data: string) {
    console.log(data);
  }

  useEffect(() => {

    console.log('Socket connected:', socket);

    socket?.on("receiveNotification", receiveNotification);

    // get the notification of the room
    socket?.emit(user?.user.id, (data: any) => {
      console.log("Room data: "+data);
    });

    return () => {
      socket?.off("receiveNotification");
    };

  }, [socket, user])

  return (
    <>
      <Navbar />
    </>
  )
}
