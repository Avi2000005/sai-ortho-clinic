/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FAQItem {
  q: string;
  a: string;
}

export interface Treatment {
  id: string;
  name: string;
  iconName: string; // Lucide icon mapping
  shortDescription: string;
  overview: string;
  symptoms: string[];
  causes: string[];
  diagnosis: string[];
  treatment: string[];
  recovery: string[];
  faqs: FAQItem[];
  image: string;
}

export interface Blog {
  id: string;
  title: string;
  author: string;
  category: "Spine" | "Robotics" | "Orthopedics" | "Lifestyle" | "Marathi" | "Joints" | "Sports";
  snippet: string;
  content: string; // Markdown or rich HTML supported text
  date: string;
  readingTime: string;
  isMarathi: boolean;
  image: string;
  isPatientStory?: boolean;
  youtubeId?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
  type: "Google Review" | "Patient Story" | "Success Story";
  condition?: string;
  fullBody?: string; // If there's an expansive case study / patient story
}

export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  treatmentType: string;
  message?: string;
  status: "Scheduled" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}
