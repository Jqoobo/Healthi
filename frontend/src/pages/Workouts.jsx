import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/cards/WorkoutCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { getWorkouts, getGoals } from "../api";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import GoalCard from "../components/cards/GoalCard";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 0.2;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const Right = styled.div`
  flex: 1;
  @media (max-width: 600px) {
    margin-top: 16px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  min-height: 150px;
  height: 100%;
  margin-bottom: 64px;
  align-items: center;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const SecTitle = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const NoItems = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  font-weight: 500;
  padding: 8px;
`;

const Workouts = () => {
  const dispatch = useDispatch();
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [goalsList, setGoalsList] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const [workoutRes, goalsRes] = await Promise.all([
        getWorkouts(token, date ? `?date=${date}` : ""),
        getGoals(token),
      ]);

      setTodaysWorkouts(workoutRes?.data?.todaysWorkouts);

      const formattedGoals = goalsRes?.data.goals
        .filter((goal) => {
          const goalDate = new Date(goal.date).toLocaleDateString();
          const selectedDate = new Date(date).toLocaleDateString();
          return goalDate === selectedDate;
        })
        .map((goal) => ({
          ...goal,
          date: new Date(goal.date).toLocaleDateString(),
        }));
      setGoalsList(formattedGoals || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Wybierz date</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={(e) => setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)}
            />
          </LocalizationProvider>
        </Left>
        <Right>
          <Section>
            <SecTitle>Treningi</SecTitle>
            {loading ? (
              <CircularProgress />
            ) : (
              <CardWrapper>
                {todaysWorkouts.length > 0 ? (
                  todaysWorkouts.map((workout) => (
                    <WorkoutCard workout={workout} />
                  ))
                ) : (
                  <NoItems>Brak treningów</NoItems>
                )}
              </CardWrapper>
            )}
          </Section>
          <Section>
            <SecTitle>Cele</SecTitle>
            {loading ? (
              <CircularProgress />
            ) : (
              <CardWrapper>
                {goalsList.length > 0 ? (
                  goalsList.map((goals) => <GoalCard goals={goals} />)
                ) : (
                  <NoItems>Brak celi</NoItems>
                )}
              </CardWrapper>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;
