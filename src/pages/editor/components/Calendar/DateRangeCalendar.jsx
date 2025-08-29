import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ApplyButton,
  ApplyContainer,
  CalendarWrapper,
  Dash,
  DateInput,
  DayCell,
  DaysGrid,
  FooterWrapper,
  HeaderBar,
  InputsGroup,
  MonthContainer,
  MonthsWrapper,
  MonthTitle,
  NavButton,
  NavButtonL,
  QaButton,
  QuickActions,
  WeekHeader,
  WeekHeaderCell,
} from "./DateRangeCalendar.styles";
import Icon from "../../../../nekrasovka-ui/Icon/icon";

const DateRangeCalendar = ({
  initialStartDate = null,
  initialEndDate = null,
  monthsToShow = 3,
  minDate,
  maxDate,
  onApply,
  onChange,
}) => {
  console.log(
    "❗",
    initialStartDate instanceof Date,
    typeof initialEndDate,
    monthsToShow,
    minDate,
    maxDate,
  );
  // Utils
  const ruMonths = useMemo(
    () => [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    [],
  );

  const weekDays = useMemo(
    () => ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    [],
  );

  const toDate = useCallback((v) => {
    if (!v) return null;
    if (v instanceof Date)
      return new Date(v.getFullYear(), v.getMonth(), v.getDate());
    if (typeof v === "string") {
      return new Date(v);
    }
    return null;
  }, []);

  const startDateInit = toDate(initialStartDate);
  const endDateInit = toDate(initialEndDate);
  const today = useMemo(() => startOfDay(new Date()), []);
  const [startDate, setStartDate] = useState(startDateInit);
  const [endDate, setEndDate] = useState(endDateInit);

  const [inputStart, setInputStart] = useState(
    startDate ? formatDate(startDate) : "",
  );
  const [inputEnd, setInputEnd] = useState(endDate ? formatDate(endDate) : "");

  const [visibleMonth, setVisibleMonth] = useState(
    startDate ? startOfMonth(startDate) : startOfMonth(today),
  );

  // Keep inputs synced with state
  useEffect(() => {
    setInputStart(startDate ? formatDate(startDate) : "");
  }, [startDate]);

  useEffect(() => {
    setInputEnd(endDate ? formatDate(endDate) : "");
  }, [endDate]);

  useEffect(() => {
    if (onChange) onChange(startDate, endDate);
  }, [startDate, endDate, onChange]);

  // Helpers
  function startOfDay(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function startOfWeekMonday(d) {
    const day = (d.getDay() + 6) % 7; // Mon=0
    const res = new Date(d);
    res.setDate(d.getDate() - day);
    return startOfDay(res);
  }

  function endOfWeekSunday(d) {
    const start = startOfWeekMonday(d);
    const res = new Date(start);
    res.setDate(start.getDate() + 6);
    return res;
  }

  function isSameDay(a, b) {
    if (!a || !b) return false;
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function isBefore(a, b) {
    return a.getTime() < b.getTime();
  }

  function isAfter(a, b) {
    return a.getTime() > b.getTime();
  }

  function isBetween(d, a, b) {
    if (!a || !b) return false;
    const min = isBefore(a, b) ? a : b;
    const max = isAfter(a, b) ? a : b;
    return d.getTime() >= min.getTime() && d.getTime() <= max.getTime();
  }

  function addMonths(d, n) {
    return new Date(d.getFullYear(), d.getMonth() + n, 1);
  }

  function startOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  function endOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
  }

  function daysInMonth(d) {
    return endOfMonth(d).getDate();
  }

  function formatDate(d) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  }

  function parseDate(s) {
    if (typeof s !== "string") return null;
    const m = s.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!m) return null;
    const [_, dd, mm, yyyy] = m;
    const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    if (
      d.getFullYear() !== Number(yyyy) ||
      d.getMonth() !== Number(mm) - 1 ||
      d.getDate() !== Number(dd)
    ) {
      return null;
    }
    return d;
  }

  function buildMonthMatrix(monthDate) {
    // Returns an array with leading empty slots and day numbers
    const first = startOfMonth(monthDate);
    const total = daysInMonth(monthDate);
    const firstWeekdayIndex = (first.getDay() + 6) % 7; // Monday=0
    const cells = [];
    for (let i = 0; i < firstWeekdayIndex; i++) cells.push(null);
    for (let day = 1; day <= total; day++) cells.push(day);
    // Fill to complete 6 weeks (6*7 = 42 cells) to keep stable height
    while (cells.length % 7 !== 0) cells.push(null);
    while (cells.length < 42) {
      cells.push(null);
    }
    return cells;
  }

  // Range selection
  const handleDayClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      // set end
      if (isBefore(date, startDate)) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const inMinMax = (d) => {
    if (minDate && isBefore(d, startOfDay(minDate))) return false;
    if (maxDate && isAfter(d, startOfDay(maxDate))) return false;
    return true;
  };

  // Inputs
  const onStartInputChange = (e) => {
    const val = e.target.value;
    setInputStart(val);
  };
  const onEndInputChange = (e) => {
    const val = e.target.value;
    setInputEnd(val);
  };
  const onStartInputBlur = () => {
    const d = parseDate(inputStart);
    if (d && inMinMax(d)) {
      setStartDate(d);
      if (endDate && isBefore(endDate, d)) setEndDate(null);
    } else {
      setInputStart(startDate ? formatDate(startDate) : "");
    }
  };
  const onEndInputBlur = () => {
    const d = parseDate(inputEnd);
    if (d && inMinMax(d)) {
      setEndDate(d);
      if (startDate && isAfter(startDate, d)) setStartDate(null);
    } else {
      setInputEnd(endDate ? formatDate(endDate) : "");
    }
  };

  // Quick actions
  const setToday = () => {
    setStartDate(today);
    setEndDate(today);
    setVisibleMonth(startOfMonth(today));
  };
  const setTomorrow = () => {
    const t = new Date(today);
    t.setDate(today.getDate() + 1);
    setStartDate(t);
    setEndDate(t);
    setVisibleMonth(startOfMonth(t));
  };
  const setThisWeek = () => {
    const s = startOfWeekMonday(today);
    const e = endOfWeekSunday(today);
    setStartDate(s);
    setEndDate(e);
    setVisibleMonth(startOfMonth(s));
  };

  // Render month columns
  const months = useMemo(() => {
    const arr = [];
    for (let i = 0; i < monthsToShow; i++) {
      const m = addMonths(visibleMonth, i);
      arr.push(m);
    }
    return arr;
  }, [visibleMonth, monthsToShow]);

  const canApply = Boolean(startDate && endDate);

  return (
    <CalendarWrapper>
      <MonthsWrapper $columns={monthsToShow}>
        <HeaderBar>
          <NavButtonL
            onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
          >
            <Icon as={Icon} icon="arrowRightLong" type="button" />
          </NavButtonL>
          <NavButton
            onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
          >
            <Icon as={Icon} icon="arrowRightLong" type="button" />
          </NavButton>
        </HeaderBar>
        {months.map((monthDate) => {
          const matrix = buildMonthMatrix(monthDate);
          const year = monthDate.getFullYear();
          const monthIndex = monthDate.getMonth();

          return (
            <MonthContainer key={`${year}-${monthIndex}`}>
              <MonthTitle>
                {ruMonths[monthIndex]} {year}
              </MonthTitle>

              <WeekHeader>
                {weekDays.map((w, i) => (
                  <WeekHeaderCell key={w} $isWeekend={i >= 5}>
                    {w}
                  </WeekHeaderCell>
                ))}
              </WeekHeader>

              <DaysGrid>
                {matrix.map((day, i) => {
                  if (day === null) {
                    return <span key={`empty-${i}`} />;
                  }
                  const cellDate = new Date(year, monthIndex, day);
                  const disabled = !inMinMax(cellDate);
                  const isStart = startDate && isSameDay(cellDate, startDate);
                  const isEnd = endDate && isSameDay(cellDate, endDate);
                  const inRange = isBetween(cellDate, startDate, endDate);
                  const isWeekend = i % 7 >= 5;

                  return (
                    <DayCell
                      key={day}
                      type="button"
                      disabled={disabled}
                      $isInRange={inRange}
                      $isStart={!!isStart}
                      $isEnd={!!isEnd}
                      $isWeekend={isWeekend}
                      onClick={() => !disabled && handleDayClick(cellDate)}
                      aria-pressed={isStart || isEnd}
                      aria-label={`${day}.${String(monthIndex + 1).padStart(2, "0")}.${year}`}
                    >
                      {day}
                    </DayCell>
                  );
                })}
              </DaysGrid>
            </MonthContainer>
          );
        })}
      </MonthsWrapper>

      <FooterWrapper>
        <InputsGroup>
          <DateInput
            placeholder="дд.мм.гггг"
            value={inputStart}
            onChange={onStartInputChange}
            onBlur={onStartInputBlur}
            aria-label="Дата начала"
          />
          <Dash>—</Dash>
          <DateInput
            placeholder="дд.мм.гггг"
            value={inputEnd}
            onChange={onEndInputChange}
            onBlur={onEndInputBlur}
            aria-label="Дата окончания"
          />
        </InputsGroup>

        <QuickActions>
          <QaButton type="button" onClick={setToday}>
            Сегодня
          </QaButton>
          <QaButton type="button" onClick={setTomorrow}>
            Завтра
          </QaButton>
          <QaButton type="button" onClick={setThisWeek}>
            На этой неделе
          </QaButton>
        </QuickActions>

        <ApplyContainer>
          <ApplyButton
            type="button"
            disabled={!canApply}
            onClick={() => canApply && onApply && onApply(startDate, endDate)}
          >
            Применить
          </ApplyButton>
        </ApplyContainer>
      </FooterWrapper>
    </CalendarWrapper>
  );
};

export default DateRangeCalendar;
