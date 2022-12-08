import { useEffect, useState } from 'react';

import { DBAction, IScoreTable, IScoreTableProps } from 'types';
import {
  StyledScoreTable,
  StyledScoreTableHead,
  StyledScoreTableHeadRank,
  StyledScoreTableHeadUser,
  StyledScoreTableHeadPoints,
  StyledScoreTableHeadNumber,
  StyledScoreTableHeadEffective,
  StyledScoreTableHeadExpected,
  StyledScoreTableHeadCancelled,
  StyledScoreTableList,
  StyledScoreTableRow,
  StyledScoreTableRowRank,
  StyledScoreTableRowUser,
  StyledScoreTableRowPoints,
  StyledScoreTableRowNumber,
  StyledScoreTableRowEffective,
  StyledScoreTableRowExpected,
  StyledScoreTableRowCancelled,
  StyledScoreTableInfo,
  StyledScoreTableInfoImg,
  StyledScoreTableInfoText,
} from './ScoreTableStyled';

const ScoreTable: React.FC<IScoreTableProps> = ({ className }) => {
  const [scoreTable, setScoreTable] = useState<Array<IScoreTable>>([]);

  const retriveData = async () => {
    const response = await fetch('/api/scoretable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: DBAction.Read }),
    });

    const data = await response.json();
    const listScoreTable = data.data;

    setScoreTable(
      listScoreTable.sort((a, b) => {
        const comparePoins = b.points - a.points;

        if (comparePoins !== 0) return comparePoins;

        return a.dateForecast - b.dateForecast;
      })
    );
  };

  useEffect(() => {
    retriveData();
  }, []);

  const renderScoretableRow = (rowTable: IScoreTable, index: number) => {
    return (
      <StyledScoreTableRow>
        <StyledScoreTableRowRank>{index + 1}</StyledScoreTableRowRank>
        <StyledScoreTableRowUser>
          {JSON.parse(JSON.stringify(rowTable.user)).username}
        </StyledScoreTableRowUser>
        <StyledScoreTableRowPoints>{rowTable.points}</StyledScoreTableRowPoints>
        <StyledScoreTableRowNumber>
          {rowTable.numberForecasts}
        </StyledScoreTableRowNumber>
        <StyledScoreTableRowEffective>
          {rowTable.effectiveForecasts}
        </StyledScoreTableRowEffective>
        <StyledScoreTableRowExpected>
          {rowTable.expectedForecasts}
        </StyledScoreTableRowExpected>
        <StyledScoreTableRowCancelled>
          {rowTable.canceledForecasts}
        </StyledScoreTableRowCancelled>
      </StyledScoreTableRow>
    );
  };

  return (
    <StyledScoreTable>
      <StyledScoreTableHead>
        <StyledScoreTableHeadRank></StyledScoreTableHeadRank>
        <StyledScoreTableHeadUser>User</StyledScoreTableHeadUser>
        <StyledScoreTableHeadPoints>PTS</StyledScoreTableHeadPoints>
        <StyledScoreTableHeadNumber>NUM</StyledScoreTableHeadNumber>
        <StyledScoreTableHeadEffective>EFF</StyledScoreTableHeadEffective>
        <StyledScoreTableHeadExpected>EXP</StyledScoreTableHeadExpected>
        <StyledScoreTableHeadCancelled>CLD</StyledScoreTableHeadCancelled>
      </StyledScoreTableHead>
      <StyledScoreTableList>
        {scoreTable.map(renderScoretableRow)}
      </StyledScoreTableList>
      <StyledScoreTableInfo>
        <StyledScoreTableInfoImg>
          <img src='/images/information.png' alt='Info' />
        </StyledScoreTableInfoImg>
        <StyledScoreTableInfoText>
          <p>PTS - Points</p>
          <p>NUM - Number of forecasts</p>
          <p>EFF - Effective forecasts</p>
          <p>EXP - Expected forecasts</p>
          <p>CLD - Canceled forecasts</p>
        </StyledScoreTableInfoText>
      </StyledScoreTableInfo>
    </StyledScoreTable>
  );
};

export default ScoreTable;
