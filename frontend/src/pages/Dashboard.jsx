import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../assets/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts, getGoals } from "../api";
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
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 16px 0;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  min-height: 150px;
  height: 100%;
  align-items: center;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const NoItems = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  font-weight: 500;
  padding: 16px;
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState(`Nie wybrałeś typu treningu❗️`);
  const [goalsList, setGoalsList] = useState([]);

  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getDashboardDetails(token).then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };
  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getWorkouts(token, "").then((res) => {
      setTodaysWorkouts(res?.data?.todaysWorkouts);
      console.log(res.data);
      setLoading(false);
    });
  };

  const addNewWorkout = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await addWorkout(token, { workoutString: workout })
      .then((res) => {
        dashboardData();
        getTodaysWorkout();
        setButtonLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("fittrack-app-token");
      const response = await getGoals(token);
      console.log(response.data.goals);
      const formattedGoals = response?.data.goals
        .filter((goal) => {
          const goalDate = new Date(goal.date);
          const today = new Date();
          const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
          return goalDate >= today && goalDate <= nextWeek;
        })
        .map((goal) => ({
          ...goal,
          date: new Date(goal.date).toLocaleDateString(),
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setGoalsList(formattedGoals || []);
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
    fetchGoals();
  }, []);
  return (
    <Container>
      <Wrapper>
        <Title>Panel główny</Title>
        <FlexWrap>
          {counts.map((item) => (
            <CountsCard item={item} data={data} />
          ))}
        </FlexWrap>

        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          <AddWorkout
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
        </FlexWrap>

        <Section>
          <Title>Dzisiejsze treningi</Title>
          {loading ? (
            <NoItems>Twoje treningi już tu prawie są 😎</NoItems>
          ) : todaysWorkouts.length > 0 ? (
            <CardWrapper>
              {todaysWorkouts.map((workout) => (
                <WorkoutCard workout={workout} key={workout.id} />
              ))}
            </CardWrapper>
          ) : (
            <NoItems key="no-todays-workouts">
              Brak treningów z dzisiejszego dnia
            </NoItems>
          )}
        </Section>
        <Section>
          <Title>Najbliższe cele</Title>
          {loading ? (
            <NoItems>Twoje cele już tu prawie są 😎</NoItems>
          ) : goalsList.length > 0 ? (
            <CardWrapper>
              {goalsList.map((goals) => (
                <GoalCard goals={goals} key={goals.id} />
              ))}
            </CardWrapper>
          ) : (
            <NoItems key="no-goals">Brak celów na najbliższy czas</NoItems>
          )}
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
