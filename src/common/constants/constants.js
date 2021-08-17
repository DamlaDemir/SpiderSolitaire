import { scoreRuleEnum } from "../enums/scoreRuleEnum";

export const constants = {
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
