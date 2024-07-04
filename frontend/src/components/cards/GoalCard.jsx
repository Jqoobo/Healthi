import React from "react";
import styled from "styled-components";

const Card = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  padding: 16px 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 12px 14px;
  }
`;

const Name = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;

const Description = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
`;

const Status = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 400;
`;

const Date = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`;

const GoalCard = ({ goals }) => {
  return (
    <Card>
      <Name>{goals?.name}</Name>
      <Description>{goals?.description}</Description>
      <Status>
        {goals?.status} - <Date>{goals?.date}</Date>
      </Status>
    </Card>
  );
};

export default GoalCard;
