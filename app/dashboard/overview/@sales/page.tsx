import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SalesPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>+12,234</div>
                <p className='text-xs text-muted-foreground'>+19% from last month</p>
            </CardContent>
        </Card>
    );
}