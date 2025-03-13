import mongoose from "mongoose";

import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 100
  },
  birthday: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 100
  },
  address: {
    type: String,
    required: true,
    maxLength: 200
  },
  hireDate: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true,
    maxLength: 100
  },
  telephone: {
    type: String,
    required: true,
    maxLength: 20
  },
  dui: {
    type: String,
    required: true,
    unique: true,
    maxLength: 8
  },
  isssNumber: {
    type: String,
    required: true,
    unique: true,
    maxLength: 20
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  strict: false
});


export default model("Employee", employeeSchema);