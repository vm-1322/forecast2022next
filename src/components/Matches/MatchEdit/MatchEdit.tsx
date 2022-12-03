import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { IMatchEditProps, ITeam, Stages, Rounds, MatchStatus } from 'types';
import { timeStampToDate } from 'utility/common';
import {
  StyledMatchEdit,
  StyledMatchEditTitle,
  StyledMatchEditDateStage,
  StyledMatchEditDate,
  StyledMatchEditStage,
  StyledMatchEditStageKind,
  StyledMatchEditStageGroup,
  StyledMatchEditStageGroupRound,
  StyledMatchEditStageRound,
  StyledMatchTeams,
  StyledMatchTeamItem,
  StyledMatchTeamItemFlag,
  StyledMatchResult,
  StyledMatchResultGoal,
  StyledMatchStatus,
  StyledMatchForecastCheckBox,
  StyledMatchSLinkToBet,
  StyledMatchFormCheckBox,
} from './MatchEditStyled';

const MatchEdit: React.FC<IMatchEditProps> = ({ match, create, className }) => {
  if (JSON.stringify(match) === '{}' && !create) return null;

  const goal1InputRef = useRef<HTMLInputElement>();
  const goal2InputRef = useRef<HTMLInputElement>();
  const matchStatusSelectRef = useRef<HTMLSelectElement>();
  const linkToBetTextAreaRef = useRef<HTMLTextAreaElement>();

  const [listTeams, setListTeams] = useState<Array<ITeam>>([]);
  const [curDate, setCurDate] = useState(
    timeStampToDate(match.date ? match.date : Date.now())
  );
  const [stage, setStage] = useState('GS');
  const [group, setGroup] = useState('');
  const [round, setRound] = useState(0);

  const [team1, setTeam1] = useState<ITeam>(null);
  const [team2, setTeam2] = useState<ITeam>(null);

  const [goal1, setGoal1] = useState(null);
  const [goal2, setGoal2] = useState(null);
  const [includeToForecast, setIncludeToForecast] = useState(false);
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  const router = useRouter();

  console.log('match', match);

  const matchHandler = async () => {
    if (team1.name === team2.name) return;

    const response = await fetch('/api/match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        create: create,
        match: {
          date: new Date(curDate).getTime(),
          team1: team1._id,
          team1Code: team1.code,
          team2: team2._id,
          team2Code: team2.code,
          result1: goal1,
          result2: goal2,
          stage: {
            kind: stage,
            groupRound: group,
            round: round,
          },
          forecast: includeToForecast,
          matchStatus: matchStatusSelectRef.current.value,
          linkToBet: linkToBetTextAreaRef.current.value,
          _id: match?._id,
        },
      }),
    });

    console.log('response', response);

    if (response) {
      router.replace('/dashboard');
    }
  };

  const selectTeamHandler = (nameTeam: string, value: string) => {
    if (!value) return;

    const otherTeamValue = nameTeam === 'team1' ? team2?.name : team1?.name;

    if (value === otherTeamValue) {
      if (nameTeam === 'team1') {
        setTeam1(null);
      } else {
        setTeam2(null);
      }
    }

    const selectedTeam = listTeams.find((teamItem) => teamItem.name === value);

    if (nameTeam === 'team1') {
      setTeam1(selectedTeam);
    } else {
      setTeam2(selectedTeam);
    }
  };

  const selectStageHandler = (value: string) => {
    setStage(value);
  };

  const retriveTeams = async () => {
    const response = await fetch('/api/teams', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const listTeams = await response.json();
    listTeams.sort((a: ITeam, b: ITeam) => a.name.localeCompare(b.name));

    setListTeams(listTeams);
  };

  const retriveData = async () => {
    if (create) {
      retriveTeams();
    } else {
      setTeam1({
        code: match.matchDetails?.team1.code,
        name: match.matchDetails?.team1.name,
        flag: match.matchDetails?.team1.flag,
        _id: match.team1?.toString(),
      });
      setTeam2({
        code: match.matchDetails?.team2.code,
        name: match.matchDetails?.team2.name,
        flag: match.matchDetails?.team2.flag,
        _id: match.team2?.toString(),
      });

      setListTeams([
        {
          code: match.matchDetails?.team1.code,
          name: match.matchDetails?.team1.name,
          flag: match.matchDetails?.team1.flag,
          _id: match.team1?.toString(),
        },
        {
          code: match.matchDetails?.team2.code,
          name: match.matchDetails?.team2.name,
          flag: match.matchDetails?.team2.flag,
          _id: match.team2?.toString(),
        },
      ]);

      setGoal1(match.result1);
      setGoal2(match.result2);

      setIncludeToForecast(match.forecast);

      setStage(match.stage.kind);
      setGroup(match.stage.groupRound);
      setRound(match.stage.round);
    }
  };

  useEffect(() => {
    retriveData();
  }, []);

  const renderTeamItem = (team: ITeam, ind: number) => {
    return (
      <StyledMatchTeamItem key={team?._id}>
        <StyledMatchTeamItemFlag>
          <img src={team?.flag} alt={team?.code} />
        </StyledMatchTeamItemFlag>
        <select
          name={`team${ind}`}
          id={`team${ind}`}
          disabled={!create}
          onChange={(e) => {
            selectTeamHandler(e.target.name, e.target.value);
          }}
        >
          <option value='0'>Select team ...</option>
          {listTeams.map((teamItem) => {
            return (
              <option
                value={teamItem.name}
                selected={team?.name === teamItem.name}
              >
                {teamItem.name}
              </option>
            );
          })}
        </select>
      </StyledMatchTeamItem>
    );
  };

  console.log('group', group);

  return (
    <StyledMatchEdit>
      <form
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          matchHandler();
        }}
      >
        <StyledMatchEditTitle>Match</StyledMatchEditTitle>
        <StyledMatchEditDateStage>
          <StyledMatchEditDate>
            <label htmlFor='matchDate'>Date</label>
            <input
              type='datetime-local'
              name='matchDate'
              id='matchDate'
              value={curDate}
              onChange={(e) => setCurDate(e.target.value)}
            ></input>
          </StyledMatchEditDate>
          <StyledMatchEditStage>
            <StyledMatchEditStageKind>
              <select
                name='stageKind'
                disabled={!create}
                onChange={(e) => selectStageHandler(e.target.value)}
              >
                {Object.keys(Stages).map((key) => (
                  <option value={key} selected={stage === key}>
                    {Stages[key]}
                  </option>
                ))}
              </select>
            </StyledMatchEditStageKind>
            <StyledMatchEditStageGroup
              className={stage === 'PO' ? 'display-none' : null}
            >
              <label htmlFor='group'>Group</label>
              <input
                type='text'
                name='group'
                id='group'
                value={group}
                autoFocus
                onChange={(e) => setGroup(e.target.value.toUpperCase())}
              />
            </StyledMatchEditStageGroup>
            <StyledMatchEditStageGroupRound
              className={stage === 'PO' ? 'display-none' : null}
            >
              <label htmlFor='roundGS'>Round</label>
              <input
                type='number'
                name='roundGS'
                id='roundGS'
                value={round}
                min={0}
                autoFocus
                onChange={(e) => setRound(Number(e.target.value))}
              />
            </StyledMatchEditStageGroupRound>
            <StyledMatchEditStageRound
              className={stage === 'GS' ? 'display-none' : null}
            >
              <select name='roundPO' onChange={(e) => setGroup(e.target.value)}>
                {Object.keys(Rounds).map((key) => (
                  <option value={key} selected={group === key}>
                    {Rounds[key]}
                  </option>
                ))}
              </select>
            </StyledMatchEditStageRound>
          </StyledMatchEditStage>
        </StyledMatchEditDateStage>
        <StyledMatchTeams>
          {renderTeamItem(team1, 1)}
          {renderTeamItem(team2, 2)}
        </StyledMatchTeams>
        <StyledMatchResult>
          <StyledMatchResultGoal>
            <input
              type='Number'
              min={0}
              value={goal1}
              required={!create}
              ref={goal1InputRef}
              onChange={(e) => setGoal1(e.target.value)}
            />
          </StyledMatchResultGoal>
          <StyledMatchResultGoal>
            <input
              type='Number'
              min={0}
              value={goal2}
              required={!create}
              ref={goal2InputRef}
              onChange={(e) => setGoal2(e.target.value)}
            />
          </StyledMatchResultGoal>
        </StyledMatchResult>
        <StyledMatchStatus>
          <label htmlFor='matchStatus'>Match status</label>
          <select
            name='matchStatus'
            id='matchStatus'
            ref={matchStatusSelectRef}
            onChange={(e) => {
              goal1InputRef.current.required =
                e.target.value === MatchStatus.Finished;
              goal2InputRef.current.required =
                e.target.value === MatchStatus.Finished;
            }}
          >
            {Object.keys(MatchStatus).map((key) => (
              <option selected={match.matchStatus === key}>{key}</option>
            ))}
          </select>
        </StyledMatchStatus>
        <StyledMatchForecastCheckBox>
          <input
            type='checkbox'
            checked={includeToForecast}
            onChange={() => {
              setIncludeToForecast((prevState) => !prevState);
            }}
          />
          Include to forecasts
        </StyledMatchForecastCheckBox>
        <StyledMatchSLinkToBet>
          <label htmlFor='linkToBet'>Link to bet</label>
          <textarea
            name='linkToBet'
            id='linkToBet'
            rows={5}
            ref={linkToBetTextAreaRef}
          >
            {match.linkToBet}
          </textarea>
        </StyledMatchSLinkToBet>
        <StyledMatchFormCheckBox>
          <input
            type='checkbox'
            onClick={() => {
              setDataIsCorrect((prevState) => !prevState);
            }}
          />
          Data are correct
        </StyledMatchFormCheckBox>
        <input
          type='submit'
          value={create ? 'Create Match' : 'Save Match'}
          disabled={!dataIsCorrect}
        />
      </form>
    </StyledMatchEdit>
  );
};

export default MatchEdit;
