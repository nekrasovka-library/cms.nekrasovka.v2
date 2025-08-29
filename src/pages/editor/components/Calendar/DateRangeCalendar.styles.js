import styled, { css } from "styled-components";

const colors = {
  text: "#346178",
  muted: "#8091A7",
  weekend: "#C84C4C",
  rangeBg: "#edede9",
  selectedBg: "#edede9",
  btnText: "#346178",
  applyBg: "#346178",
  applyText: "#EDEEE9",
  inputBorder: "#346178",
  inputText: "#346178",
  hover: "#346178",
};

export const CalendarWrapper = styled.div`
  width: 100%;
  border-radius: 5px;
  background: #fff;
  user-select: none;
  margin-bottom: 30px;
  padding: 30px 0;
`;

export const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 30px;
  right: 30px;
  top: 8px;
`;

export const NavButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const NavButtonL = styled(NavButton)`
  transform: rotate(180deg);
`;

export const MonthsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns || 3}, 1fr);
  gap: 20px;
  position: relative;
`;

export const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 30px;
`;

export const MonthTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: #777777;
`;

export const WeekHeader = styled.div`
  display: flex;
  padding: 0 20px;
`;

export const WeekHeaderCell = styled.div`
  width: calc(100% / 7);
  height: 25px;
  text-align: center;
  font-size: 20px;
  color: ${({ $isWeekend }) => ($isWeekend ? colors.weekend : "#777777")};
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(calc(100% / 7), 50px));
  padding: 0 20px;
`;

const rangeStyles = css`
  ${({ $isInRange }) =>
    $isInRange &&
    `
      background: ${colors.rangeBg};
    `};

  ${({ $isStart, $isEnd }) =>
    ($isStart || $isEnd) &&
    `
      background: ${colors.selectedBg};
    `};

  ${({ $isWeekend }) =>
    $isWeekend &&
    `
      color: ${colors.weekend};
    `};
`;

export const DayCell = styled.button`
  border: none;
  background: transparent;
  color: ${colors.text};
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  height: 40px;

  ${rangeStyles};

  &:hover {
    background: #edede9;
  }

  &:disabled {
    color: ${colors.muted};
    background: transparent;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const FooterWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 40px;
  align-items: center;
  padding: 0 30px;
`;

export const InputsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DateInput = styled.input`
  height: 40px;
  max-width: 150px;
  padding: 0 12px;
  border: 1px solid #9e9d9d66;
  border-radius: 5px;
  color: #777777;
  font-size: 20px;
  outline: none;
`;

export const Dash = styled.span`
  color: #777777;
  font-size: 18px;
`;

export const QuickActions = styled.div`
  display: flex;
  column-gap: 10px;
`;

export const QaButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 5px;
  border: 1px solid ${colors.inputBorder};
  color: ${colors.btnText};
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background: ${colors.hover};
    color: #edede9;
  }
`;

export const ApplyContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ApplyButton = styled.button`
  height: 40px;
  padding: 0 18px;
  border-radius: 5px;
  border: none;
  background: ${colors.applyBg};
  color: ${colors.applyText};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
