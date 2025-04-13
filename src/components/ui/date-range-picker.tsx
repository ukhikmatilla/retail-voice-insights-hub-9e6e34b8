
import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { ru } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTranslation } from "react-i18next"

export type DateRange = {
  from: Date | undefined
  to?: Date | undefined
}

export type DateRangePickerProps = {
  value: DateRange | undefined
  onChange: (date: DateRange | undefined) => void
  align?: "start" | "center" | "end"
  className?: string
  calendarClassName?: string
}

export function DateRangePicker({
  value,
  onChange,
  align = "center",
  className,
  calendarClassName,
}: DateRangePickerProps) {
  const { t } = useTranslation()

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            size="sm"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y", { locale: ru })} –{" "}
                  {format(value.to, "LLL dd, y", { locale: ru })}
                </>
              ) : (
                format(value.from, "LLL dd, y", { locale: ru })
              )
            ) : (
              <span>{t('filters.pickDate', 'Выберите дату')}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            className={cn("rounded-md border pointer-events-auto", calendarClassName)}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
