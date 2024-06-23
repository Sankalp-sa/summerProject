import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BACKEND_URL } from '@/config/config';
import { useAuth } from '@/Context/AuthContext';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-day-picker';

export default function ViewTests() {

    const [test, setTest] = useState([]);

    const { user } = useAuth();

    const fetchAllTest = async () => {

        const res = await fetch(`${BACKEND_URL}/api/v1/test/getUserTest/${user.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        const data = await res.json();

        console.log("test");
        console.log(data)

        setTest(data.data)

    }

    useEffect(() => {
        fetchAllTest();
    }, [user])

    return (
        <div>
            <Navbar />
            <div style={{padding: "2% 15%"}}>
                {test?.map((t: any, index) => (
                    <Card key={t.test?._id}>
                        <CardHeader>
                            <CardTitle>Test {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3>{t.test?.test_name}</h3>
                            <p>Start Time: {t.test?.start_time}</p>
                            <p>End Time: {t.test?.end_time}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
