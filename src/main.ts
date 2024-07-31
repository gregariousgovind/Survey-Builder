import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Survey, QuestionType, Question, Validation } from './models/survey.model';

import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class App implements OnInit {
  surveyForm: FormGroup;
  survey: Survey = {
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

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      responses: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  get responses(): FormArray {
    return this.surveyForm.get('responses') as FormArray;
  }

  private initForm(): void {
    this.survey.questions.forEach(question => {
      this.responses.push(this.createQuestionFormGroup(question));
    });
  }

  private createQuestionFormGroup(question: Question): FormGroup {
    const formGroup = this.fb.group({
      id: [question.id],
      type: [question.type],
      text: [question.text],
      response: [this.getInitialValue(question), this.getValidators(question)]
    });
    return formGroup;
  }

  private getInitialValue(question: Question): any {
    if (question.type === QuestionType.Checkbox) {
      return question.checked || false;
    }
    return '';
  }

  private getValidators(question: Question): any[] {
    const validators: any[] = [];
    if (question.validation) {
      if (question.validation.required) {
        validators.push(Validators.required);
      }
      if (question.validation.minLength) {
        validators.push(Validators.minLength(question.validation.minLength));
      }
      if (question.validation.maxLength) {
        validators.push(Validators.maxLength(question.validation.maxLength));
      }
      if (question.validation.minValue !== undefined) {
        validators.push(Validators.min(question.validation.minValue));
      }
      if (question.validation.maxValue !== undefined) {
        validators.push(Validators.max(question.validation.maxValue));
      }
      if (question.validation.pattern) {
        validators.push(Validators.pattern(question.validation.pattern));
      }
    }
    return validators;
  }

  onSubmit(): void {
    if (this.surveyForm.valid) {
      console.log('Survey submitted:', this.surveyForm.value);
    } else {
      console.log('Survey form is invalid');
    }
  }

  setRating(index: number, rating: number): void {
    const responseControl = this.responses.at(index).get('response');
    responseControl?.setValue(rating);
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    const question = this.survey.questions[index];
    if (file) {
      if (question.validation?.maxSizeMB && file.size / 1024 / 1024 > question.validation.maxSizeMB) {
        const responseControl = this.responses.at(index).get('response');
        responseControl?.setErrors({ maxSize: true });
      } else if (question.validation?.acceptedFileTypes && !question.validation.acceptedFileTypes.includes(file.type)) {
        const responseControl = this.responses.at(index).get('response');
        responseControl?.setErrors({ acceptedFileTypes: true });
      } else {
        const responseControl = this.responses.at(index).get('response');
        responseControl?.setValue(file);
      }
    }
  }

  onCheckboxChange(event: any, index: number, option: string): void {
    const responseControl = this.responses.at(index).get('response');
    let currentValue = responseControl?.value || [];
    if (event.target.checked) {
      currentValue.push(option);
    } else {
      currentValue = currentValue.filter((item: string) => item !== option);
    }
    responseControl?.setValue(currentValue);
  }
}

bootstrapApplication(App);
