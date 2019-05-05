// @flow
import type {HOC} from 'recompose';

export type Tooltip = string | {text: string, theme: string, position: string};

export type Field = {
  title?: string,
  size?: string,
  placeholder?: string,
  value?: any,
  onChange?: (value: any) => void,
  disabled?: boolean,
  typeConfig?: any,
};

export type Section = {
  header?: string,
  tooltip?: Tooltip,
  explanation?: string,
  fields: Field[],
};

export type StructredSelectors = {[string]: (state: any) => any};

export type Handlers = {[string]: (props: any) => (evt: any) => void};

export type CreateSection = (props: any) => Section;

export type ExtraHocs = HOC<*, any>;

export type SectionConfig = {
  structredSelectors?: StructredSelectors,
  handlers?: Handlers,
  extraHocs?: ExtraHocs[],
  dependentProps?: string[],
  createSection: CreateSection,
};
