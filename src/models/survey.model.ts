export enum QuestionType {
  MultipleChoice = 'MultipleChoice',
  SingleChoice = 'SingleChoice',
  Text = 'Text',
  Rating = 'Rating',
  Checkbox = 'Checkbox',
  Date = 'Date',
  Number = 'Number',
  Textarea = 'Textarea',
  Dropdown = 'Dropdown',
  FileUpload = 'FileUpload'
}

export interface Validation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: string;
  minDate?: string;
  maxDate?: string;
  acceptedFileTypes?: string[];
  maxSizeMB?: number;
}

export interface ConditionalLogic {
  questionId: string;
  value: any;
  action: 'show' | 'hide';
}

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  order: number;
  section?: string;
  helpText?: string;
  validation?: Validation;
  logic?: ConditionalLogic[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.MultipleChoice;
  options: string[];
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: QuestionType.SingleChoice;
  options: string[];
}

export interface TextQuestion extends BaseQuestion {
  type: QuestionType.Text;
  placeholder: string;
}

export interface RatingQuestion extends BaseQuestion {
  type: QuestionType.Rating;
  scale: number;
}

export interface CheckboxQuestion extends BaseQuestion {
  type: QuestionType.Checkbox;
  checked: boolean;
}

export interface DateQuestion extends BaseQuestion {
  type: QuestionType.Date;
  minDate?: string;
  maxDate?: string;
}

export interface NumberQuestion extends BaseQuestion {
  type: QuestionType.Number;
  minValue?: number;
  maxValue?: number;
  placeholder: string;
}

export interface TextareaQuestion extends BaseQuestion {
  type: QuestionType.Textarea;
  placeholder: string;
  rows: number;
}

export interface DropdownQuestion extends BaseQuestion {
  type: QuestionType.Dropdown;
  options: string[];
  multiple: boolean;
}

export interface FileUploadQuestion extends BaseQuestion {
  type: QuestionType.FileUpload;
  acceptedFileTypes: string[];
  maxSizeMB: number;
}

export type Question = MultipleChoiceQuestion | SingleChoiceQuestion | TextQuestion | RatingQuestion | CheckboxQuestion | DateQuestion | NumberQuestion | TextareaQuestion | DropdownQuestion | FileUploadQuestion;

export interface Survey {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
  status: 'Draft' | 'Published' | 'Archived';
  version: number;
  questions: Question[];
}
