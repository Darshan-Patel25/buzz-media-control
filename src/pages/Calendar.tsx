
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useIsMobile } from '@/hooks/use-mobile';

const Calendar = () => {
  const isMobile = useIsMobile();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Content Calendar</h1>
            <p className="text-muted-foreground">Plan and organize your social media content</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Content Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow"
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-2/3">
                  <div className="bg-muted/50 p-4 rounded-md h-full">
                    <h3 className="font-medium mb-3">
                      {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a date'}
                    </h3>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        {date ? 'No posts scheduled for this date. Click the "+ Create Post" button to add content.' : 'Select a date to view scheduled posts.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
