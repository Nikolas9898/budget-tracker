import {Stat} from '../models/Stat';

const colors: string[] = [
  '#C94D6D',
  '#4174C9',
  '#E4BF58',
  '#7CDDDD',
  '#7031AC',
  '#3C9D4E',
  '#8B008B',
  '#BDB76B',
  '#8B0000',
  '#E9967A',
  '#2F4F4F',
  '#4B0082',
  '#9ACD32'
];
export const setStatColor = (stats: Stat[]): Stat[] => {
  stats.sort((a: Stat, b: Stat) => b.value - a.value);
  const statsNewColor: Stat[] = [];
  stats.forEach((element: Stat, index: number) => {
    statsNewColor.push({...element, color: colors[index]});
  });
  return statsNewColor;
};
