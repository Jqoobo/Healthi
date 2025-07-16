import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GoalCard from "../components/cards/GoalCard";
import { CircularProgress } from "@mui/material";
import { getGoals, addGoal } from "../api";
import { useDispatch } from "react-redux";
import Button from "../components/Button";

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
  flex: 0.26;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const SecTitle = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const Input = styled.input`
  font-family: "Poppins", sans-serif;
  width: 91.9%;
  padding: 8px 12px;
  border: 1px solid #767676;
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.bgLight};
  outline: none;
  &:focus-within {
    border-color: ${({ theme }) => theme.secondary};
  }
  &:active {
    border: 1px solid ${({ theme }) => theme.secondary};
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const Select = styled.select`
  font-family: "Poppins", sans-serif;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #767676;
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.bgLight};
  outline: none;
  &:focus-within {
    border-color: ${({ theme }) => theme.secondary};
  }
  &:active {
    border: 1px solid ${({ theme }) => theme.secondary};
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const Option = styled.option`
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.bgLight};
`;

const NoItems = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  font-weight: 500;
  padding: 8px 0;
  text-align: center;
  min-height: 150px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Goals = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const [goalsList, setGoalsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState({
    name: "",
    description: "",
    status: "",
    date: new Date().toISOString().split("T")[0],
  });

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("fittrack-app-token");
      const response = await getGoals(token);
      console.log(response.data.goals);
      const formattedGoals = response?.data.goals
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
    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("fittrack-app-token");
      const response = await addGoal(token, goal);
      setGoalsList([...goalsList, response?.goal]);
      setGoal({
        name: "",
        description: "",
        status: "",
        date: new Date().toISOString().split("T")[0],
      });
      fetchGoals();
    } catch (error) {
      console.error("Error adding goal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Dodaj cel</Title>
          <Input
            type="text"
            placeholder="Nazwa celu"
            value={goal.name}
            onChange={(e) => setGoal({ ...goal, name: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Opis celu"
            value={goal.description}
            onChange={(e) => setGoal({ ...goal, description: e.target.value })}
          />
          <Select
            value={goal.status}
            onChange={(e) => setGoal({ ...goal, status: e.target.value })}
          >
            <Option value="">Wybierz status 👇</Option>
            <Option value="Zaplanowano">Zaplanowano🔜</Option>
            <Option value="Zrealizowano">Zrealizowano✔️</Option>
          </Select>
          <Input
            type="date"
            value={goal.date}
            onChange={(e) => setGoal({ ...goal, date: e.target.value })}
          />

          <Button
            text={loading ? <CircularProgress size={20} /> : "Dodaj cel"}
            small
            type="primary"
            onClick={handleAddGoal}
            isLoading={loading}
            isDisabled={loading}
          />
        </Left>
        <Right>
          <Section>
            <SecTitle>Cele</SecTitle>
            {goalsList.length === 0 ? (
              <NoItems>Brak celów</NoItems>
            ) : (
              <CardWrapper>
                {goalsList.map((goals) => (
                  <GoalCard goals={goals} />
                ))}
              </CardWrapper>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Goals;
