import styled from 'styled-components';

const rankWidh = '7%';
const userWidh = '40%';
const pointsWidh = '13%';
const numberWidh = '13%';
const effectiveWidh = '9%';
const expectedWidh = '9%';
const cancelledWidh = '9%';

export const StyledScoreTable = styled.div`
  width: 380px;
  margin: 0 auto;
  padding: 5px;
`;

export const StyledScoreTableHead = styled.div`
  display: flex;
  flex-direction: row;
  text-transform: uppercase;
`;

export const StyledScoreTableHeadRank = styled.div`
  width: ${rankWidh};
`;

export const StyledScoreTableHeadUser = styled.div`
  width: ${userWidh};
  text-transform: none;
`;

export const StyledScoreTableHeadPoints = styled.div`
  width: ${pointsWidh};
  text-align: center;
`;

export const StyledScoreTableHeadNumber = styled.div`
  width: ${numberWidh};
  text-align: center;
`;

export const StyledScoreTableHeadEffective = styled.div`
  width: ${effectiveWidh};
  text-align: center;
`;

export const StyledScoreTableHeadExpected = styled.div`
  width: ${expectedWidh};
  text-align: center;
`;

export const StyledScoreTableHeadCancelled = styled.div`
  width: ${cancelledWidh};
  text-align: center;
`;

export const StyledScoreTableList = styled.div`
  margin-top: 15px;
`;

export const StyledScoreTableRow = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 30px;
`;

export const StyledScoreTableRowRank = styled.div`
  width: ${rankWidh};
`;

export const StyledScoreTableRowUser = styled.div`
  width: ${userWidh};
`;

export const StyledScoreTableRowPoints = styled.div`
  width: ${pointsWidh};
  text-align: center;
`;

export const StyledScoreTableRowNumber = styled.div`
  width: ${numberWidh};
  text-align: center;
`;

export const StyledScoreTableRowEffective = styled.div`
  width: ${effectiveWidh};
  text-align: center;
`;

export const StyledScoreTableRowExpected = styled.div`
  width: ${expectedWidh};
  text-align: center;
`;

export const StyledScoreTableRowCancelled = styled.div`
  width: ${cancelledWidh};
  text-align: center;
`;

export const StyledScoreTableInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

export const StyledScoreTableInfoImg = styled.div`
  width: 30px;

  & img {
    width: 100%;
  }
`;

export const StyledScoreTableInfoText = styled.div`
  margin-left: 10px;

  & p {
    margin-top: 5px;
  }
`;
