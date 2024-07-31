import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { Survey, QuestionType, Question, Validation, MultipleChoiceQuestion, SingleChoiceQuestion, TextQuestion, RatingQuestion, CheckboxQuestion, DateQuestion, NumberQuestion, TextareaQuestion, DropdownQuestion, FileUploadQuestion } from './models/survey.model';

import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { CommonModule } from '@angular/common';

const productFeedbackSurvey: Survey = {
  id: 'survey2024',
  title: 'XYZ Company Product Feedback Survey',
  description: 'Thank you for using our product! Please take a few minutes to give us your feedback to help us improve.',
  createdBy: 'admin_user',
  createdDate: '2024-08-01',
  modifiedBy: 'editor_user',
  modifiedDate: '2024-08-01',
  status: 'Draft',
  version: 1,
  questions: [
    {
      id: 'q1',
      type: QuestionType.SingleChoice,
      text: 'How often do you use our product?',
      required: true,
      order: 1,
      options: ['Daily', 'Weekly', 'Monthly', 'Rarely'],
      helpText: 'Select the option that best describes your usage frequency.',
      validation: { required: true }
    },
    {
      id: 'q2',
      type: QuestionType.MultipleChoice,
      text: 'Which features do you use the most? (Select all that apply)',
      required: true,
      order: 2,
      options: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
      helpText: 'You can select multiple features.',
      validation: { minLength: 1 }
    },
    {
      id: 'q3',
      type: QuestionType.Rating,
      text: 'How would you rate the overall quality of the product?',
      required: true,
      order: 3,
      scale: 5,
      helpText: '1 being the lowest and 5 being the highest.',
      validation: { required: true }
    },
    {
      id: 'q4',
      type: QuestionType.Text,
      text: 'What do you like the most about our product?',
      required: false,
      order: 4,
      placeholder: 'Enter your favorite feature...',
      helpText: 'Optional: Describe what you like the most about the product.',
      validation: { maxLength: 200 }
    },
    {
      id: 'q5',
      type: QuestionType.Checkbox,
      text: 'Do you agree to receive promotional emails from us?',
      required: false,
      order: 5,
      checked: false,
      helpText: 'Check the box if you agree.'
    },
    {
      id: 'q6',
      type: QuestionType.Date,
      text: 'When did you start using our product?',
      required: true,
      order: 6,
      minDate: '2020-01-01',
      maxDate: '2024-08-01',
      helpText: 'Select the date you started using our product.',
      validation: { required: true, minDate: '2020-01-01', maxDate: '2024-08-01' }
    },
    {
      id: 'q7',
      type: QuestionType.Number,
      text: 'How many times have you used our customer support service?',
      required: true,
      order: 7,
      minValue: 0,
      maxValue: 100,
      placeholder: 'Enter a number',
      helpText: 'Enter the number of times you contacted customer support.',
      validation: { minValue: 0, maxValue: 100 }
    },
    {
      id: 'q8',
      type: QuestionType.Textarea,
      text: 'Please provide any additional comments or suggestions.',
      required: false,
      order: 8,
      placeholder: 'Enter your comments here...',
      rows: 4,
      helpText: 'Optional: Provide any additional feedback you may have.',
      validation: { maxLength: 500 }
    },
    {
      id: 'q9',
      type: QuestionType.Dropdown,
      text: 'Which country are you from?',
      required: true,
      order: 9,
      options: ['USA', 'Canada', 'UK', 'Australia', 'Other'],
      multiple: false,
      helpText: 'Select your country of residence.',
      validation: { required: true }
    },
    {
      id: 'q10',
      type: QuestionType.Dropdown,
      text: 'Which devices do you use our product on?',
      required: true,
      order: 10,
      options: ['Desktop', 'Laptop', 'Tablet', 'Smartphone'],
      multiple: true,
      helpText: 'You can select multiple devices.',
      validation: { required: true, minLength: 1 }
    },
    {
      id: 'q11',
      type: QuestionType.FileUpload,
      text: 'Upload a screenshot of an issue you faced (optional)',
      required: false,
      order: 11,
      acceptedFileTypes: ['image/png', 'image/jpeg'],
      maxSizeMB: 10,
      helpText: 'Upload a file up to 10MB in size.',
      validation: { acceptedFileTypes: ['image/png', 'image/jpeg'], maxSizeMB: 10 }
    }
  ]
};

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class App implements OnInit {
  surveyForm!: FormGroup; // Ensure surveyForm is initialized
  surveyData: Survey = productFeedbackSurvey;
  QuestionType = QuestionType; // Expose the enum to the template

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.surveyForm = this.fb.group({
      questions: this.fb.array(this.surveyData.questions.map(question => this.createQuestionControl(question)))
    });
  }

  createQuestionControl(question: Question): FormGroup {
    const control = this.fb.control('', this.getValidators(question.validation || {}));

    if (question.type === QuestionType.Checkbox) {
      return this.fb.group({
        [question.id]: [question.checked, this.getValidators(question.validation || {})]
      });
    } else if (question.type === QuestionType.MultipleChoice || (question.type === QuestionType.Dropdown && (question as DropdownQuestion).multiple)) {
      return this.fb.group({
        [question.id]: this.fb.array([], this.getValidators(question.validation || {}))
      });
    } else {
      return this.fb.group({
        [question.id]: control
      });
    }
  }

  getValidators(validation: Validation): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (validation) {
      if (validation.required) {
        validators.push(Validators.required);
      }
      if (validation.minLength !== undefined) {
        validators.push(Validators.minLength(validation.minLength));
      }
      if (validation.maxLength !== undefined) {
        validators.push(Validators.maxLength(validation.maxLength));
      }
      if (validation.minValue !== undefined) {
        validators.push(Validators.min(validation.minValue));
      }
      if (validation.maxValue !== undefined) {
        validators.push(Validators.max(validation.maxValue));
      }
      if (validation.pattern) {
        validators.push(Validators.pattern(validation.pattern));
      }
    }
    return validators;
  }

  onSubmit() {
    if (this.surveyForm.valid) {
      console.log(this.surveyForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

  isMultipleChoice(question: Question): question is MultipleChoiceQuestion {
    return question.type === QuestionType.MultipleChoice;
  }

  isSingleChoice(question: Question): question is SingleChoiceQuestion {
    return question.type === QuestionType.SingleChoice;
  }

  isTextQuestion(question: Question): question is TextQuestion {
    return question.type === QuestionType.Text;
  }

  isRatingQuestion(question: Question): question is RatingQuestion {
    return question.type === QuestionType.Rating;
  }

  isCheckboxQuestion(question: Question): question is CheckboxQuestion {
    return question.type === QuestionType.Checkbox;
  }

  isDateQuestion(question: Question): question is DateQuestion {
    return question.type === QuestionType.Date;
  }

  isNumberQuestion(question: Question): question is NumberQuestion {
    return question.type === QuestionType.Number;
  }

  isTextareaQuestion(question: Question): question is TextareaQuestion {
    return question.type === QuestionType.Textarea;
  }

  isDropdownQuestion(question: Question): question is DropdownQuestion {
    return question.type === QuestionType.Dropdown;
  }

  isFileUploadQuestion(question: Question): question is FileUploadQuestion {
    return question.type === QuestionType.FileUpload;
  }
}

bootstrapApplication(App);
