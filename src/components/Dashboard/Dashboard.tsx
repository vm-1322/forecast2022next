import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Match from 'components/Matches/Match';
import { IDashboardProps, IMatch } from 'types';
import {
  StyledDashboard,
  StyledDashboardMatchestsList,
  StyledDashboardMatchItem,
  StyledDashboardMatchItemStatusEdit,
  StyledDashboardMatchItemStatus,
  StyledDashboardMatchItemEdit,
  StyledDashboardCreateMatch,
} from './DashboardStyled';

const Dashboard: React.FC<IDashboardProps> = ({ className }) => {
  const [matches, setMatches] = useState<Array<IMatch>>([]);
  const router = useRouter();

  const editMatch = (curMatch: IMatch) => {
    router.push(
      {
        pathname: '/match-edit',
        query: {
          match: JSON.stringify(curMatch),
        },
      },
      '/match-edit'
    );
  };

  const createMatch = () => {
    console.log('createMatch');

    router.push(
      {
        pathname: '/match-edit',
        query: {
          create: JSON.stringify(true),
        },
      },
      '/match-edit'
    );
  };

  const retriveMatches = async () => {
    const response = await fetch('/api/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const listMatches = await response.json();
    setMatches(listMatches);
  };

  const renderMatchItem = (match: IMatch) => {
    return (
      <StyledDashboardMatchItem>
        <Match
          match={match}
          matchStatus={
            <StyledDashboardMatchItemStatusEdit>
              <StyledDashboardMatchItemStatus>
                {match.matchStatus}
              </StyledDashboardMatchItemStatus>
              <StyledDashboardMatchItemEdit>
                <input
                  type='button'
                  value='Edit'
                  onClick={(event: React.FormEvent) => {
                    event.preventDefault();
                    editMatch(match);
                  }}
                />
              </StyledDashboardMatchItemEdit>
            </StyledDashboardMatchItemStatusEdit>
          }
        />
      </StyledDashboardMatchItem>
    );
  };

  useEffect(() => {
    retriveMatches();
  }, []);

  return (
    <StyledDashboard>
      <StyledDashboardMatchestsList>
        {matches.map(renderMatchItem)}
        <StyledDashboardCreateMatch>
          <input
            type='button'
            value='Create Match'
            onClick={(event: React.FormEvent) => {
              event.preventDefault();
              createMatch();
            }}
          />
        </StyledDashboardCreateMatch>
      </StyledDashboardMatchestsList>
    </StyledDashboard>
  );
};

export default Dashboard;
