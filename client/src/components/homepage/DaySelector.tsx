import { Button } from "@/components/ui/button";

type Props = {
  selectedDay: string;
  onSelectDay: (day: string) => void;
  days: string[];
};

export default function DaySelector({ selectedDay, onSelectDay, days }: Props) {
  return (
    <div
      className="flex justify-center gap-2 flex-wrap mb-10"
      id="menu-section"
    >
      {days.map((day) => (
        <Button
          key={day}
          onClick={() => onSelectDay(day)}
          className={`rounded-full px-5 py-2 font-medium transition border 
         ${
           selectedDay === day
             ? "bg-yellow-400 text-black hover:bg-yellow-300 border-yellow-400"
             : "bg-white/10 text-white/80 hover:bg-white/20 border-white/30"
         }`}
        >
          {day}
        </Button>
      ))}
    </div>
  );
}
