import { scoreRuleEnum } from "../enums/scoreRuleEnum";

export const constants = {
  cardLetters: { 1: "A", 11: "J", 12: "Q", 13: "K" },
  totalNumberOfDecks: 8,
  totalNumberOfCards: 13,
  splitCardInfo: {
    firstSectionLastCardIndex: 24,
    firstSectionSplitNumber: 6,
    secondSectionLastCardIndex: 54,
    secondSectionSplitNumber: 5,
  },
  scoreRules: [
    { rule: scoreRuleEnum.completeHand, points: 1040 },
    { rule: scoreRuleEnum.openCard, points: 150 },
    { rule: scoreRuleEnum.getHint, points: -20 },
  ],
};
