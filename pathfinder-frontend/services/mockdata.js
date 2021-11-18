'use strict';

const courseA = {
  code: 'ECE444',
  name: 'Intro to Software Engineering',
  description:
    'Successful software projects require more than just technical expertise. Figuring out what the client ' +
    'wants, collaborating in a team, managing complexity, mitigating risks, staying on time and budget, and ' +
    'determining under various constraints when a product is good enough to be shipped are at least equally ' +
    'important topics that often have a significant human component. ECE444 explores these issues broadly ' +
    'covering the fundamentals of modern software engineering',
  courseLevel: 4,
  department: 'Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.',
  division: 'Faculty of Applied Science and Engineering',
};

const courseB = {
  code: 'CSCD01H3',
  name: 'Engineering Large Software Systems',
  description:
    'Successful software projects require more than just technical expertise. Figuring out what the client ' +
    'wants, collaborating in a team, managing complexity, mitigating risks, staying on time and budget, and ' +
    'determining under various constraints when a product is good enough to be shipped are at least equally ' +
    'important topics that often have a significant human component. ECE444 explores these issues broadly ' +
    'covering the fundamentals of modern software engineering',
  courseLevel: 4,
  department: 'Dept. of Computer & Mathematical Sci (UTSC)',
  division: 'University of Toronto Scarborough',
};

export const courses = [
  courseA,
  courseB,
  courseA,
  courseA,
  courseB,
  courseA,
  courseA,
  courseB,
  courseA,
  courseA,
  courseB,
  courseA,
];

export const user = {
  firstname: 'James',
  lastname: 'Bond',
  cart: [courseA, courseB, courseA, courseA, courseB, courseA, courseA, courseB, courseA],
};
