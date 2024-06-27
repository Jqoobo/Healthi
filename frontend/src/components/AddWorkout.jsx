import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
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

const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  const [workoutType, setWorkoutType] = useState(``);

  const handleWorkoutTypeChange = (e) => {
    setWorkoutType(e.target.value);
    if (e.target.value === "") {
      setWorkout(`Nie wybrałeś typu treningu❗️`);
    } else {
      setWorkout(`#${e.target.value}\n-Nazwa ćwiczenia
-Seria
-Ilośc powtórzeń
-Wysiłek
-Czas trwania`);
    }
  };

  return (
    <Card>
      <Title>Dodaj trening</Title>
      <Select value={workoutType} onChange={handleWorkoutTypeChange}>
        <Option value="">Wybierz typ treningu🤔</Option>
        <Option value="Rower🚴🏼‍♂️">Rower🚴🏼‍♂️</Option>
        <Option value="Siłowy🏋🏼‍♂️">Siłowy🏋🏼‍♂️</Option>
        <Option value="Bieganie🏃🏼‍♂️">Bieganie🏃🏼‍♂️</Option>
        <Option value="Pływanie🏊🏼‍♂️">Pływanie🏊🏼‍♂️</Option>
      </Select>
      <TextInput
        textArea
        rows={10}
        value={workout}
        handelChange={(e) => setWorkout(e.target.value)}
      />
      <Button
        text="Dodaj trening"
        small
        onClick={() => addNewWorkout()}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />
    </Card>
  );
};

export default AddWorkout;
