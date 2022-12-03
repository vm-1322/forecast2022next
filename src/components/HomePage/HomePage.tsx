import Matches from 'components/Matches';
import ScoreTable from 'components/ScoreTable';
import { IHomePageProps } from 'types';
import {
  StyledHomePage,
  StyledMatches,
  StyledScoreTable,
} from './HomePageStyled';

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
