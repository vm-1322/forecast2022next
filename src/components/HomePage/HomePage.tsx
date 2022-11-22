import Matches from '../../components/Matches';
import ScoreTable from '../../components/ScoreTable';

import {
  StyledHomePage,
  StyledMatches,
  StyledScoreTable,
} from './HomePageStyled';
import { IHomePageProps } from '../../types';

const HomePage: React.FC<IHomePageProps> = ({ className }) => {
  return (
    <StyledHomePage>
      <StyledMatches>
        <Matches forecast={true} />
      </StyledMatches>
      <StyledScoreTable>
        <ScoreTable />
      </StyledScoreTable>
    </StyledHomePage>
  );
};

export default HomePage;
