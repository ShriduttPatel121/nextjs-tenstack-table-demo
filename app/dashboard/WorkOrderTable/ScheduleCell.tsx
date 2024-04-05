import { ScheduleENUM, TSchedule, WeekDayEnum } from '@/data/workOrderUtils';
import { format } from 'date-fns-tz';

const weekDayArr = Object.values(WeekDayEnum);

export function ScheduleCell({ date, type, onTime, scheduleDays }: TSchedule) {
  if (!onTime)
    return (
      <div className="badge badge-ghost text-xs font-semibold">Unscheduled</div>
    );

  return (
    <div className="flex gap-2 text-xs items-center">
      <span>
        {format(date, 'MMM d, HH:mm a  ') + '  '}
      </span>
      <b className='ml-1'>On Time</b>
      <div className="mx-auto flex items-center gap-3">
        <div className="ml-auto font-bold text-xs ">Weekly</div>
        <div className="flex justify-center gap-2 mr-4 ">
            {weekDayArr.map((day, i) => (
                <span
                key={i}
                className={`badge-ghost flex h-7 w-7 items-center justify-center rounded-full p-2 text-xs text-gray-900 ${
                    scheduleDays.includes(day) ? 'bg-sky-600 text-white' : ''
                }`}
                >
                {day.substring(0, 1)}
                </span>
            ))}
        </div>
      </div>
      {/* {type === ScheduleENUM.WEEKLY && (
        <div className="flex grow gap-4">
          {weekDayArr.map((day, i) => (
            <span
              key={i}
              className={`badge-ghost flex h-7 w-7 items-center justify-center rounded-full p-2 text-xs text-gray-900 ${
                scheduleDays.includes(day) ? 'bg-sky-600 text-white' : ''
              }`}
            >
              {day.substring(0, 1)}
            </span>
          ))}
        </div>
      )} */}
    </div>
  );
}
