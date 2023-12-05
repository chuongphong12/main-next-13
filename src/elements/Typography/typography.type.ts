import { TypographyProps as MTypographyProps } from '@mui/material';
import { ElementType } from 'react';

type letters = ['solid_neutral', 'solid_primary', 'solid_error'];
type numbers = [0, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

type UnionFromArray<
	T extends readonly any[],
	U extends readonly any[]
> = `${T[number]}.${U[number]}`;

type UnionType = UnionFromArray<letters, numbers>;

export type TypographyProps = MTypographyProps & {
	component?: ElementType;
	cate?: any;
};
