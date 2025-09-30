/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import React from 'react';
import DeanDashboard from '../pages/DeanDashboard';
import { DataContext } from '../data/DataContext';
import { BrowserRouter } from 'react-router-dom';
import { Application, User } from '../data/types';

// Create a minimal mock context value
function buildMock(apps: Application[]) {
  const noop = () => {};
  return {
    currentUser: { id: 'dean1', name: 'Dean Donna', role: 'Dean' as const } as User,
    users: [],
    applications: apps,
    loginAs: noop as any,
    logout: noop as any,
    submitApplication: noop as any,
    addComment: (_id: string, _msg: string) => {},
    setCommitteeAssessment: noop as any,
    setDeanRecommendation: (id: string, rec: any) => {
      const target = apps.find(a => a.id === id);
      if (target) {
        // @ts-ignore mutate for test
        target.deanRecommendation = rec;
        target.status = 'Principal Review';
      }
    },
    setFinalDecision: noop as any,
    updateApplicationStatus: noop as any,
    addUser: noop as any,
    updateUser: noop as any,
    deleteUser: noop as any
  } as any;
}

const baseApp: Application = {
  id: 'app-1',
  applicantName: 'Alice Applicant',
  title: 'Quantum Research',
  applicationType: 'Publication Incentive',
  publicationType: 'Journal',
  journalOrConference: 'Nature',
  quartile: 'Q1',
  impactFactor: '10',
  indexingType: 'Journal',
  publisher: 'Nature Pub',
  conferencePlaceDate: '',
  registrationFee: '',
  createdAt: new Date().toISOString(),
  status: 'Dean Review',
  comments: [
    { id: 'c1', role: 'Committee', userId: 'committee1', message: 'Looks solid', createdAt: new Date().toISOString() }
  ],
  committeeAssessments: [
    { committeeUserId: 'committee1', decision: 'Approved', decidedAt: new Date().toISOString() },
    { committeeUserId: 'committee2', decision: 'Approved', decidedAt: new Date().toISOString() },
    { committeeUserId: 'committee3', decision: 'Approved', decidedAt: new Date().toISOString() }
  ]
};

describe('DeanDashboard', () => {
  test('renders Dean Review heading and forwards application', () => {
    const apps = [JSON.parse(JSON.stringify(baseApp)) as Application];
    const mock = buildMock(apps);

    render(
      <BrowserRouter>
        <DataContext.Provider value={mock}>
          <DeanDashboard />
        </DataContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /Dean Review/i })).toBeInTheDocument();

  const numberInputs = screen.getAllByRole('spinbutton'); // numeric inputs
  expect(numberInputs.length).toBeGreaterThan(0);
  fireEvent.change(numberInputs[0], { target: { value: '60000' } });
  expect((numberInputs[0] as HTMLInputElement).value).toBe('60000');

    const forwardButton = screen.getByRole('button', { name: /Forward to Principal/i });
    fireEvent.click(forwardButton);

    expect(apps[0].status).toBe('Principal Review');
    expect(apps[0].deanRecommendation).toBeTruthy();
  });
});
