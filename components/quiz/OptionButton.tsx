import React from "react";

interface OptionButtonProps {
  option: string;
  index: number;
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  isSelectedWrong: boolean;
  onClick: (index: number) => void;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  index,
  isSelected,
  isAnswered,
  isCorrect,
  isSelectedWrong,
  onClick,
}) => {
  let buttonStyle =
    "bg-[var(--color-muted)]/5 hover:bg-[var(--color-muted)]/10 transition-colors";

  if (isAnswered) {
    if (isCorrect) {
      buttonStyle = "bg-[var(--color-success)]/10 text-[var(--color-primary)]";
    } else if (isSelectedWrong) {
      buttonStyle = "bg-[var(--color-danger)]/10 text-[var(--color-danger)]";
    } else {
      buttonStyle = "bg-[var(--color-muted)]/5 opacity-50";
    }
  } else if (isSelected) {
    buttonStyle = "bg-[var(--color-accent)]/20";
  }

  return (
    <button
      onClick={() => onClick(index)}
      disabled={isAnswered}
      className={`w-full text-left p-4 rounded-xl ${isAnswered ? "cursor-default" : "cursor-pointer"} ${buttonStyle}`}
    >
      <span className="font-normal text-lg text-[var(--color-primary)]">
        {option}
      </span>
    </button>
  );
};
