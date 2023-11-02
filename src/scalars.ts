import { INTERVALS } from './constants';
import { GraphQLScalarType, StringValueNode } from 'graphql';

const cleanInterval = (interval: string): string | never => {
  if (INTERVALS.includes(interval)) return interval;
  throw new Error('Invalid interval');
};
export const Interval = new GraphQLScalarType({
  name: 'Interval',
  description: `One of the preset intervals: [${INTERVALS}]`,
  serialize: cleanInterval,
  parseValue: cleanInterval,
  parseLiteral: (ast) => cleanInterval((ast as StringValueNode).value),
});
