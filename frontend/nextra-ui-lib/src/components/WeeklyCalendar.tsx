import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../theme/ThemeProvider';

interface WeekDay {
  date: Date;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  isCurrentMonth: boolean;
}

export interface CalendarEvent {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  client?: { name: string };
  property?: { title: string };
}

interface WeeklyCalendarProps {
  events: CalendarEvent[];
  currentWeekStart: Date;
  onWeekChange: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onTimeSlotClick?: (date: Date, hour: number) => void;
}

interface DayColumnProps {
  day: WeekDay;
  hours: number[];
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onTimeSlotClick?: (date: Date, hour: number) => void;
  theme: any;
  getStatusColor: (status?: string) => string;
}

// Component for a single day column
function DayColumn({ day, hours, events, onEventClick, onTimeSlotClick, theme, getStatusColor }: DayColumnProps) {
  const [isScrollEnabled, setIsScrollEnabled] = React.useState(false);
  const timelineRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to current hour on mount
  React.useEffect(() => {
    if (timelineRef.current && day.isToday) {
      const currentHour = new Date().getHours();
      const hourIndex = hours.indexOf(currentHour);
      if (hourIndex >= 0) {
        // Scroll to current hour (80px per hour slot)
        const scrollPosition = hourIndex * 80;
        timelineRef.current.scrollTop = scrollPosition;
      }
    }
  }, [day.isToday, hours]);

  const getEventsForSlot = (hour: number): CalendarEvent[] => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === day.date.getDate() &&
        eventDate.getMonth() === day.date.getMonth() &&
        eventDate.getFullYear() === day.date.getFullYear() &&
        eventDate.getHours() === hour
      );
    });
  };

  const handleDayClick = () => {
    setIsScrollEnabled(true);
    // Auto-focus on the timeline for keyboard scrolling
    timelineRef.current?.focus();
  };

  const handleBlur = () => {
    setIsScrollEnabled(false);
  };

  return (
    <div className="flex flex-col" style={{ minWidth: '140px', flex: '1 1 0%', height: '100%' }}>
      {/* Day header - fixed */}
      <div
        onClick={handleDayClick}
        className="p-4 text-center border-b cursor-pointer hover:opacity-90 transition-opacity"
        style={{
          backgroundColor: day.isToday ? 'var(--color-primary)' : 'var(--color-surface)',
          color:  'var(--color-text)',
          borderBottomColor: 'var(--color-border)'
        }}
        title="Click to enable scrolling"
      >
        <div className="text-sm font-medium uppercase">{day.dayName}</div>
        <div className="text-3xl font-bold mt-1">{day.dayNumber}</div>
      </div>

      {/* Timeline slots for this day */}
      <div 
        ref={timelineRef}
        className="flex-1"
        style={{
          overflowY: isScrollEnabled ? 'auto' : 'hidden',
          outline: 'none',
        }}
        onBlur={handleBlur}
        tabIndex={-1}
      >
        {hours.map((hour) => {
          const slotEvents = getEventsForSlot(hour);
          
          return (
            <div
              key={hour}
              className="relative border-b cursor-pointer hover:bg-opacity-50 transition-colors"
              style={{
                height: '80px',
                borderBottomColor: theme.colors.border,
                backgroundColor: theme.colors.background,
              }}
              onClick={() => onTimeSlotClick?.(day.date, hour)}
            >
              {/* Hour label */}
              <div
                style={{ color: theme.colors.textSecondary }}
                className="absolute left-2 top-1 text-xs font-medium"
              >
                {hour}:00
              </div>

              {/* Events in this time slot */}
              <div className="pt-6 px-2 pb-2 h-full overflow-hidden">
                {slotEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    style={{
                      backgroundColor: getStatusColor(event.status),
                      color: theme.colors.textInverse,
                    }}
                    className="p-2 rounded mb-1 text-xs cursor-pointer hover:opacity-80 transition-opacity shadow-sm"
                  >
                    <div className="font-semibold truncate">{event.title}</div>
                    {event.client && (
                      <div className="truncate opacity-90 text-[10px] mt-0.5">
                        👤 {event.client.name}
                      </div>
                    )}
                    {event.property && (
                      <div className="truncate opacity-90 text-[10px]">
                        🏠 {event.property.title}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WeeklyCalendar({
  events,
  currentWeekStart,
  onWeekChange,
  onEventClick,
  onTimeSlotClick,
}: WeeklyCalendarProps) {
  const { theme } = useTheme();

  // Generate week days from Monday to Sunday
  const getWeekDays = (startDate: Date): WeekDay[] => {
    const days: WeekDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      const isToday = date.getTime() === today.getTime();
      const isCurrentMonth = date.getMonth() === today.getMonth();

      days.push({
        date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        isToday,
        isCurrentMonth,
      });
    }

    return days;
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    onWeekChange(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    onWeekChange(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    const monday = new Date(today);
    const day = monday.getDay();
    const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);
    onWeekChange(monday);
  };

  const weekDays = getWeekDays(currentWeekStart);
  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

  // Calculate week range for display
  const weekEnd = new Date(currentWeekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const weekRangeText = `${currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'SCHEDULED':
        return theme.colors.info;
      case 'COMPLETED':
        return theme.colors.success;
      case 'CANCELLED':
        return theme.colors.error;
      case 'NO_SHOW':
        return theme.colors.warning;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <div
      className="bg-surface rounded-lg border overflow-hidden"
      style={{ borderColor: 'var(--color-border)' }}
    >
      {/* Header with navigation */}
      <div
        className="bg-surface px-4 py-3 border-b flex items-center justify-between"
        style={{ borderBottomColor: 'var(--color-border)' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={goToPreviousWeek}
            className="bg-primary text-inverse p-2 rounded-lg shadow-sm hover:shadow-md hover:brightness-110 active:brightness-90 transition-all duration-200"
            title="Previous week"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={goToNextWeek}
            className="bg-primary text-inverse p-2 rounded-lg shadow-sm hover:shadow-md hover:brightness-110 active:brightness-90 transition-all duration-200"
            title="Next week"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
          <button
            onClick={goToToday}
            className="bg-primary text-inverse px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md hover:brightness-110 active:brightness-90 transition-all duration-200"
          >
            Today
          </button>
        </div>
        <div className="text-text text-lg font-semibold">
          {weekRangeText}
        </div>
      </div>

      {/* Calendar - Days as columns, scrollable vertical timeline */}
      <div className="flex overflow-x-auto" style={{ height: 'calc(100vh - 280px)', minHeight: '600px' }}>
        {/* 7 day columns side by side */}
        {weekDays.map((day) => (
          <div
            key={day.date.toISOString()}
            className="flex-1 border-r flex flex-col"
            style={{
              borderRightColor: theme.colors.border,
              minWidth: '140px',
            }}
          >
            <DayColumn
              day={day}
              hours={hours}
              events={events}
              onEventClick={onEventClick}
              onTimeSlotClick={onTimeSlotClick}
              theme={theme}
              getStatusColor={getStatusColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
