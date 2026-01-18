import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@shared/lib/utils';
import { Calendar } from '@shared/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/components/ui/popover';

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  className?: string;
}

export function DatePicker({ date, onDateChange, className }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'flex h-8 items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/30 px-3 py-1.5 text-xs transition-colors hover:bg-zinc-700',
            !date && 'text-zinc-400',
            className
          )}
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          {date ? (
            <span className="text-zinc-300">{format(date, 'MMM dd, y')}</span>
          ) : (
            <span className="text-zinc-400">Pick a date</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto border-zinc-700 bg-zinc-900 p-0" align="end">
        <Calendar mode="single" selected={date} onSelect={onDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
