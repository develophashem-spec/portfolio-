import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
    standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class App {

  title = signal('Ali Hachem');

  navLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  featuredProjects = [
    {
      title: 'Personal Profile',
      description: 'A responsive profile page with a concise introduction, selected skills, and useful links.',
      stack: ['HTML', 'CSS'],
      kind: 'Profile page',
      demoUrl: 'projects/personal-profile/',
      preview: 'profile',
    },
    {
      title: 'Course Registration',
      description: 'An accessible course form with grouped fields, native validation, and a local confirmation.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      kind: 'Form interaction',
      demoUrl: 'projects/course-registration/',
      preview: 'registration',
    },
    {
      title: 'Smartwatch Showcase',
      description: 'A fictional product concept with a CSS-built watch illustration and interactive color selection.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      kind: 'Product concept',
      demoUrl: 'projects/smartwatch-showcase/',
      preview: 'watch',
    },
    {
      title: 'Feedback Portal',
      description: 'A client-side inbox that safely displays feedback submitted during the current browser session.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      kind: 'Interactive portal',
      demoUrl: 'projects/feedback-portal/',
      preview: 'feedback',
    },
    {
      title: 'Coffee Shop Menu',
      description: 'A fictional café concept with a clear sample menu, seasonal feature, and opening hours.',
      stack: ['HTML', 'CSS'],
      kind: 'Hospitality concept',
      demoUrl: 'projects/coffee-shop/',
      preview: 'coffee',
    },
    {
      title: 'Web Design Schedule',
      description: 'An illustrative eight-week course outline with accessible, responsive schedule tables.',
      stack: ['HTML', 'CSS'],
      kind: 'Content layout',
      demoUrl: 'projects/web-design-schedule/',
      preview: 'schedule'
    }
  ];

  experience = [
    {
      company: 'Vanguard Services',
      role: 'Business Development Representative',
      summary: 'Customer and prospect calls and lead generation with LinkedIn Sales Navigator and SignalHire, plus email campaigns in Mailchimp and Klaviyo.'
    },
    {
      company: 'Rocket Delivery',
      role: 'ERP & CRM Database Management',
      summary: 'Managed the ERP and CRM database and built Power BI reports from it.'
    },
    {
      company: 'Salem Group',
      role: 'Client Proposals',
      summary: 'Combined data from several sources into full client proposals covering scope, tools, and budget.'
    },
    {
      company: 'WCA Global',
      role: 'Email Marketing',
      summary: 'Worked in Mailchimp and Klaviyo.'
    }
  ];

}