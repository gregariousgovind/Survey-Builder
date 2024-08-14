import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Survey, QuestionType } from './models/survey.model';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

const productFeedbackSurvey: Survey = {
  "id": "cac38a71-02a6-4715-8bdf-bfcc60bb8a58",
  "version": 1,
  "createdBy": "Govind.Chauhan@gep.com",
  "createdDate": 1723212381899,
  "description": "Thank you for using our product! Please take a few minutes to give us your feedback to help us improve.",
  "modifiedBy": [
    "Govind.Chauhan@gep.com"
  ],
  "modifiedDate": 1723488010556,
  "questions": [
    {
      "id": "d746567e-4e8e-44f3-a1b7-b93a78757f1a",
      "type": QuestionType.SingleChoice,
      "text": "How often do you use our product?",
      "required": true,
      "order": 1,
      "helpText": "Select the option that best describes your usage frequency.",
      "validation": {
        "required": true
      },
      "options": [
        "Daily",
        "Weekly",
        "Monthly",
        "Rarely"
      ]
    },
    {
      "id": "4fcd1a5b-bbdf-4b29-a3f4-77d61d3a75fc",
      "type": QuestionType.MultipleChoice,
      "text": "Which features do you use the most? (Select all that apply)",
      "required": true,
      "order": 2,
      "helpText": "You can select multiple features.",
      "validation": {
        "minLength": 1
      },
      "options": [
        "Feature A",
        "Feature B",
        "Feature C",
        "Feature D"
      ]
    },
    {
      "id": "1b77db8c-e233-40ed-82fc-10881d9c4fb8",
      "type": QuestionType.Rating,
      "text": "How would you rate the overall quality of the product?",
      "required": true,
      "order": 3,
      "helpText": "1 being the lowest and 5 being the highest.",
      "validation": {
        "required": true
      },
      "scale": 5
    },
    {
      "id": "58f2b0a1-2a23-4df3-88d3-636fef80f5bc",
      "type": QuestionType.Text,
      "text": "What do you like the most about our product?",
      "required": false,
      "order": 4,
      "helpText": "Optional: Describe what you like the most about the product.",
      "validation": {
        "maxLength": 200
      },
      "placeholder": "Enter your favorite feature..."
    },
    {
      "id": "1f3b6c35-760a-4704-b7be-6367c365ab71",
      "type": QuestionType.Checkbox,
      "text": "Do you agree to receive promotional emails from us?",
      "required": false,
      "order": 5,
      "helpText": "Check the box if you agree.",
      "checked": false
    },
    {
      "id": "94d237d4-82e6-4570-b7f0-f3e13db5d6f7",
      "type": QuestionType.Date,
      "text": "When did you start using our product?",
      "required": true,
      "order": 6,
      "helpText": "Select the date you started using our product.",
      "validation": {
        "required": true,
        "minDate": 1723212381899,
        "maxDate": 1723212381899
      }
    },
    {
      "id": "47c003b8-22da-465d-9e10-993cf4c227f0",
      "type": QuestionType.Number,
      "text": "How many times have you used our customer support service?",
      "required": true,
      "order": 7,
      "helpText": "Enter the number of times you contacted customer support.",
      "validation": {
        "required": true,
        "minValue": 0,
        "maxValue": 100
      },
      "placeholder": "Enter a number",
      "minValue": 0,
      "maxValue": 100
    },
    {
      "id": "8c1f5b4e-90a0-49f8-87a5-d7c93f82660a",
      "type": QuestionType.Textarea,
      "text": "Please provide any additional comments or suggestions.",
      "required": false,
      "order": 8,
      "helpText": "Optional: Provide any additional feedback you may have.",
      "validation": {
        "maxLength": 500
      },
      "placeholder": "Enter your comments here...",
      "rows": 4
    },
    {
      "id": "c9e1e2cb-7f77-42d0-8e57-c42698d5dcb6",
      "type": QuestionType.Dropdown,
      "text": "Which country are you from?",
      "required": true,
      "order": 9,
      "helpText": "Select your country of residence.",
      "validation": {
        "required": true
      },
      "options": [
        "USA",
        "India",
        "Romania",
        "Canada",
        "UK",
        "Australia",
        "Other"
      ],
      "multiple": false
    },
    {
      "id": "ad9e0a8a-6761-4c47-9b9a-95798cb209b6",
      "type": QuestionType.Dropdown,
      "text": "Which devices do you use our product on?",
      "required": true,
      "order": 10,
      "helpText": "You can select multiple devices.",
      "validation": {
        "required": true,
        "minLength": 1
      },
      "options": [
        "Desktop",
        "Laptop",
        "Tablet",
        "Smartphone"
      ],
      "multiple": true
    },
    {
      "id": "88e156d7-1a19-43e5-a0bb-b6c0e8f49898",
      "type": QuestionType.FileUpload,
      "text": "Upload a screenshot of an issue you faced (optional)",
      "required": false,
      "order": 11,
      "helpText": "Upload a file up to 10MB in size.",
      "validation": {
        "acceptedFileTypes": [
          "image/png",
          "image/jpeg"
        ],
        "maxSizeMB": 10
      },
      "acceptedFileTypes": [
        "image/png",
        "image/jpeg"
      ],
      "maxSizeMB": 10
    }
  ],
  "status": "Published",
  "title": "GEP QUANTUM Feedback Survey"
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class App implements OnInit {
  @Input() survey: any = productFeedbackSurvey;
  surveyForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.surveyForm = this.fb.group({
      questions: this.createQuestionsFormArray()
    });
  }

  createQuestionsFormArray(): FormArray {
    const formGroups = this.survey.questions.map((question: any) => this.createQuestionFormGroup(question));
    return this.fb.array(formGroups);
  }

  createQuestionFormGroup(question: any): FormGroup {
    const formGroup = this.fb.group({
      id: [question.id],
      value: [null, this.getValidators(question)]
    });

    return formGroup;
  }

  getValidators(question: any): Validators[] {
    const validators = [];
    if (question.validation?.required) {
      validators.push(Validators.required);
    }
    if (question.validation?.minLength) {
      validators.push(Validators.minLength(question.validation.minLength));
    }
    if (question.validation?.maxLength) {
      validators.push(Validators.maxLength(question.validation.maxLength));
    }
    if (question.validation?.minValue) {
      validators.push(Validators.min(question.validation.minValue));
    }
    if (question.validation?.maxValue) {
      validators.push(Validators.max(question.validation.maxValue));
    }
    return validators;
  }

  getFormGroup(index: number): FormGroup {
    return (this.surveyForm.get('questions') as FormArray).at(index) as FormGroup;
  }

  onFileChange(event: any, index: any) {
    const file = event.target.files[0];
    this.getFormGroup(index).patchValue({ value: file });
  }

  submit() {
    const response = this.surveyForm.value.questions.map((question: any) => ({
      id: question.id,
      answer: question.value
    }));
    console.log(JSON.stringify(response, null, 2));
  }
}

bootstrapApplication(App);
