export interface Validation {
    required?: boolean; // Indicates if the field is required
    minLength?: number; // Minimum length for text input fields
    maxLength?: number; // Maximum length for text input fields
    minValue?: number; // Minimum value for number input fields
    maxValue?: number; // Maximum value for number input fields
    pattern?: string; // Regex pattern for text input fields
    minDate?: string; // Minimum date for date input fields in YYYY-MM-DD format
    maxDate?: string; // Maximum date for date input fields in YYYY-MM-DD format
    acceptedFileTypes?: string[]; // Accepted file types for file upload input fields
    maxSizeMB?: number; // Maximum file size in megabytes for file upload input fields
}

export interface ConditionalLogic {
    questionId: string; // ID of the question that triggers the logic
    value: any; // Value that triggers the logic
    action: 'show' | 'hide'; // Action to perform (show or hide the question)
}
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

/**
 * Base interface for all question types.
 */
export interface BaseQuestion {
    id: string; // Unique identifier for the question
    type: QuestionType; // Type of the question
    text: string; // Text of the question
    required: boolean; // Indicates if the question is mandatory
    order: number; // Order of the question in the survey
    section?: string; // Optional section to group questions
    helpText?: string; // Optional help text for the question
    validation?: Validation; // Optional validation rules for the question
    logic?: ConditionalLogic[]; // Optional conditional logic to show/hide the question based on answers to other questions
}

/**
 * Multiple choice question interface.
 */
export interface MultipleChoiceQuestion extends BaseQuestion {
    type: QuestionType.MultipleChoice;
    options: string[]; // List of options for the question
}

/**
 * Single choice question interface.
 */
export interface SingleChoiceQuestion extends BaseQuestion {
    type: QuestionType.SingleChoice;
    options: string[]; // List of options for the question
}

/**
 * Text question interface.
 */
export interface TextQuestion extends BaseQuestion {
    type: QuestionType.Text;
    placeholder: string; // Placeholder text for the input field
}

/**
 * Rating question interface.
 */
export interface RatingQuestion extends BaseQuestion {
    type: QuestionType.Rating;
    scale: number; // Scale of the rating (e.g., 1 to 5)
}

/**
 * Checkbox question interface.
 */
export interface CheckboxQuestion extends BaseQuestion {
    type: QuestionType.Checkbox;
    checked: boolean; // Indicates if the checkbox is checked or not
}

/**
 * Date question interface.
 */
export interface DateQuestion extends BaseQuestion {
    type: QuestionType.Date;
    minDate?: string; // Optional minimum date in YYYY-MM-DD format
    maxDate?: string; // Optional maximum date in YYYY-MM-DD format
}

/**
 * Number question interface.
 */
export interface NumberQuestion extends BaseQuestion {
    type: QuestionType.Number;
    minValue?: number; // Optional minimum value
    maxValue?: number; // Optional maximum value
    placeholder: string; // Placeholder text for the input field
}

/**
 * Textarea question interface.
 */
export interface TextareaQuestion extends BaseQuestion {
    type: QuestionType.Textarea;
    placeholder: string; // Placeholder text for the textarea
    rows: number; // Number of rows in the textarea
}

/**
 * Dropdown question interface.
 */
export interface DropdownQuestion extends BaseQuestion {
    type: QuestionType.Dropdown;
    options: string[]; // List of options for the dropdown
    multiple: boolean; // Indicates if multiple selection is allowed
}

/**
 * File upload question interface.
 */
export interface FileUploadQuestion extends BaseQuestion {
    type: QuestionType.FileUpload;
    acceptedFileTypes: string[]; // List of accepted file types (e.g., ['image/png', 'application/pdf'])
    maxSizeMB: number; // Maximum file size in megabytes
}

/**
 * Type alias for all question types.
 */
export type Question = MultipleChoiceQuestion | SingleChoiceQuestion | TextQuestion | RatingQuestion | CheckboxQuestion | DateQuestion | NumberQuestion | TextareaQuestion | DropdownQuestion | FileUploadQuestion;

/**
 * Interface for the survey structure.
 */
export interface Survey {
    id: string; // Unique identifier for the survey
    title: string; // Title of the survey
    description: string; // Description of the survey
    createdBy: string; // User who created the survey
    createdDate: string; // Date when the survey was created
    modifiedBy: string; // User who last modified the survey
    modifiedDate: string; // Date when the survey was last modified
    status: 'Draft' | 'Published' | 'Archived'; // Status of the survey
    version: number; // Version number of the survey
    questions: Question[]; // List of questions in the survey
}

/**
 * Interface for the response structure.
 */
export interface Response {
    surveyId: string; // ID of the survey
    respondentId: string; // ID of the respondent
    responseTime: string; // Timestamp of the response submission
    answers: Answer[]; // List of answers provided by the respondent
}

/**
 * Interface for an answer to a question.
 */
export interface Answer {
    questionId: string; // ID of the question
    value: any; // Value of the answer (can be string, number, boolean, array, etc.)
}
