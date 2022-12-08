import { useSession } from 'next-auth/react';

import Matches from 'components/Matches';
import ScoreTable from 'components/ScoreTable';
import { useUserRoles } from 'hooks';
import { IHomePageProps } from 'types';
import {
  StyledHomePage,
  StyledMatches,
  StyledScoreTable,
} from './HomePageStyled';

const HomePage: React.FC<IHomePageProps> = ({ className }) => {
  const { data: session, status } = useSession();
  const listRoles = useUserRoles();

  const isScoreTable = status === 'authenticated' && listRoles.length;

  return (
    <StyledHomePage>
      {isScoreTable && (
        <StyledScoreTable>
          <ScoreTable />
        </StyledScoreTable>
      )}
      <StyledMatches>
        <Matches forecast={true} />
      </StyledMatches>
    </StyledHomePage>
  );
};

export default HomePage;
