import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Application, Role, User, ApplicationComment } from './types';
import { CommitteeAssessment } from './types';
import { v4 as uuid } from 'uuid';

interface DataContextValue {
  users: User[];
  applications: Application[];
  currentUser: User | null;
  loginAs: (role: Role, name?: string) => void;
  logout: () => void;
  submitApplication: (data: Partial<Application>) => void;
  updateApplicationStatus: (id: string, status: Application['status']) => void;
  addComment: (appId: string, message: string) => void;
  setCommitteeAssessment: (appId: string, data: Partial<CommitteeAssessment>) => void;
  setDeanRecommendation: (id: string, rec: Application['deanRecommendation']) => void;
  setFinalDecision: (id: string, decision: 'Approved' | 'Rejected') => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

export const DataContext = createContext<DataContextValue | undefined>(undefined);

const initialUsers: User[] = [
  { id: 'u1', name: 'Alice Applicant', role: 'Applicant' },
  { id: 'u2', name: 'Carl Committee', role: 'Committee' },
  { id: 'u6', name: 'Cara Committee', role: 'Committee' },
  { id: 'u7', name: 'Cody Committee', role: 'Committee' },
  { id: 'u3', name: 'Dana Dean', role: 'Dean' },
  { id: 'u4', name: 'Paul Principal', role: 'Principal' },
  { id: 'u5', name: 'Adam Admin', role: 'Admin' }
];

const initialApplications: Application[] = [
  {
    id: 'a1',
    applicantName: 'Alice Applicant',
    title: 'Deep Learning for Climate Modeling',
    applicationType: 'Publication Incentive',
    publicationType: 'Journal',
    journalOrConference: 'Nature Climate Change',
    quartile: 'Q1',
    impactFactor: '14.5',
    indexingType: 'Journal',
    publisher: 'Nature Publishing',
    conferencePlaceDate: '',
    registrationFee: '',
    createdAt: new Date().toISOString(),
    status: 'Committee Review',
    comments: [
      { id: uuid(), role: 'Committee', userId: 'u2', message: 'Looks promising. Need dean input.', createdAt: new Date().toISOString() }
    ],
    committeeAssessments: [
      { committeeUserId: 'u2', decision: 'Approved', decidedAt: new Date().toISOString() },
    ]
  },
  // Seeded example already progressed to Dean Review so Dean can see UI immediately
  {
    id: 'a2',
    applicantName: 'Alice Applicant',
    title: 'AI-Assisted Conference Participation Study',
    applicationType: 'Publication Incentive',
    publicationType: 'Journal',
    journalOrConference: 'IEEE AI & Data',
    quartile: 'Q2',
    impactFactor: '4.2',
    indexingType: 'Conference',
    publisher: 'IEEE',
    conferencePlaceDate: 'Berlin, Oct 2025',
    registrationFee: '450',
    createdAt: new Date().toISOString(),
    status: 'Dean Review',
    comments: [
      { id: uuid(), role: 'Committee', userId: 'u2', message: 'Meets criteria for incentive.', createdAt: new Date().toISOString() },
      { id: uuid(), role: 'Committee', userId: 'u6', message: 'Conference registration justified.', createdAt: new Date().toISOString() }
    ],
    committeeAssessments: [
      { committeeUserId: 'u2', decision: 'Approved', decidedAt: new Date().toISOString(), publicationIncentiveApplicable: true, conferenceRegistrationChargeApplicable: true },
      { committeeUserId: 'u6', decision: 'Approved', decidedAt: new Date().toISOString(), publicationIncentiveApplicable: true, conferenceRegistrationChargeApplicable: true },
      { committeeUserId: 'u7', decision: 'Approved', decidedAt: new Date().toISOString(), publicationIncentiveApplicable: true, conferenceRegistrationChargeApplicable: true }
    ]
  }
];

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const loginAs = (role: Role, name?: string) => {
    // Simple: choose first existing user of role or create temp
    let user = users.find(u => u.role === role);
    if (!user) {
      user = { id: uuid(), name: name || role + ' User', role };
      setUsers(prev => [...prev, user!]);
    }
    setCurrentUser(user);
  };

  const logout = () => setCurrentUser(null);

  const submitApplication = (data: Partial<Application>) => {
    if (!currentUser) return;
    const app: Application = {
      id: uuid(),
      applicantName: currentUser.name,
      title: data.title || '',
      applicationType: data.applicationType || '',
      publicationType: data.publicationType || '',
      journalOrConference: data.journalOrConference || '',
      quartile: data.quartile || '',
      impactFactor: data.impactFactor || '',
      indexingType: data.indexingType || '',
      publisher: data.publisher || '',
      conferencePlaceDate: data.conferencePlaceDate || '',
      registrationFee: data.registrationFee || '',
      createdAt: new Date().toISOString(),
      status: 'Pending',
      comments: []
    };
    setApplications(prev => [app, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const addComment = (appId: string, message: string) => {
    if (!currentUser) return;
    const comment: ApplicationComment = { id: uuid(), role: currentUser.role, userId: currentUser.id, message, createdAt: new Date().toISOString() };
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, comments: [...a.comments, comment] } : a));
  };

  // keep ref of users for committee membership count inside state closures
  const usersRef = React.useRef(users);
  React.useEffect(()=>{ usersRef.current = users; }, [users]);

  const setCommitteeAssessment = (appId: string, data: Partial<CommitteeAssessment>) => {
    setApplications(prev => prev.map(a => {
      if (a.id !== appId) return a;
      const existing = a.committeeAssessments || [];
      if (!data.committeeUserId) return a; // must identify reviewer
      const idx = existing.findIndex(c => c.committeeUserId === data.committeeUserId);
      let updated: CommitteeAssessment[];
      if (idx >= 0) {
        updated = [...existing];
        updated[idx] = { ...updated[idx], ...data } as CommitteeAssessment;
      } else {
        updated = [...existing, { ...data } as CommitteeAssessment];
      }
      // compute status progression
      const committeeMembers = usersRef.current.filter(u => u.role === 'Committee');
      const decisions = updated.map(u => u.decision).filter(Boolean) as ('Approved' | 'Denied')[];
      let status: Application['status'] = 'Committee Review';
      if (decisions.includes('Denied')) status = 'Denied';
      else if (decisions.length === committeeMembers.length && decisions.every(d => d === 'Approved')) status = 'Dean Review';
      return { ...a, committeeAssessments: updated, status };
    }));
  };

  const setDeanRecommendation = (id: string, rec: Application['deanRecommendation']) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, deanRecommendation: rec, status: 'Principal Review' } : a));
  };

  const setFinalDecision = (id: string, decision: 'Approved' | 'Rejected') => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, finalDecision: decision, status: decision === 'Approved' ? 'Approved' : 'Denied' } : a));
  };

  // User CRUD
  const addUser = (user: Omit<User, 'id'>) => setUsers(prev => [...prev, { ...user, id: uuid() }]);
  const updateUser = (id: string, user: Partial<User>) => setUsers(prev => prev.map(u => u.id === id ? { ...u, ...user } : u));
  const deleteUser = (id: string) => setUsers(prev => prev.filter(u => u.id !== id));

  return (
    <DataContext.Provider value={{ users, applications, currentUser, loginAs, logout, submitApplication, updateApplicationStatus, addComment, setCommitteeAssessment, setDeanRecommendation, setFinalDecision, addUser, updateUser, deleteUser }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};
