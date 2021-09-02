import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

const Results = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const userResults = [];
    Object.keys(users).forEach((user) => {
      const curUser = users[user];
      const userResult = {
        name: curUser.name,
        score: {
          question: curUser.questions.length,
          answer: Object.keys(curUser.answers).length,
          total: 0,
        },
      };
      userResult.score.total =
        userResult.score.question + userResult.score.answer;
      userResults.push(userResult);
    });
    userResults.sort((a, b) => {
      return b.score.total - a.score.total;
    });
    setResults(userResults);
  }, [users]);

  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>
          <h4>{result.name}</h4>
          <hr></hr>
          <h5>Score</h5>
          <p>Question: {result.score.question} </p>
          <p>Answer: {result.score.answer} </p>
          <p>Total: {result.score.total} </p>
        </div>
      ))}
    </div>
  );
};
export default Results;
