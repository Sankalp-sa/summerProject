import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BACKEND_URL } from '@/config/config';
import { useAuth } from '@/Context/AuthContext';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function ViewTests() {
    const [tests, setTests] = useState([]);
    const [currentTime, setCurrentTime] = useState(moment());
    const { user } = useAuth();

    const navigate = useNavigate();

    const fetchAllTests = async () => {
        const res = await fetch(`${BACKEND_URL}/api/v1/test/getUserTest/${user.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const data = await res.json();
        console.log('test', data);
        setTests(data.data);
    };

    useEffect(() => {
        if (user?.user?.id) {
            fetchAllTests();
        }
    }, [user]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getRemainingTime = (startTime: Date) => {
        const now = currentTime;
        const start = moment(startTime);
        const diff = moment.duration(start.diff(now));

        if (diff.asMilliseconds() < 0) {
            return "0d 0h 0m 0s";
        }

        const days = Math.floor(diff.asDays());
        const hours = diff.hours();
        const minutes = diff.minutes();
        const seconds = diff.seconds();

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const canStartTest = (startTime: Date, endTime: Date) => {
        const now = currentTime;
        return now.isSameOrAfter(startTime) && now.isBefore(endTime);
    };

    return (
        <div>
            <Navbar />
            <div style={{ padding: '2% 15%' }}>
                {tests?.map((t: any, index) => (
                    <div className='mb-10'>
                    <Card key={t.test?._id}>
                        <CardHeader>
                            <CardTitle>Test {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                                <h3>{t.test?.test_name}</h3>
                                <p>Start Time: {moment(t.test?.start_time).format('YYYY-MM-DD HH:mm:ss')}</p>
                                <p>End Time: {moment(t.test?.end_time).format('YYYY-MM-DD HH:mm:ss')}</p>
                                <div className='text-right'>
                                    {canStartTest(
                                        (t.test?.start_time),
                                        (t.test?.end_time)) ? (
                                        <Button onClick={() => navigate(`/user/test/${t.test._id}`)}>Start Test</Button>
                                    ) : (
                                        <p>
                                            Test will start in {getRemainingTime(t.test?.start_time)}
                                        </p>
                                    )}
                                </div>
                        </CardContent>
                    </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
