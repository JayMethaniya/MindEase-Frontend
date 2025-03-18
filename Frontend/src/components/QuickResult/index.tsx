import React from "react";

// Define prop types
interface ResultProps {
  score: number;
}

const DepressionResult: React.FC<ResultProps> = ({ score }) => {
  return (
    <div className="show-score">
      <p className="result">
        Result:{" "}
        {score > 0 && score <= 10
          ? "You have Mild depression. This is the mildest form of depression and is characterized by a few depressive symptoms that do not significantly interfere with daily life."
          : score > 10 && score <= 20
          ? "You have Moderate depression. This level of depression is more severe than mild depression and causes more noticeable symptoms. It can interfere with daily activities and relationships."
          : score > 20 && score <= 30
          ? "You have Severe depression. This is the most severe form of depression and is characterized by a number of disabling symptoms. It can make it difficult to function at all."
          : score > 30 && score <= 50
          ? "This is a rare form of depression that is accompanied by psychotic symptoms, such as delusions or hallucinations."
          : ""}
      </p>
    </div>
  );
};

const AdhdResult: React.FC<ResultProps> = ({ score }) => {
  return (
    <div className="show-score">
      <p className="result">
        Result:{" "}
        {score > 0 && score <= 20
          ? "You have MILD ADHD. It is characterized by many symptoms that are not very disruptive to daily life."
          : score > 20 && score <= 35
          ? "You have Moderate ADHD. It is characterized by more symptoms that are more disruptive to daily life."
          : score > 35 && score <= 50
          ? "You have severe ADHD. It is characterized by many symptoms that are very disruptive to daily life."
          : ""}
      </p>
    </div>
  );
};

const OcdResult: React.FC<ResultProps> = ({ score }) => {
  return (
    <div className="show-score">
      <p className="result">
        Result:{" "}
        {score > 0 && score <= 10
          ? "Subclinical OCD: Scores of 0-10 indicate subclinical OCD. This means that the person has some OCD symptoms, but they are not severe enough to cause significant distress or impairment in daily life."
          : score > 10 && score <= 20
          ? "Mild OCD: Scores of 10-25 indicate mild OCD. This means that the person's OCD symptoms are causing some distress and impairment in daily life, but they are still manageable."
          : score > 20 && score <= 35
          ? "Moderate OCD: Scores of 20-35 indicate moderate OCD. This means that the person's OCD symptoms are causing significant distress and impairment in daily life."
          : score > 35 && score <= 50
          ? "Severe OCD: Scores of 35-50 indicate severe OCD. This means that the person's OCD symptoms are causing very significant distress and impairment in daily life."
          : ""}
      </p>
    </div>
  );
};

const AnxietyResult: React.FC<ResultProps> = ({ score }) => {
  return (
    <div className="show-score">
      <p className="result">
        Result:{" "}
        {score > 40 && score <= 50
          ? "Your anxiety levels are very high. Please prioritize your mental health. Reach out to a mental health professional urgently."
          : score > 30 && score <= 40
          ? "It appears your anxiety levels are high. It's important to seek professional help."
          : score > 10 && score <= 30
          ? "Your anxiety levels are moderate. Consider incorporating relaxation techniques into your routine."
          : score > 0 && score <= 10
          ? "Congratulations! Your anxiety levels are low. Keep practicing healthy coping mechanisms."
          : ""}
      </p>
    </div>
  );
};

// Export all components
export { DepressionResult, AdhdResult, OcdResult, AnxietyResult };
