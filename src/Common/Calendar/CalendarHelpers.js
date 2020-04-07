import styled from "styled-components";
import {get} from "lodash";

const ptoTypes = {
    sick: {
        currentPeriod: {bgColor: "#e24381", color: "#ffffff"},
        oldPeriod: {borderColor: "#e24381"},
        futurePeriod: {bgColor: "#ED93B5", color: "#343949"}
    },
    leave: { // vacation
        currentPeriod: {bgColor: "#976fed", color: "#ffffff"},
        oldPeriod: {borderColor: "#976fed"},
        futurePeriod: {bgColor: "#D5C5F7", color: "#343949"}
    },
    unpaid: {
        currentPeriod: {bgColor: "#48C4D3", color: "#ffffff"},
        oldPeriod: {borderColor: "#48C4D3"},
        futurePeriod: {bgColor: "#7EECF1", color: "#343949"}
    },
    child_care_leave: {
        currentPeriod: {bgColor: "#F58614", color: "#ffffff"},
        oldPeriod: {borderColor: "#F58614"},
        futurePeriod: {bgColor: "#FFCC9A", color: "#343949"}
    },
    maternity_leave: {
        currentPeriod: {bgColor: "#F58614", color: "#ffffff"},
        oldPeriod: {borderColor: "#F58614"},
        futurePeriod: {bgColor: "#FFCC9A", color: "#343949"}
    },
    paternity_leave: {
        currentPeriod: {bgColor: "#F58614", color: "#ffffff"},
        oldPeriod: {borderColor: "#F58614"},
        futurePeriod: {bgColor: "#FFCC9A", color: "#343949"}
    },
    parental_leave: {
        currentPeriod: {bgColor: "#F58614", color: "#ffffff"},
        oldPeriod: {borderColor: "#F58614"},
        futurePeriod: {bgColor: "#FFCC9A", color: "#343949"}
    },
    marriage_leave: {
        currentPeriod: {bgColor: "#F58614", color: "#ffffff"},
        oldPeriod: {borderColor: "#F58614"},
        futurePeriod: {bgColor: "#FFCC9A", color: "#343949"}
    },
    birthday_leave: {
        currentPeriod: {bgColor: "#72CF26", color: "#ffffff"},
        oldPeriod: {borderColor: "#72CF26"},
        futurePeriod: {bgColor: "#BCEDA0", color: "#343949"}
    },
    bereavement_leave: {
        currentPeriod: {bgColor: "#635F5B", color: "#ffffff"},
        oldPeriod: {borderColor: "#635F5B"},
        futurePeriod: {bgColor: "#C0BFBD", color: "#343949"}
    },
    military_leave: {
        currentPeriod: {bgColor: "#4E9FC9", color: "#ffffff"},
        oldPeriod: {borderColor: "#4E9FC9"},
        futurePeriod: {bgColor: "#B0D9EB", color: "#343949"}
    },
    other: {
        currentPeriod: {bgColor: "#4E9FC9", color: "#ffffff"},
        oldPeriod: {borderColor: "#4E9FC9"},
        futurePeriod: {bgColor: "#B0D9EB", color: "#343949"}
    }
};

export const CurrentMonth = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;
export const CalendarWrapper = styled.div`
  max-width: 337px;
  min-height: 320px;
  background: #ffffff;
  border-radius: 4px;
  padding: 5px;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: ${({flat}) => flat ? "none" : "0 2px 10px 0 rgba(0, 0, 0, 0.1)"};
`;
export const CalendarBody = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;
export const CalendarHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderDate = styled.div`
  flex: 3;
  padding-left: 10px;
`;
export const PrevNextIcon = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  > img {
    margin: 0 5px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;
export const MonthsWrapper = styled.div`
  display: flex;
  flex-direction: row;  
  transition: transform 0s linear;
  will-change: transform;
  transform: translateX(0px);
  &.nxt {
    transition: transform 0.8s linear;
    transform: translateX(336px);
  }
  &.prev {
    transition: transform 0.8s linear;
    transform: translateX(-336px);
  }
`;
export const RowsWrapper = styled.div`
  flex-shrink: 0;
  overflow: auto;
`;
export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 3px 0;
  position: relative;
  z-index: 0;
`;
export const DaysWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Day = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 8px;
  cursor: pointer;
  &:hover {
    background-color: #f2f3f5;
    border-radius: 16px;
  }
  
  .days {
    display: block;
    font-size: 0.9rem;
    color: #343949;
    line-height: 1;
    cursor: pointer;
    //color: #c2c3c8;
  }
  .days:first-child {
    margin-left: 0;
  }
  .days:last-child {
    margin-right: 0;
  }
  .days.dayNotCurrentMonth, 
  .disabled .days {
    color: #d4d5d8;
    cursor: default;
  }
  
  &.currentPeriod {
    background-color: ${({type}) => get(ptoTypes, `${type}.currentPeriod.bgColor`)};
    border-radius: 24px;
    position: relative;
    .days {
      color: ${({type}) => get(ptoTypes, `${type}.currentPeriod.color`)};
    }
    + .currentPeriod:before {
      content: "";
      position: absolute;
      z-index: -1;
      background: inherit;
      top: 0;
      bottom: 0;
      left: -95%;
      right: 50%;
    }
  }
  &.oldPeriod {
    border: 1px solid ${({type}) => get(ptoTypes, `${type}.oldPeriod.borderColor`)};
    border-radius: 24px;
    position: relative;
  }
  &.futurePeriod {
    background-color: ${({type}) => get(ptoTypes, `${type}.futurePeriod.bgColor`)};
    border-radius: 24px;
    position: relative;
    .days {
      color: ${({type}) => get(ptoTypes, `${type}.futurePeriod.color`)};      
    }
    + .futurePeriod:before {
      content: "";
      position: absolute;
      z-index: -1;
      background: inherit;
      top: 0;
      bottom: 0;
      left: -95%;
      right: 50%;
    }
  }
`;
