import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Award, CheckCircle, Lock, Play, Download, Upload, AlertCircle, Home,
  HelpCircle, Shield, Settings, Users, CreditCard, Clock, FileText, Check, X, ArrowRight, RefreshCw, LogOut, CheckSquare, Search, Eye, Filter, Trash, Plus, Tag, HelpCircle as FaqIcon, Mail, Target, Award as CertIcon, Star, ChevronDown, ChevronRight
} from 'lucide-react';

// --- MOCK DATABASE / DEFAULT STATES ---
const INITIAL_MODULES = [
  {
    id: 1,
    title: "Module 1: Foundations of Business Broking",
    lessons: [
      { id: "1-1", title: "Module 1- Introduction", duration: "12 mins", summary: "Overview of buy-side, sell-side, and transaction advisory roles.", videoUrl: "Module 1- Introduction.mp4" },
      { id: "1-2", title: "Module 1 - Lesson 1", duration: "18 mins", summary: "Understanding the boundary of professional certifications vs state licenses.", videoUrl: "Module 1 - Lesson 1.mp4" },
      { id: "1-3", title: "Module 1 - Lesson 2", duration: "15 mins", summary: "Step-by-step breakdown of the deal lifecycle from listing to close.", videoUrl: "Module 1 - Lesson 2.mp4" },
      { id: "1-4", title: "Module 1 - Lesson 3", duration: "14 mins", summary: "EBITDA, SDE, Net Working Capital, and deal multiples explained.", videoUrl: "Module 1 - Lesson 3.mp4" },
      { id: "1-5", title: "Module 1 - Lesson 4", duration: "20 mins", summary: "Fiduciary duties, confidentiality obligations, and conflict of interest rules.", videoUrl: "Module 1 - Lesson 4.mp4" }
    ]
  },
  {
    id: 2,
    title: "Module 2: Business Valuation & Financial Analysis",
    lessons: [
      { id: "2-1", title: "Module 2 - Introduction", duration: "22 mins", summary: "Adjusting owner-operator add-backs to calculate Seller's Discretionary Earnings (SDE).", videoUrl: "Module 2 - Introduction.mp4" },
      { id: "2-2", title: "Module 2 - Lesson 5", duration: "25 mins", summary: "Applying industry-specific valuation multiples based on risk profile.", videoUrl: "Module 2 - Lesson 5.mp4" },
      { id: "2-3", title: "Module 2 - Lesson 6", duration: "19 mins", summary: "Balance-sheet driven valuations for asset-heavy and distressed businesses.", videoUrl: "Module 2 - Lesson 6.mp4" },
      { id: "2-4", title: "Module 2 - Lesson 7", duration: "21 mins", summary: "Using transaction databases and deal comps to benchmark asking prices.", videoUrl: "Module 2 - Lesson 7.mp4" }
    ]
  },
  {
    id: 3,
    title: "Module 3: Marketing a Business for Sale",
    lessons: [
      { id: "3-1", title: "Module 3 - Introduction", duration: "16 mins", summary: "Crafting compelling anonymous teasers that attract qualified buyer enquiries.", videoUrl: "Module 3 - Introduction.mp4" },
      { id: "3-2", title: "Module 3 - Lesson 9", duration: "28 mins", summary: "Full structure and content of a professional CIM package.", videoUrl: "Module 3 - Lesson 9.mp4" },
      { id: "3-3", title: "Module 3 - Lesson 10", duration: "17 mins", summary: "Strategic approaches to identify and approach financial and strategic buyers.", videoUrl: "Module 3 - Lesson 10.mp4" },
      { id: "3-4", title: "Module 3 - Lesson 11", duration: "14 mins", summary: "Using online marketplaces and proprietary buyer databases for deal exposure.", videoUrl: "Module 3 - Lesson 11.mp4" },
      { id: "3-5", title: "Module 3 - Lesson 12", duration: "20 mins", summary: "Screening buyers, enforcing NDAs, and releasing confidential information appropriately.", videoUrl: "Module 3 - Lesson 12.mp4" }
    ]
  },
  {
    id: 4,
    title: "Module 4: Buyer Qualification & Management",
    lessons: [
      { id: "4-1", title: "Module 4 - Introduction", duration: "15 mins", summary: "How private equity, family offices, and strategic acquirers differ in intent and approach.", videoUrl: "Module 4 - Introduction.mp4" },
      { id: "4-2", title: "Module 4 - Lesson 13", duration: "18 mins", summary: "Evaluating financial capacity, operational fit, and deal readiness.", videoUrl: "Module 4 - Lesson 13.mp4" },
      { id: "4-3", title: "Module 4 - Lesson 14", duration: "22 mins", summary: "How buyers finance acquisitions through banks, SBA-equivalents, and seller financing.", videoUrl: "Module 4 - Lesson 14.mp4" },
      { id: "4-4", title: "Module 4 - Lesson 15", duration: "17 mins", summary: "Facilitating seller-buyer meetings while maintaining confidentiality and control.", videoUrl: "Module 4 - Lesson 15.mp4" },
      { id: "4-5", title: "Module 4 - Lesson 16", duration: "24 mins", summary: "Key LOI components: price, structure, exclusivity, contingencies, and closing timelines.", videoUrl: "Module 4 - Lesson 16.mp4" }
    ]
  },
  {
    id: 5,
    title: "Module 5: Due Diligence Process",
    lessons: [
      { id: "5-1", title: "MODULE 5 - INTRODUCTION", duration: "16 mins", summary: "Organising a virtual data room with financial, legal, and operational documents.", videoUrl: "MODULE 5 - INTRODUCTION.mp4" },
      { id: "5-2", title: "Module 5 - Lesson 17", duration: "25 mins", summary: "Reviewing tax returns, P&L statements, accounts receivable, and EBITDA adjustments.", videoUrl: "Module 5 - Lesson 17.mp4" },
      { id: "5-3", title: "Module 5 - Lesson 18", duration: "18 mins", summary: "Staff contracts, vendor agreements, IP rights, and operational continuity checks.", videoUrl: "Module 5 - Lesson 18.mp4" },
      { id: "5-4", title: "Module 5 - Lesson 19", duration: "20 mins", summary: "Licences, litigation risk, regulatory compliance, and pending liabilities.", videoUrl: "Module 5 - Lesson 19.mp4" },
      { id: "5-5", title: "Module 5 - Lesson 20", duration: "15 mins", summary: "Keeping deals from falling apart when issues are discovered post-LOI.", videoUrl: "Module 5 - Lesson 20.mp4" }
    ]
  },
  {
    id: 6,
    title: "Module 6: Deal Structuring & Negotiation",
    lessons: [
      { id: "6-1", title: "Module 6 - Introduction", duration: "15 mins", summary: "Introduction to deal mechanisms, options, and purchase structure.", videoUrl: "Module 6 - Introduction.mp4" },
      { id: "6-2", title: "Module 6 - Lesson 21", duration: "22 mins", summary: "Choosing the right deal structure for seller tax efficiency and buyer protection.", videoUrl: "Module 6 - Lesson 21.mp4" },
      { id: "6-3", title: "Module 6 - Lesson 22", duration: "20 mins", summary: "Structuring performance-linked payments and bridging valuation gaps.", videoUrl: "Module 6 - Lesson 22.mp4" },
      { id: "6-4", title: "Module 6 - Lesson 23", duration: "18 mins", summary: "Principled negotiation, BATNA analysis, and closing concessions strategically.", videoUrl: "Module 6 - Lesson 23.mp4" },
      { id: "6-5", title: "Module 6 - Lesson 24", duration: "24 mins", summary: "Key legal protections for both parties in a business sale agreement.", videoUrl: "Module 6 - Lesson 24.mp4" },
      { id: "6-6", title: "Module 6 - Lesson 25", duration: "14 mins", summary: "Managing deal momentum and preventing buyers from backing out post-exclusivity.", videoUrl: "Module 6 - Lesson 25.mp4" },
      { id: "6-7", title: "Module 6- Lesson 26", duration: "21 mins", summary: "Understanding capital structures, leverage, and mezzanine debt options.", videoUrl: "Module 6- Lesson 26.mp4" },
      { id: "6-8", title: "Module 6 - Lesson 27", duration: "19 mins", summary: "How capitalization choices impact value creation and investment returns.", videoUrl: "Module 6 - Lesson 27.mp4" }
    ]
  },
  {
    id: 7,
    title: "Module 7: Closing the Transaction",
    lessons: [
      { id: "7-1", title: "Module 7 - Introduction", duration: "14 mins", summary: "Introduction to the closing phase, transaction checkpoints, and milestones.", videoUrl: "Module 7 - Introduction.mp4" },
      { id: "7-2", title: "Module 7 - Lesson 28", duration: "25 mins", summary: "Key clauses, conditions precedent, and closing mechanics in the SPA.", videoUrl: "Module 7 - Lesson 28.mp4" },
      { id: "7-3", title: "Module 7 - Lesson 29", duration: "15 mins", summary: "Coordinating a professional advisory team through the closing process.", videoUrl: "Module 7 - Lesson 29.mp4" },
      { id: "7-4", title: "Module 7 - Lesson 30", duration: "19 mins", summary: "Payment mechanics, escrow releases, and funds-flow waterfalls.", videoUrl: "Module 7 - Lesson 30.mp4" },
      { id: "7-5", title: "Module 7 - Lesson 31", duration: "17 mins", summary: "Staff, customer, and vendor communication during business ownership transfer.", videoUrl: "Module 7 - Lesson 31.mp4" },
      { id: "7-6", title: "Module 7 - Lesson 32", duration: "13 mins", summary: "Retention support, referral obligations, and relationship maintenance post-close.", videoUrl: "Module 7 - Lesson 32.mp4" },
      { id: "7-7", title: "Module 7 - Lesson 33", duration: "18 mins", summary: "Ensuring all legal declarations and required disclosures are completed properly.", videoUrl: "Module 7 - Lesson 33.mp4" },
      { id: "7-8", title: "Module 7 - Lesson 34", duration: "20 mins", summary: "Allocating success fees, managing holdbacks, and closing bank escrow accounts.", videoUrl: "Module 7 - Lesson 34.mp4" }
    ]
  },
  {
    id: 8,
    title: "Module 8: Client Management & Professional Practice",
    lessons: [
      { id: "8-1", title: "Module 8 - Introduction", duration: "13 mins", summary: "Overview of professional parameters, standards, and workflow strategies.", videoUrl: "Module 8 - Introduction.mp4" },
      { id: "8-2", title: "Module 8 - Lesson 35", duration: "16 mins", summary: "Drafting and presenting listing agreements, exclusivity, and commission structures.", videoUrl: "Module 8 - Lesson 35.mp4" },
      { id: "8-3", title: "Module 8 - Lesson 36", duration: "18 mins", summary: "Educating sellers on realistic valuations, timelines, and deal certainty.", videoUrl: "Module 8 - Lesson 36.mp4" },
      { id: "8-4", title: "Module 8 - Lesson 37", duration: "14 mins", summary: "Maintaining an organised deal pipeline using CRM tools and activity tracking.", videoUrl: "Module 8 - Lesson 37.mp4" },
      { id: "8-5", title: "Module 8 - Lesson 38", duration: "20 mins", summary: "Building referral relationships with accountants, lawyers, and wealth managers.", videoUrl: "Module 8 - Lesson 38.mp4" },
      { id: "8-6", title: "Module 8 - Lesson 39", duration: "17 mins", summary: "Maintaining records, compliance checklists, and YBB professional standards.", videoUrl: "Module 8 - Lesson 39.mp4" },
      { id: "8-7", title: "Module 8 - Lesson 40", duration: "19 mins", summary: "Positioning yourself as a transaction expert through content and events.", videoUrl: "Module 8 - Lesson 40.mp4" },
      { id: "8-8", title: "Module 8 - Lesson 41", duration: "22 mins", summary: "Navigating advisory pricing models, retaining deposits, and sharing commissions.", videoUrl: "Module 8 - Lesson 41.mp4" },
      { id: "8-9", title: "Module 8 - Lesson 42", duration: "15 mins", summary: "Protecting your brokerage firm against operational and client-side advisory risks.", videoUrl: "Module 8 - Lesson 42.mp4" }
    ]
  },
  {
    id: 9,
    title: "Module 9: Industry Sectors & Specialisation",
    lessons: [
      { id: "9-1", title: "Module 9 - Introduction", duration: "12 mins", summary: "Overview of industry specialization and transaction nuances across sectors.", videoUrl: "Module 9 - Introduction.mp4" },
      { id: "9-2", title: "Module 9 - Lesson 43", duration: "18 mins", summary: "Lease assignments, goodwill valuation, and inventory deals in retail and F&B.", videoUrl: "Module 9 - Lesson 43.mp4" },
      { id: "9-3", title: "Module 9 - Lesson 44", duration: "21 mins", summary: "Asset-heavy transactions, plant valuation, and environmental due diligence.", videoUrl: "Module 9 - Lesson 44.mp4" },
      { id: "9-4", title: "MODULE 9 - Lesson 45", duration: "19 mins", summary: "Recurring revenue models, client retention risk, and IP valuation in services/tech.", videoUrl: "MODULE 9 - Lesson 45.mp4" }
    ]
  },
  {
    id: 10,
    title: "Module 10: Certification Readiness & Capstone",
    lessons: [
      { id: "10-1", title: "Module 10 - Introduction", duration: "11 mins", summary: "Overview of requirements, practical benchmarks, and mock practice runs.", videoUrl: "Module 10 - Introduction.mp4" },
      { id: "10-2", title: "Module 10 - Lesson 46", duration: "14 mins", summary: "Exam structure, MCQ patterns, and time management strategies for the final assessment.", videoUrl: "Module 10 - Lesson 46.mp4" },
      { id: "10-3", title: "Module 10 - Lesson 47", duration: "30 mins", summary: "Full transaction walkthrough: valuation to SPA signing using a realistic case study.", videoUrl: "Module 10 - Lesson 47.mp4" },
      { id: "10-4", title: "Module 10 - Lesson 48", duration: "10 mins", summary: "How your unique ABB ID is generated, certificate issued, and verified by third parties.", videoUrl: "Module 10 - Lesson 48.mp4" },
      { id: "10-5", title: "Module 10 - Lesson 49", duration: "12 mins", summary: "Staying current with M&A trends, annual renewal, and YBB community membership.", videoUrl: "Module 10 - Lesson 49.mp4" }
    ]
  },
  {
    id: 11,
    title: "Module 11: Ethics & Professional Obligations",
    lessons: [
      { id: "11-1", title: "Module 11 - Introduction", duration: "10 mins", summary: "Overview of final ethics guidelines, compliance, and fiduciary obligations.", videoUrl: "Module 11 - Introduction.mp4" },
      { id: "11-2", title: "Module 11 - Lesson 50", duration: "16 mins", summary: "Final declaration, professional obligations, and ethical standards of an ABB holder.", videoUrl: "Module 11 - Lesson 50.mp4" }
    ]
  }
];const INITIAL_ASSIGNMENT_TASKS = [
  {
    id: 'as-1',
    num: 1,
    title: 'Module 2: Business Valuation Recast Case Study',
    desc: 'Produce a complete recasted P&L using SDE methodology for a fictitious retail business. Include add-back schedule and final valuation multiple.',
    ref: 'Module 2 — Lessons 2.1 to 2.5',
    dueNote: 'Complete by end of Module 3',
    fileHint: 'val_recast_yourname.xlsx',
  },
  {
    id: 'as-2',
    num: 2,
    title: 'Module 3: Blind Teaser & CIM Structure Exercise',
    desc: 'Draft a 2-page anonymous teaser and a 10-section CIM outline for a fictitious manufacturing business. Follow YBB templates.',
    ref: 'Module 3 — Lessons 3.1 to 3.2',
    dueNote: 'Complete by end of Module 5',
    fileHint: 'cim_teaser_yourname.pdf',
  },
  {
    id: 'as-3',
    num: 3,
    title: 'Module 5: Due Diligence Checklist & Data Room Setup',
    desc: 'Complete the YBB Due Diligence Checklist template for a provided scenario. Organize a mock data room folder structure with 15+ categories.',
    ref: 'Module 5 — Lessons 5.1 to 5.4',
    dueNote: 'Complete before Final Exam',
    fileHint: 'dd_checklist_yourname.xlsx',
  }
];

const INITIAL_RESOURCES = [
  { id: "res-1", title: "ABB Learner Workbook", description: "Comprehensive exercises and transaction worksheets.", version: "v1.2", date: "2026-07-15", downloadAllowed: true, level: "Course-wide", moduleId: null, downloadCount: 14 },
  { id: "res-2", title: "Recast Valuation Spreadsheet", description: "Excel template for recasting P&L statements.", version: "v2.0", date: "2026-07-18", downloadAllowed: true, level: "Module-level", moduleId: 2, downloadCount: 9 },
  { id: "res-3", title: "Standard NDA Template", description: "Legal Non-Disclosure Agreement draft.", version: "v1.0", date: "2026-05-10", downloadAllowed: true, level: "Lesson-level", lessonId: "1-5", downloadCount: 5 }
];

const INITIAL_QUESTIONS = [
  {
    id: 1,
    type: "MCQ", 
    question: "Which financial metric is most commonly adjusted (recast) by business brokers to calculate owner benefits in small-to-midsize businesses?",
    options: ["Gross Revenue", "Seller's Discretionary Earnings (SDE)", "Net Income after Taxes", "Earnings Per Share (EPS)"],
    correct: [1],
    difficulty: "Medium",
    topic: "Valuation"
  },
  {
    id: 2,
    type: "True-False",
    question: "The ABB Certification guarantees a legal right to practice as a licensed real estate broker in all Indian states without additional registration.",
    options: ["True", "False"],
    correct: [1],
    difficulty: "Easy",
    topic: "Compliance"
  },
  {
    id: 3,
    type: "Multi-Select",
    question: "Select all documents typically included in a business sale marketing package (Select all correct answers):",
    options: ["Blind Profile / Teaser", "Confidential Information Memorandum (CIM)", "Complete Audited Tax Returns of the Buyer", "Non-Disclosure Agreement (NDA)"],
    correct: [0, 1, 3],
    difficulty: "Hard",
    topic: "Marketing"
  }
];

const INITIAL_ORDERS = [
  { id: "ORD-9872", learnerName: "Rohan Kumar", amount: 17700, status: "Success", invoiceNo: "YBB-INV-2026-0042", date: "2026-07-20", type: "Paid Enrolment", discountCode: "None" },
  { id: "ORD-4109", learnerName: "Siddharth Sen", amount: 0, status: "Success", invoiceNo: "YBB-INV-2026-0015", date: "2026-07-18", type: "Complimentary", discountCode: "None" }
];

// --- ADMIN CREDENTIALS REGISTRY ---
const ADMIN_CREDENTIALS = [
  { email: 'superadmin@ybb.in',     password: 'SuperAdmin@2026!', role: 'SuperAdmin',    name: 'Arjun Mehta',     avatar: 'https://ui-avatars.com/api/?name=Arjun+Mehta&background=1e3a8a&color=fff&size=96' },
  { email: 'content@ybb.in',        password: 'Content@2026!',   role: 'ContentAdmin',   name: 'Priya Sharma',    avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=7c3aed&color=fff&size=96' },
  { email: 'support@ybb.in',        password: 'Support@2026!',   role: 'SupportAdmin',   name: 'Karan Patel',     avatar: 'https://ui-avatars.com/api/?name=Karan+Patel&background=0284c7&color=fff&size=96' },
];

// --- HISTORY API ROUTER ---
// Maps internal screen names → URL paths (clean, no hash)
const SCREEN_TO_PATH_MAP = {
  home:            '/',
  syllabus:        '/curriculum',
  faq:             '/faq',
  support:         '/contact',
  register:        '/register',
  forgot_password: '/forgot-password',
  checkout:        '/checkout',
  payment_result:  '/payment-result',
  dashboard:       '/dashboard',
  admin:           '/admin',
  verification:    '/verify',
};
const PATH_TO_SCREEN_MAP = Object.fromEntries(
  Object.entries(SCREEN_TO_PATH_MAP).map(([k, v]) => [v, k])
);

function pathToScreen() {
  return PATH_TO_SCREEN_MAP[window.location.pathname] ?? 'home';
}

function App() {
  // --- STATE SYSTEM ---
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('ybb_role') || "Visitor";
  });
  const [currentScreen, setCurrentScreen] = useState(pathToScreen); 
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [cohortFilter, setCohortFilter] = useState("All"); 

  // Coupon / Pricing state
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // System Configurations
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('ybb_settings');
    return saved ? JSON.parse(saved) : {
      price: 15000,
      gstRate: 18,
      automaticIssuance: false,
      sequentialMode: true,
      certIdFormat: "YBB-ABB-YYYY-NNNN",
      signatoryName: "Yoova Executive Director",
      legalVersion: "1.0",
      legalText: "Disclaimers: The Authorised Business Broker (ABB) Certificate is professional credentials issued by Yoova Business Broking. It is not a statutory or government license, nor does it guarantee transaction flow, employment, or specific income outcomes.",
      revealAnswers: false
    };
  });

  // User database simulation
  const [learners, setLearners] = useState(() => {
    const saved = localStorage.getItem('ybb_learners');
    return saved ? JSON.parse(saved) : [
      {
        id: "usr-201",
        fullName: "Rohan Kumar",
        mobile: "+91 9876543210",
        email: "rohan@example.com",
        city: "Bangalore",
        state: "Karnataka",
        profession: "Business Advisor",
        billingAddress: "42, Residency Road, Bangalore - 560025",
        gstNumber: "29AAAAA1111A1Z1",
        status: "Active",
        stage: "Enrolled", 
        completedLessons: ["1-1", "1-2"],
        attempts: 0,
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
      }
    ];
  });
  const activeLearner = learners[0]; 

  // Recover Account
  const [recoveryEmail, setRecoveryEmail] = useState("");

  // Databases
  const [modules, setModules] = useState(() => {
    const saved = localStorage.getItem('ybb_modules');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length < 11 || parsed[0]?.lessons[0]?.title !== "Module 1- Introduction") {
          return INITIAL_MODULES;
        }
        return parsed;
      } catch (e) {
        return INITIAL_MODULES;
      }
    }
    return INITIAL_MODULES;
  });
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('ybb_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });
  const [questionBank, setQuestionBank] = useState(() => {
    const saved = localStorage.getItem('ybb_questionBank');
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('ybb_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Active Lesson
  const [activeLessonId, setActiveLessonId] = useState("1-3");
  const [watchPercentage, setWatchPercentage] = useState(0);

  // Assignment submissions
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('ybb_assignments');
    return saved ? JSON.parse(saved) : [
      {
        id: "as-1",
        learnerName: "Rohan Kumar",
        title: "Module 2: Recast Valuation Case Study",
        fileName: "val_sheet_rohan.xlsx",
        submittedDate: "2026-07-19",
        status: "Under Review", 
        feedback: "Reviewer is checking your normalization spreadsheet details.",
        attempts: 1
      }
    ];
  });
  const [newAssignmentFile, setNewAssignmentFile] = useState("");
  const [uploadVals, setUploadVals] = useState({ 'as-1': '', 'as-2': '', 'as-3': '' });
  const [assignmentTasks, setAssignmentTasks] = useState(() => {
    const saved = localStorage.getItem('ybb_assignmentTasks');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENT_TASKS;
  });
  
  // Admin Add Assignment form state
  const [newAssignmentTitle, setNewAssignmentTitle] = useState("");
  const [newAssignmentDesc, setNewAssignmentDesc] = useState("");
  const [newAssignmentRef, setNewAssignmentRef] = useState("");
  const [newAssignmentDue, setNewAssignmentDue] = useState("");
  const [newAssignmentHint, setNewAssignmentHint] = useState("");

  // Admin Add Question builder form state
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("MCQ");
  const [newQuestionDiff, setNewQuestionDiff] = useState("Medium");
  const [newQuestionTopic, setNewQuestionTopic] = useState("");
  const [newQuestionOptions, setNewQuestionOptions] = useState(["", "", "", ""]);
  const [newQuestionCorrect, setNewQuestionCorrect] = useState([]);

  // Admin Content Manager form state
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDuration, setNewLessonDuration] = useState("");
  const [newLessonVideoUrl, setNewLessonVideoUrl] = useState("");
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [editLessonTitle, setEditLessonTitle] = useState("");
  const [editLessonDuration, setEditLessonDuration] = useState("");
  const [editLessonVideoUrl, setEditLessonVideoUrl] = useState("");
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [editModuleTitle, setEditModuleTitle] = useState("");
  const [expandedModuleId, setExpandedModuleId] = useState(1);
  // Resource builder
  const [newResourceTitle, setNewResourceTitle] = useState("");
  const [newResourceDesc, setNewResourceDesc] = useState("");
  const [newResourceVer, setNewResourceVer] = useState("");

  // Exam States
  const [examState, setExamState] = useState({
    started: false,
    completed: false,
    answers: {},
    timeLeft: 300,
    attempts: 0,
    score: 0,
    passed: false,
    freeAttemptsUsed: 0
  });
  const examTimer = useRef(null);

  // Exam Lobby: null | 'lobby' | 'exam'
  const [examLobby, setExamLobby] = useState(null);
  const [lobbyCountdown, setLobbyCountdown] = useState(120);
  const lobbyTimer = useRef(null);
  const [examStartedAt, setExamStartedAt] = useState(null);
  const [examReattemptPaid, setExamReattemptPaid] = useState(false);

  // Legal Acceptances
  const [legalAcceptances, setLegalAcceptances] = useState([
    { userId: "usr-201", documentVersion: "1.0", acceptedAt: "2026-07-20 14:00", ipAddress: "192.168.1.45" }
  ]);

  // Support Tickets
  const [tickets, setTickets] = useState([
    { id: "TK-1001", subject: "Video lagging at 1.3", category: "Technical", priority: "Medium", status: "Open", message: "Lesson video stays loading on mobile connections.", date: "2026-07-20" }
  ]);
  const [newTicket, setNewTicket] = useState({ subject: "", category: "Billing", message: "" });

  // FAQ Accordion Active Index
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);

  // Dashboard active tab: 'my-learning' | 'exam' | 'assignments' | 'certificate' | 'profile' | 'support'
  const [dashTab, setDashTab] = useState('my-learning');
  const [profileSaved, setProfileSaved] = useState(false);
  const [adminTab, setAdminTab] = useState('overview');
  const [adminOrderFilter, setAdminOrderFilter] = useState('All');
  // Admin authentication
  const [adminAuth, setAdminAuth] = useState(() => {
    const saved = localStorage.getItem('ybb_admin_auth');
    return saved ? JSON.parse(saved) : null;
  });
  const [adminLoginEmail, setAdminLoginEmail] = useState('');
  const [adminLoginPassword, setAdminLoginPassword] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  const [adminLoginLoading, setAdminLoginLoading] = useState(false);
  const [adminShowPassword, setAdminShowPassword] = useState(false);

  // System Audit Logs
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('ybb_auditLogs');
    return saved ? JSON.parse(saved) : [
      { timestamp: "2026-07-20T10:00:00Z", action: "User Registration", role: "Visitor", ip: "192.168.1.45" },
      { timestamp: "2026-07-20T11:15:00Z", action: "Admin Configured GST details", role: "SuperAdmin", ip: "192.168.1.1" }
    ];
  });
  const [auditSearchQuery, setAuditSearchQuery] = useState("");
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  
  const showToast = (message, type = 'success') => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    setToast({ message, type });
    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const logAction = (action, role = currentRole) => {
    const newLog = {
      timestamp: new Date().toISOString(),
      action,
      role,
      ip: "192.168.1.45"
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // --- HISTORY API NAVIGATE (clean URLs: /curriculum, /dashboard, etc.) ---
  const navigate = (screen) => {
    const path = SCREEN_TO_PATH_MAP[screen] ?? `/${screen}`;
    if (window.location.pathname !== path) {
      window.history.pushState({ screen }, '', path);
    }
    setCurrentScreen(screen);
  };

  // Override window.alert to render our custom Toast notifications dynamically
  useEffect(() => {
    window.alert = (message) => {
      let type = 'success';
      const lowercaseMsg = message.toLowerCase();
      if (lowercaseMsg.includes('invalid') || lowercaseMsg.includes('required') || lowercaseMsg.includes('failed') || lowercaseMsg.includes('fill') || lowercaseMsg.includes('error')) {
        type = 'error';
      } else if (lowercaseMsg.includes('warning') || lowercaseMsg.includes('lagging') || lowercaseMsg.includes('require')) {
        type = 'warning';
      } else if (lowercaseMsg.includes('downloading') || lowercaseMsg.includes('opening') || lowercaseMsg.includes('copy') || lowercaseMsg.includes('export')) {
        type = 'info';
      }
      showToast(message, type);
    };
  }, []);

  // Sync state to localStorage on changes
  useEffect(() => {
    localStorage.setItem('ybb_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('ybb_learners', JSON.stringify(learners));
  }, [learners]);

  useEffect(() => {
    localStorage.setItem('ybb_modules', JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem('ybb_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('ybb_questionBank', JSON.stringify(questionBank));
  }, [questionBank]);

  useEffect(() => {
    localStorage.setItem('ybb_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ybb_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('ybb_assignmentTasks', JSON.stringify(assignmentTasks));
  }, [assignmentTasks]);

  useEffect(() => {
    localStorage.setItem('ybb_auditLogs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('ybb_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('ybb_admin_auth', adminAuth ? JSON.stringify(adminAuth) : '');
  }, [adminAuth]);

  // Sync back-button / forward-button → screen state
  // Also strips any legacy /#/ hash from the URL on first load
  useEffect(() => {
    // Strip any leftover hash fragment from previous hash-based routing
    if (window.location.hash) {
      window.history.replaceState({ screen: pathToScreen() }, '', window.location.pathname);
    }
    const onPopState = (e) => {
      const s = e.state?.screen ?? pathToScreen();
      setCurrentScreen(s);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Exam Countdown handler
  useEffect(() => {
    if (examState.started && examState.timeLeft > 0 && !examState.completed) {
      examTimer.current = setInterval(() => {
        setExamState(prev => {
          if (prev.timeLeft <= 1) {
            clearInterval(examTimer.current);
            submitExam(prev.answers);
            return { ...prev, timeLeft: 0 };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(examTimer.current);
  }, [examState.started, examState.completed]);

  // Lobby countdown useEffect
  useEffect(() => {
    if (examLobby === 'lobby' && lobbyCountdown > 0) {
      lobbyTimer.current = setInterval(() => {
        setLobbyCountdown(prev => {
          if (prev <= 1) { clearInterval(lobbyTimer.current); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(lobbyTimer.current);
  }, [examLobby]);

  // Calculations
  const totalLessons = modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
  const completedPercentage = Math.round((activeLearner.completedLessons.length / totalLessons) * 100);

  const isLessonLocked = (lessonId) => {
    if (!settings.sequentialMode) return false;
    const flatLessons = [];
    modules.forEach(mod => {
      mod.lessons.forEach(l => {
        flatLessons.push(l.id);
      });
    });
    const index = flatLessons.indexOf(lessonId);
    if (index <= 0) return false;
    const prevLessonId = flatLessons[index - 1];
    return !activeLearner.completedLessons.includes(prevLessonId);
  };

  // Discount / Pricing calculations
  const baseDiscount = (settings.price * discountPercent) / 100;
  const discountedBase = settings.price - baseDiscount;
  const computedGST = (discountedBase * settings.gstRate) / 100;
  const totalBilledPrice = discountedBase + computedGST;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "YBB10") {
      setDiscountPercent(10);
      alert("Promo Code 'YBB10' applied! 10% Discount applied to base fee.");
      logAction("Applied coupon code YBB10", "Visitor");
    } else {
      alert("Invalid coupon code.");
    }
  };

  const handlePayment = (success) => {
    const orderNo = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const invoiceNo = "YBB-INV-2026-" + Math.floor(1000 + Math.random() * 9000);
    if (success) {
      const newOrder = {
        id: orderNo,
        learnerName: activeLearner.fullName,
        amount: totalBilledPrice,
        status: "Success",
        invoiceNo: invoiceNo,
        date: new Date().toLocaleDateString(),
        type: "Paid Enrolment",
        discountCode: discountPercent > 0 ? "YBB10" : "None"
      };
      setOrders(prev => [newOrder, ...prev]);
      setLegalAcceptances(prev => [
        ...prev,
        { userId: activeLearner.id, documentVersion: settings.legalVersion, acceptedAt: new Date().toLocaleString(), ipAddress: "192.168.1.45" }
      ]);
      logAction(`Enrolled via Payment. Order: ${orderNo}, Invoice: ${invoiceNo}`, "Visitor");
      navigate("payment_result");
    } else {
      const newOrder = {
        id: orderNo,
        learnerName: activeLearner.fullName,
        amount: totalBilledPrice,
        status: "Failed",
        invoiceNo: "",
        date: new Date().toLocaleDateString(),
        type: "Paid Enrolment",
        discountCode: discountPercent > 0 ? "YBB10" : "None"
      };
      setOrders(prev => [newOrder, ...prev]);
      logAction(`Enrolment payment failed. Order: ${orderNo}`, "Visitor");
      navigate("payment_result");
    }
  };

  const markLessonComplete = (lessonId) => {
    if (!activeLearner.completedLessons.includes(lessonId)) {
      setLearners(prev => prev.map(l => l.id === activeLearner.id ? { ...l, completedLessons: [...l.completedLessons, lessonId] } : l));
      logAction(`Completed lesson ${lessonId}`, "Learner");
      
      const flatLessons = [];
      modules.forEach(mod => {
        mod.lessons.forEach(l => {
          flatLessons.push(l.id);
        });
      });
      const currentIndex = flatLessons.indexOf(lessonId);
      if (currentIndex !== -1 && currentIndex + 1 < flatLessons.length) {
        setActiveLessonId(flatLessons[currentIndex + 1]);
        setWatchPercentage(0);
      }
    }
  };

  const submitExam = (answersToSubmit = examState.answers) => {
    clearInterval(examTimer.current);
    let correctCount = 0;
    questionBank.forEach((q) => {
      const userAns = answersToSubmit[q.id] || [];
      const correctAns = q.correct || [];
      const isCorrect = userAns.length === correctAns.length && userAns.every(v => correctAns.includes(v));
      if (isCorrect) correctCount++;
    });

    const percentage = Math.round((correctCount / questionBank.length) * 100);
    const passed = percentage >= 80;

    setExamState(prev => ({
      ...prev,
      completed: true,
      score: percentage,
      passed: passed,
      freeAttemptsUsed: passed ? prev.freeAttemptsUsed : Math.min(prev.freeAttemptsUsed + 1, 99)
    }));

    logAction(`Submitted Exam. Score: ${percentage}%. Result: ${passed ? 'PASSED' : 'FAILED'}`, "Learner");
    
    if (passed && settings.automaticIssuance) {
      setLearners(prev => prev.map(l => l.id === activeLearner.id ? { ...l, stage: "Certified" } : l));
      logAction("Certificate automatically generated on passing exam", "System");
    }
  };


  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAdminLoginLoading(true);
    setAdminLoginError('');
    // Simulate a short async check
    setTimeout(() => {
      const match = ADMIN_CREDENTIALS.find(
        cred => cred.email.toLowerCase() === adminLoginEmail.toLowerCase().trim()
              && cred.password === adminLoginPassword
      );
      if (match) {
        setAdminAuth(match);
        setCurrentRole(match.role);
        setAdminTab('overview');
        setAdminLoginEmail('');
        setAdminLoginPassword('');
        setAdminLoginError('');
        logAction(`Admin login: ${match.email} (${match.role})`, 'System');
      } else {
        setAdminLoginError('Invalid email or password. Please check your admin credentials.');
      }
      setAdminLoginLoading(false);
    }, 900);
  };

  const handleSupportTicketSubmit = (e) => {
    e.preventDefault();
    if (!newTicket.subject || !newTicket.message) return;
    const ticketId = "TK-" + Math.floor(1000 + Math.random() * 9000);
    const createdTicket = {
      id: ticketId,
      subject: newTicket.subject,
      category: newTicket.category,
      priority: "Low",
      status: "Open",
      message: newTicket.message,
      date: new Date().toLocaleDateString()
    };
    setTickets(prev => [createdTicket, ...prev]);
    setNewTicket({ subject: "", category: "Billing", message: "" });
    logAction(`Created support ticket ${ticketId}`, "Learner");
    alert(`Ticket ${ticketId} raised successfully.`);
  };

  return (
    <div className="app-container">
      {/* Simulation Role Switcher Bar */}
      <div className="role-bar">
        <div>
          <strong>LMS Sandbox Admin Controls:</strong> Switch roles to test different user journeys and system logic.
        </div>
        <div className="role-selector">
          {["Visitor", "Learner", "Reviewer", "SupportAdmin", "ContentAdmin", "SuperAdmin"].map((role) => (
            <button
              key={role}
              onClick={() => {
                setCurrentRole(role);
                if (role === "Visitor") {
                  navigate("home");
                } else if (["SuperAdmin", "ContentAdmin", "SupportAdmin"].includes(role)) {
                  navigate("admin");
                } else {
                  navigate("dashboard");
                }
                logAction("Switched Role view to " + role, "Admin");
              }}
              className={`role-btn ${currentRole === role ? 'active' : ''}`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="navbar">
        <div className="navbar-brand" onClick={() => navigate("home")} style={{cursor: 'pointer'}}>
          <Award size={28} className="icon-wrapper accent" style={{marginBottom: 0, width: 34, height: 34}} />
          <div>
            <span>Yoova Business Broking</span>
            <div style={{fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)'}}>
              ABB Learning & Certification
            </div>
          </div>
        </div>

        <nav className="nav-links">
          <span className="nav-link" onClick={() => navigate("home")}>Home</span>
          <span className="nav-link" onClick={() => navigate("syllabus")}>Curriculum</span>
          <span className="nav-link" onClick={() => navigate("faq")}>FAQ</span>
          <span className="nav-link" onClick={() => navigate("support")}>Contact</span>
          <button className="btn btn-secondary" onClick={() => navigate("verification")}>
            Verify Certificate
          </button>
          {currentRole !== "Visitor" ? (
            <div className="nav-user">
              <Shield size={16} />
              <span>{activeLearner.fullName} ({currentRole})</span>
              <button 
                onClick={() => {
                  setCurrentRole("Visitor");
                  navigate("home");
                }}
                style={{background: 'none', border: 'none', display: 'flex', color: 'var(--danger)'}}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate("register")}>
              Register / Log In
            </button>
          )}
        </nav>
      </header>

      {/* Main Application Router */}
      <main className="content-wrapper">
             {/* --- SCREEN 1: PREMIUM HOME / SALES PAGE --- */}
        {currentScreen === "home" && (
          <div>
            {/* HERO  -  dark gradient with floating card */}
            <div className="hero-bg" style={{marginBottom: '0', borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
              <div style={{display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '56px', alignItems: 'center', position: 'relative', zIndex: 1}}>
                <div>
                  <span style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(251,191,36,.15)', border: '1px solid rgba(251,191,36,.3)', color: '#fbbf24', padding: '5px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '20px'}}>
                    <Award size={13} /> India's Premier M&A Broker Credential
                  </span>
                  <h1 className="hero-title" style={{fontSize: '3.6rem', fontWeight: 800, lineHeight: 1.08, marginBottom: '20px', color: '#fff'}}>
                    Become an<br /><span>Authorised Business Broker</span>
                  </h1>
                  <p style={{fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.75, maxWidth: '520px', marginBottom: '32px'}}>
                    Master M&amp;A advisory, business valuation, CIM creation, and deal closing with India's only structured ABB certification programme from Yoova Business Broking.
                  </p>
                  <div style={{display: 'flex', gap: '14px', flexWrap: 'wrap'}}>
                    <button
                      className="btn"
                      onClick={() => navigate("register")}
                      style={{background: 'linear-gradient(90deg, #f59e0b, #d97706)', color: '#fff', padding: '14px 30px', fontSize: '1rem', fontWeight: 700, borderRadius: '10px', boxShadow: '0 4px 18px rgba(217,119,6,.4)'}}
                    >
                      Enroll Now <ArrowRight size={18} />
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate("syllabus")}
                      style={{background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.2)', color: '#e2e8f0', padding: '14px 30px', fontSize: '1rem'}}
                    >
                      View Curriculum
                    </button>
                  </div>
                  <div style={{display: 'flex', gap: '24px', marginTop: '32px', flexWrap: 'wrap'}}>
                    {[['1,200+', 'Certified ABBs'], ['10', 'Modules'], ['50+', 'Video Lessons']].map(([v, l]) => (
                      <div key={l}>
                        <div style={{fontSize: '1.5rem', fontWeight: 800, color: '#fff'}}>{v}</div>
                        <div style={{fontSize: '0.78rem', color: '#64748b', fontWeight: 600}}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Card */}
                <div style={{background: '#fff', borderRadius: '16px', padding: '32px 28px', boxShadow: '0 24px 60px rgba(0,0,0,.3)', position: 'relative', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #1e3a8a, #d97706)'}} />
                  <div style={{fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '8px'}}>Programme Tuition</div>
                  <div style={{fontSize: '2.8rem', fontWeight: 800, color: '#0f172a', lineHeight: 1}}>
                    ₹{(settings.price).toLocaleString('en-IN')}
                  </div>
                  <div style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: '20px'}}>
                    + GST {settings.gstRate}% &nbsp;&rarr;&nbsp; <strong style={{color: 'var(--accent)'}}>₹{(settings.price * (1 + settings.gstRate / 100)).toLocaleString('en-IN')} total</strong>
                  </div>
                  {[
                    '10 comprehensive video modules',
                    'ABB Learner Workbook & templates',
                    '3 case study submissions',
                    'Timed MCQ final examination',
                    'Unique verifiable ABB credential',
                    'Lifetime content access'
                  ].map(item => (
                    <div key={item} style={{display: 'flex', gap: '10px', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.875rem', color: '#334155'}}>
                      <CheckCircle size={15} style={{color: 'var(--success)', flexShrink: 0}} />
                      {item}
                    </div>
                  ))}
                  <div style={{background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '10px 14px', margin: '18px 0', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Tag size={16} style={{color: '#b45309', flexShrink: 0}} />
                    <span>Use code <strong style={{color: 'var(--primary)'}}>YBB10</strong> for <strong>10% off</strong> your enrolment fee.</span>
                  </div>
                  <button className="btn btn-accent btn-block" onClick={() => navigate("register")} style={{padding: '14px', fontSize: '1rem', borderRadius: '10px', background: 'linear-gradient(90deg, #1e3a8a, #1d4ed8)', boxShadow: '0 4px 16px rgba(30,58,138,.35)'}}>
                    Proceed to Registration <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* WHY ABB - Features strip below hero */}
            <div style={{background: 'var(--bg-card)', border: '1px solid var(--border)', borderTop: 'none', borderBottomLeftRadius: 'var(--r)', borderBottomRightRadius: 'var(--r)', padding: '40px 48px', marginBottom: '64px', boxShadow: 'var(--shadow-md)'}}>
              <div className="features-grid">
                {[
                  { icon: <BookOpen size={20} style={{color: '#1d4ed8'}} />, bg: '#eff6ff', label: 'Business Valuation', desc: 'Master SDE recasting, EBITDA multiples, asset and DCF methods.' },
                  { icon: <FileText size={20} style={{color: '#ea580c'}} />, bg: '#fff7ed', label: 'CIM & Deal Marketing', desc: 'Create blind profiles, information memorandums, and buyer teasers.' },
                  { icon: <Shield size={20} style={{color: '#16a34a'}} />, bg: '#f0fdf4', label: 'Due Diligence', desc: 'Conduct financial, legal, and operational due diligence end-to-end.' },
                  { icon: <Users size={20} style={{color: '#c026d3'}} />, bg: '#fdf4ff', label: 'Deal Negotiation', desc: 'LOI structuring, earn-outs, and SPA negotiation tactics.' },
                  { icon: <Award size={20} style={{color: '#d97706'}} />, bg: '#fffbeb', label: 'ABB Certification', desc: 'Earn a publicly verifiable credential with a unique ABB ID.' },
                  { icon: <Target size={20} style={{color: '#0284c7'}} />, bg: '#f0f9ff', label: 'Sector Expertise', desc: 'Retail, manufacturing, tech, healthcare & e-commerce M&A.' },
                ].map(f => (
                  <div key={f.label} className="feat-card">
                    <div className="feat-icon" style={{background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{f.icon}</div>
                    <h4 style={{fontWeight: 700, marginBottom: '6px', fontSize: '0.95rem'}}>{f.label}</h4>
                    <p style={{fontSize: '0.835rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0}}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="stats-grid" style={{marginBottom: '72px'}}>
              {[
                { label: "Video Lessons", value: "50+", desc: "DRM-secured streams across 10 modules" },
                { label: "Case Exercises", value: "10+", desc: "Excel, CIM & deal simulation formats" },
                { label: "Graduated Alumni", value: "1,200+", desc: "Certified ABBs across India" },
                { label: "Credential Verification", value: "Instant", desc: "Via unique ABB ID public portal" }
              ].map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-desc">{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* Journey Roadmap */}
            <div style={{marginBottom: '72px'}}>
              <h2 className="section-title">The Career Acceleration Journey</h2>
              <p className="section-sub">A clear, end-to-end milestone tracker representing your complete path to certification.</p>
              <div style={{maxWidth: '640px', margin: '0 auto', padding: '36px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', boxShadow: 'var(--shadow-md)'}}>
                {[
                  { step: "1", title: "Registration & Account Setup", desc: "Establish your billing record and confirm certificate nomenclature." },
                  { step: "2", title: "10-Module Video Training", desc: "Study valuation recasting, CIM creation, data rooms, and transaction closing." },
                  { step: "3", title: "Case Study & Assignment Submission", desc: "Upload Excel models and deal teasers for reviewer evaluation." },
                  { step: "4", title: "Timed MCQ Final Examination", desc: "Score ≥80% on a 50-question timed assessment covering all 10 modules." },
                  { step: "5", title: "YBB Code of Conduct Acceptance", desc: "Digitally accept the professional standards and ethics declaration." },
                  { step: "6", title: "Instant Verifiable ABB Credentials", desc: "Receive your unique ABB ID and downloadable, publicly verifiable certificate." }
                ].map((item, idx, arr) => (
                  <div key={idx} className="journey-step" style={{paddingBottom: idx < arr.length - 1 ? '28px' : '0'}}>
                    <div className="step-circle">{item.step}</div>
                    <div style={{paddingTop: '4px'}}>
                      <h4 style={{margin: '0 0 4px', fontWeight: 700}}>{item.title}</h4>
                      <p style={{margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)'}}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alumni Testimonials */}
            <div style={{marginBottom: '64px'}}>
              <h2 className="section-title">Alumni Success Spotlight</h2>
              <p className="section-sub">Hear from certified ABBs who have transformed their careers.</p>
              <div className="grid-3">
                {[
                  { name: "Ananya Sen", role: "M&A Advisory Partner, Mumbai", quote: "The recasting valuation modules and the YBB workbook helped me secure my first sell-side mandate. The Excel templates alone are worth the investment." },
                  { name: "Vikram Malhotra", role: "Commercial Broker, Delhi NCR", quote: "Verifying my credentials via my unique ABB ID on the public portal gives immediate credibility to business seller clients. Game changer." },
                  { name: "Suresh Pillai", role: "Corporate Transition Advisor, Kochi", quote: "The sequential gating model forced me to master every concept before the exam. I passed with 91% on my first attempt. Highly structured." }
                ].map((testimonial, idx) => (
                  <div key={idx} className="testimonial-card">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p style={{fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.7}}>
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <strong style={{fontSize: '0.95rem', display: 'block'}}>{testimonial.name}</strong>
                      <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{testimonial.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA Banner */}
            <div style={{background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', borderRadius: 'var(--r)', padding: '52px 48px', textAlign: 'center', marginBottom: '16px', position: 'relative', overflow: 'hidden'}}>
              <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 50%, rgba(29,78,216,.3), transparent 60%)', pointerEvents: 'none'}} />
              <div style={{position: 'relative', zIndex: 1}}>
                <h2 style={{color: '#fff', fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px'}}>Ready to Earn Your ABB Credential?</h2>
                <p style={{color: '#94a3b8', fontSize: '1.05rem', marginBottom: '28px', maxWidth: '520px', margin: '0 auto 28px'}}>Join 1,200+ certified brokers across India. Your first step to a career in M&amp;A transaction advisory starts here.</p>
                <button className="btn" onClick={() => navigate("register")} style={{background: 'linear-gradient(90deg, #f59e0b, #d97706)', color: '#fff', padding: '15px 36px', fontSize: '1.05rem', fontWeight: 700, borderRadius: '10px', boxShadow: '0 4px 20px rgba(217,119,6,.4)'}}>
                  Start Your Certification <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- SCREEN 1B: PUBLIC SYLLABUS/CURRICULUM PAGE --- */}
        {currentScreen === "syllabus" && (
          <div style={{maxWidth: '860px', margin: '0 auto'}}>
            <h2 className="section-title">Complete Course Curriculum</h2>
            <p className="section-sub">
              10 comprehensive modules covering everything from deal origination to certificate issuance. 50+ lessons, 6 hours of content.
            </p>
            {modules.map((mod, modIdx) => (
              <div key={mod.id} className="checkout-card" style={{marginBottom: '16px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px'}}>
                  <div style={{width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, fontSize: '0.9rem'}}>
                    {modIdx + 1}
                  </div>
                  <h4 style={{color: 'var(--primary)', margin: 0, fontWeight: 700}}>{mod.title}</h4>
                  <span className="badge badge-info" style={{marginLeft: 'auto', flexShrink: 0}}>{mod.lessons.length} lessons</span>
                </div>
                <div style={{paddingLeft: '50px'}}>
                  {mod.lessons.map((les, lesIdx) => (
                    <div key={les.id} style={{display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '8px 0', borderBottom: lesIdx < mod.lessons.length - 1 ? '1px solid var(--border)' : 'none'}}>
                      <Play size={14} style={{color: 'var(--text-light)', marginTop: '3px', flexShrink: 0}} />
                      <div>
                        <div style={{fontWeight: 600, fontSize: '0.9rem'}}>{les.title}</div>
                        <div style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px'}}>{les.summary}</div>
                      </div>
                      <span style={{marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-light)', whiteSpace: 'nowrap', flexShrink: 0}}>{les.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{textAlign: 'center', marginTop: '36px'}}>
              <button className="btn btn-primary" style={{padding: '14px 36px', fontSize: '1rem'}} onClick={() => navigate("register")}>
                Enroll &amp; Access Full Course <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* --- SCREEN 1C: FAQ PAGE --- */}
        {currentScreen === "faq" && (
          <div style={{maxWidth: '720px', margin: '0 auto'}}>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-sub">Everything you need to know about the ABB Certification programme.</p>
            {[
              { q: "Is the ABB Certification a statutory government license?", a: "No. The Authorised Business Broker (ABB) Certificate is a professional credential issued by Yoova Business Broking (YBB). It certifies completion of the YBB standard curriculum but is not a state licensing credential or government-issued certificate." },
              { q: "How long do I have access to the course content?", a: "Learners receive lifetime access to all modules, video lessons, downloadable workbook resources, case templates, and future content updates at no additional fee." },
              { q: "What happens if I fail the Final Examination?", a: "The number of reattempts is configured by the admin. By default, learners may reattempt after a 48-hour cooling period. You can track reattempt availability directly on your Learner Dashboard." },
              { q: "How can employers or clients verify my ABB credentials?", a: "Every certificate carries a unique ABB ID (e.g. YBB-ABB-2026-1049). Employers, business sellers, and clients can instantly verify authenticity via our public Credentials Verification page with no login required." },
              { q: "What is included in the course fee?", a: "The fee covers all 10 video modules (50+ lessons), the ABB Learner Workbook, practice case templates (Excel + PDF), 3 assignment submissions, the final MCQ examination, and issuance of the ABB Certificate with unique ID." },
              { q: "Is there a refund policy?", a: "Refunds are subject to YBB's refund policy as configured by the admin. In general, refunds may be applicable before course progress exceeds 20%. Contact support for case-specific refund requests." },
              { q: "Can I study at my own pace?", a: "Yes. The programme is entirely self-paced with no fixed deadlines. Sequential lesson gating is enforced to ensure conceptual mastery before proceeding, but you control when and how fast you progress." },
              { q: "What is the passing score for the Final Exam?", a: "The minimum passing threshold is 80% (configured by admin). The timed MCQ exam contains questions spanning all 10 modules and tests both conceptual understanding and practical application." }
            ].map((faq, idx) => (
              <div key={idx} className="faq-item">
                <div className="faq-trigger" onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}>
                  <span>{faq.q}</span>
                  <strong style={{fontSize: '1.2rem', color: 'var(--primary)'}}>{faqOpenIndex === idx ? '−' : '+'}</strong>
                </div>
                {faqOpenIndex === idx && (
                  <div className="faq-body">{faq.a}</div>
                )}
              </div>
            ))}
            <div style={{textAlign: 'center', marginTop: '36px'}}>
              <button className="btn btn-primary" onClick={() => navigate("register")} style={{padding: '12px 28px'}}>
                Enroll Now <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* --- SCREEN 1D: PUBLIC CONTACT SUPPORT PAGE --- */}
        {currentScreen === "support" && (
          <div style={{maxWidth: '550px', margin: '0 auto'}} className="checkout-card">
            <h2 style={{textAlign: 'center', marginBottom: '8px'}}><Mail size={32} style={{color: 'var(--accent)', display: 'block', margin: '0 auto 10px'}} />Contact Support</h2>
            <p className="text-muted" style={{textAlign: 'center', marginBottom: '24px', fontSize: '0.9rem'}}>
              Have inquiries about YBB branding, invoicing, or course payments? Drop us a query.
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert("Your query has been recorded. YBB support admin will reach out to you shortly.");
              navigate("home");
            }}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input type="text" className="form-control" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">Message Details</label>
                <textarea className="form-control" rows="4" placeholder="How can YBB team assist you?" required />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Send Inquiry</button>
            </form>
          </div>
        )}

        {/* --- SCREEN 2: REGISTRATION & PROFILE --- */}
        {currentScreen === "register" && (
          <div style={{maxWidth: '600px', margin: '0 auto'}} className="checkout-card">
            <h2 style={{textAlign: 'center', marginBottom: '8px'}}>Learner Account Registration</h2>
            <p className="text-muted" style={{textAlign: 'center', marginBottom: '24px', fontSize: '0.9rem'}}>
              Already have an account? <span onClick={() => {
                setCurrentRole("Learner");
                navigate("dashboard");
              }} style={{color: 'var(--primary)', cursor: 'pointer', fontWeight: 600}}>Log In here</span>. Or recover access via <span onClick={() => navigate("forgot_password")} style={{color: 'var(--primary)', cursor: 'pointer', fontWeight: 600}}>forgot password</span>.
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              logAction("Created account and registered profile details", "Visitor");
              navigate("checkout");
            }}>
              <div className="form-group">
                <label className="form-label">Full Name (Exactly as needed on certificate) *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={activeLearner.fullName}
                  onChange={(e) => setLearners([{ ...activeLearner, fullName: e.target.value }])}
                  required 
                />
              </div>
              <div className="grid-3" style={{gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '0'}}>
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    value={activeLearner.mobile}
                    onChange={(e) => setLearners([{ ...activeLearner, mobile: e.target.value }])}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={activeLearner.email}
                    onChange={(e) => setLearners([{ ...activeLearner, email: e.target.value }])}
                    required 
                  />
                </div>
              </div>
              <div className="grid-3" style={{gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '0'}}>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={activeLearner.city}
                    onChange={(e) => setLearners([{ ...activeLearner, city: e.target.value }])}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={activeLearner.state}
                    onChange={(e) => setLearners([{ ...activeLearner, state: e.target.value }])}
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Profession *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={activeLearner.profession}
                  onChange={(e) => setLearners([{ ...activeLearner, profession: e.target.value }])}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Billing Address *</label>
                <textarea 
                  className="form-control" 
                  value={activeLearner.billingAddress}
                  onChange={(e) => setLearners([{ ...activeLearner, billingAddress: e.target.value }])}
                  required
                />
              </div>
              <div style={{background: '#f8fafc', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px', marginBottom: '20px'}}>
                <label style={{display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', fontSize: '0.85rem'}}>
                  <input type="checkbox" required />
                  <span>I agree to the platform Privacy Policy, Terms of Use (v{settings.legalVersion}), and acknowledge that the ABB certificate is a private credential.</span>
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Register Profile & Continue <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}

        {/* --- SCREEN 3: FORGOT PASSWORD / ACCESS RECOVERY --- */}
        {currentScreen === "forgot_password" && (
          <div style={{maxWidth: '450px', margin: '0 auto'}} className="checkout-card">
            <h3>Forgot Password / Account Recovery</h3>
            <p className="text-muted" style={{fontSize: '0.9rem', marginBottom: '20px'}}>
              Enter your registered email address or mobile number to receive account recovery details.
            </p>
            <div className="form-group">
              <label className="form-label">Email or Mobile Number</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. rohan@example.com"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
              />
            </div>
            <button 
              className="btn btn-primary btn-block"
              onClick={() => {
                alert(`Recovery OTP / Verification link dispatched to ${recoveryEmail || activeLearner.email}`);
                logAction(`Initiated account recovery for ${recoveryEmail || activeLearner.email}`, "Visitor");
                navigate("register");
              }}
            >
              Recover Access
            </button>
            <button className="btn btn-secondary btn-block" style={{marginTop: '10px'}} onClick={() => navigate("register")}>
              Back to Registration
            </button>
          </div>
        )}

        {/* --- SCREEN 4: CHECKOUT WITH COUPONS --- */}
        {currentScreen === "checkout" && (
          <div className="checkout-layout">
            <div className="checkout-card">
              <h3>Confirm Billing & Purchase Terms</h3>
              <div className="form-group" style={{marginTop: '20px'}}>
                <label className="form-label">GSTIN (Optional - for corporate tax credit)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 29AAAAA1111A1Z1" 
                  className="form-control"
                  value={activeLearner.gstNumber}
                  onChange={(e) => setLearners([{ ...activeLearner, gstNumber: e.target.value }])}
                />
              </div>

              <div style={{background: '#fffbeb', border: '1px solid #fde68a', padding: '16px', borderRadius: '8px', marginBottom: '24px'}}>
                <h4>Legal Disclaimers & Declarations</h4>
                <p style={{fontSize: '0.85rem', color: '#92400e'}}>
                  {settings.legalText}
                </p>
                <label style={{display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', marginTop: '16px', fontWeight: 600, fontSize: '0.9rem'}}>
                  <input type="checkbox" required />
                  <span>I explicitly accept the purchase terms, GST invoicing rules, and the legal disclaimers above.</span>
                </label>
              </div>

              {/* Promo Code input */}
              <div style={{background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '20px'}}>
                <label className="form-label"><Tag size={16} style={{verticalAlign: 'middle', marginRight: '6px'}} />Have a Promo Code?</label>
                <div style={{display: 'flex', gap: '10px', marginTop: '8px'}}>
                  <input 
                    type="text" 
                    placeholder="Enter code (Try 'YBB10')" 
                    className="form-control" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button type="button" className="btn btn-secondary" onClick={handleApplyCoupon}>Apply</button>
                </div>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                <button className="btn btn-secondary" onClick={() => navigate("register")}>
                  Edit Profile
                </button>
                <button className="btn btn-primary" onClick={() => handlePayment(true)}>
                  Pay ₹{totalBilledPrice.toLocaleString('en-IN')} (Success)
                </button>
              </div>
              <button 
                className="btn btn-secondary"
                style={{marginTop: '12px', width: '100%', borderColor: 'var(--danger)', color: 'var(--danger)'}}
                onClick={() => handlePayment(false)}
              >
                Simulate Payment Failure
              </button>
            </div>

            <div className="checkout-card" style={{background: '#f8fafc'}}>
              <h3>Order Summary</h3>
              <div style={{display: 'flex', justifycontent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0'}}>
                <span>ABB Certification Course fee</span>
                <strong>₹{settings.price.toLocaleString('en-IN')}</strong>
              </div>
              {discountPercent > 0 && (
                <div style={{display: 'flex', justifycontent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0', color: 'var(--success)'}}>
                  <span>Promo Discount ({discountPercent}%)</span>
                  <strong>- ₹{baseDiscount.toLocaleString('en-IN')}</strong>
                </div>
              )}
              <div style={{display: 'flex', justifycontent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0'}}>
                <span>GST ({settings.gstRate}%)</span>
                <strong>₹{computedGST.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{display: 'flex', justifycontent: 'space-between', padding: '16px 0', fontSize: '1.2rem', color: 'var(--primary)'}}>
                <span>Total Amount:</span>
                <strong>₹{totalBilledPrice.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                Secure transaction processed by Yoova Business Broking payment collections. Card/banking credentials are not stored on YBB servers.
              </div>
            </div>
          </div>
        )}

        {/* --- SCREEN 5: PAYMENT RESULT --- */}
        {currentScreen === "payment_result" && (
          <div style={{maxWidth: '600px', margin: '0 auto', textAlign: 'center'}} className="checkout-card">
            {orders[0]?.status === "Success" ? (
              <div>
                <div style={{width: '64px', height: '64px', borderRadius: '50%', background: '#d1fae5', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'}}>
                  <CheckCircle size={36} />
                </div>
                <h2>Enrolment Successful!</h2>
                <p className="text-muted" style={{marginBottom: '24px'}}>
                  Your payment has been processed. A course enrollment is active and your invoice has been generated.
                </p>

                <div style={{background: '#f8fafc', padding: '16px', borderRadius: '8px', textAlign: 'left', marginBottom: '24px', border: '1px solid var(--border-color)'}}>
                  <div style={{marginBottom: '8px'}}><strong>Invoice No:</strong> {orders[0].invoiceNo}</div>
                  <div style={{marginBottom: '8px'}}><strong>Order ID:</strong> {orders[0].id}</div>
                  <div style={{marginBottom: '8px'}}><strong>Date:</strong> {orders[0].date}</div>
                  <div style={{marginBottom: '8px'}}><strong>Billed To:</strong> {activeLearner.fullName}</div>
                  <div><strong>Tax Breakup:</strong> CGST (9%) + SGST (9%) included.</div>
                </div>

                <button 
                  className="btn btn-primary btn-block" 
                  onClick={() => {
                    setCurrentRole("Learner");
                    navigate("dashboard");
                  }}
                >
                  Go to Learner Dashboard <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <div>
                <div style={{width: '64px', height: '64px', borderRadius: '50%', background: '#fee2e2', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'}}>
                  <AlertCircle size={36} />
                </div>
                <h2>Payment Failed</h2>
                <p className="text-muted" style={{marginBottom: '24px'}}>
                  The transaction was rejected by the gateway. Please review billing details and try again.
                </p>
                <button className="btn btn-primary" onClick={() => navigate("checkout")}>
                  Return to Checkout
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- SCREEN 6: PREMIUM DASHBOARD --- */}
        {currentScreen === "dashboard" && (
          <div className="dashboard-layout">

            {/* PREMIUM DARK SIDEBAR */}
            <aside className="dash-sidebar">
              <div className="dash-sidebar-header">
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <img
                    src={activeLearner.photo}
                    style={{width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,.3)'}}
                    alt="Profile"
                  />
                  <div>
                    <div style={{fontWeight: 700, fontSize: '0.95rem', color: '#fff'}}>{activeLearner.fullName}</div>
                    <div style={{fontSize: '0.72rem', color: '#93c5fd', marginTop: '2px'}}>{currentRole} · {activeLearner.status}</div>
                  </div>
                </div>
                <div style={{marginTop: '16px', background: 'rgba(255,255,255,.08)', borderRadius: '8px', padding: '10px 12px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#93c5fd', marginBottom: '6px', fontWeight: 600}}>
                    <span>Curriculum Progress</span>
                    <span>{completedPercentage}%</span>
                  </div>
                  <div style={{height: '5px', background: 'rgba(255,255,255,.15)', borderRadius: '99px', overflow: 'hidden'}}>
                    <div style={{height: '100%', width: `${completedPercentage}%`, background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', borderRadius: '99px', transition: 'width .5s'}} />
                  </div>
                  <div style={{fontSize: '0.7rem', color: '#64748b', marginTop: '5px'}}>{activeLearner.completedLessons.length} / {totalLessons} lessons complete</div>
                </div>
              </div>

              <div className="dash-sidebar-menu">
                {[
                  { icon: <BookOpen size={17} />, label: 'My Learning',  tab: 'my-learning' },
                  { icon: <CheckSquare size={17} />, label: 'Final Exam', tab: 'exam',
                    badge: completedPercentage < 100 ? '🔒' : examState.passed ? '✓' : 'Ready' },
                  { icon: <FileText size={17} />,    label: 'Assignments',  tab: 'assignments' },
                  { icon: <Award size={17} />,       label: 'Certificate',  tab: 'certificate' },
                  { icon: <Users size={17} />,       label: 'Profile',      tab: 'profile' },
                  { icon: <HelpCircle size={17} />,  label: 'Support',      tab: 'support' },
                ].map(item => (
                  <div
                    key={item.label}
                    className={`dash-nav-item${dashTab === item.tab ? ' active' : ''}`}
                    onClick={() => {
                      if (item.tab === 'exam' && completedPercentage < 100) {
                        alert("Please complete all video lessons first to unlock the exam.");
                        return;
                      }
                      setDashTab(item.tab);
                      // Exam is started via the lobby flow
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                  </div>
                ))}

                {["SuperAdmin", "ContentAdmin", "SupportAdmin"].includes(currentRole) && (
                  <div style={{borderTop: '1px solid rgba(255,255,255,.06)', marginTop: '12px', paddingTop: '12px'}}>
                    <div style={{fontSize: '0.65rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '.08em', padding: '0 14px', marginBottom: '6px'}}>Admin</div>
                    <div className="dash-nav-item" style={{color: '#fbbf24'}} onClick={() => navigate('admin')}>
                      <Shield size={17} />
                      <span>LMS Admin Panel</span>
                    </div>
                  </div>
                )}

                <div style={{borderTop: '1px solid rgba(255,255,255,.06)', marginTop: '12px', paddingTop: '12px', padding: '12px 8px 8px'}}>
                  <div className="dash-nav-item" onClick={() => navigate("home")} style={{color: '#94a3b8'}}>
                    <Home size={17} />
                    <span>Back to Home</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* DASHBOARD CONTENT AREA */}
            <section style={{display: 'flex', flexDirection: 'column', gap: '22px', minWidth: 0}}>

              {/* LEARNER / VISITOR VIEW  -  show for any non-admin role */}
              {(currentRole === "Learner" || currentRole === "Visitor") && <>
                  {dashTab === 'my-learning' && <>
                  {/* Welcome Banner */}
                  <div className="welcome-banner">
                    <div style={{position: 'relative', zIndex: 1}}>
                      <div style={{fontSize: '0.75rem', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '6px'}}>Welcome Back</div>
                      <h2 style={{color: '#fff', margin: '0 0 6px', fontSize: '1.6rem', fontWeight: 800}}>{activeLearner.fullName}</h2>
                      <p style={{color: '#93c5fd', margin: 0, fontSize: '0.9rem'}}>
                        Your ABB certification path is active  -  {completedPercentage < 100 ? `${totalLessons - activeLearner.completedLessons.length} lessons remaining` : 'curriculum complete! Take your exam.'}
                      </p>
                    </div>
                  </div>

                  {/* KPI Tiles */}
                  <div className="kpi-grid">
                    {[
                      { label: 'Lessons Done', value: activeLearner.completedLessons.length, sub: `of ${totalLessons} total` },
                      { label: 'Completion', value: `${completedPercentage}%`, sub: 'overall progress' },
                      { label: 'Exam Attempts', value: examState.attempts, sub: 'max 3 allowed' },
                      { label: 'Exam Score', value: examState.completed ? `${examState.score}%` : ' - ', sub: examState.passed ? 'passed ✓' : examState.completed ? 'failed ✓”' : 'not taken yet' },
                    ].map(k => (
                      <div key={k.label} className="kpi-tile">
                        <div className="kpi-label">{k.label}</div>
                        <div className="kpi-value">{k.value}</div>
                        <div className="kpi-sub">{k.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Module Progress Map */}
                  <div style={{background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '24px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                      <div>
                        <h3 style={{margin: 0, fontWeight: 700, fontSize: '1rem'}}>Module Completion Map</h3>
                        <p style={{margin: '3px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)'}}>Track your progress across all 10 modules</p>
                      </div>
                      <div style={{display: 'flex', gap: '14px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)'}}>
                        <span style={{display: 'flex', gap: '5px', alignItems: 'center'}}><span style={{width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block'}} />Done</span>
                        <span style={{display: 'flex', gap: '5px', alignItems: 'center'}}><span style={{width: '10px', height: '10px', borderRadius: '50%', background: '#1d4ed8', display: 'inline-block'}} />Active</span>
                        <span style={{display: 'flex', gap: '5px', alignItems: 'center'}}><span style={{width: '10px', height: '10px', borderRadius: '50%', background: '#e2e8f0', display: 'inline-block'}} />Locked</span>
                      </div>
                    </div>
                    <div className="module-map">
                      {modules.map((mod, idx) => {
                        const modLessons = mod.lessons.map(l => l.id);
                        const allDone = modLessons.every(lid => activeLearner.completedLessons.includes(lid));
                        const anyDone = modLessons.some(lid => activeLearner.completedLessons.includes(lid));
                        const circleClass = allDone ? 'done' : anyDone ? 'active' : 'locked';
                        return (
                          <div key={mod.id} className="mod-dot">
                            <div className={`mod-circle ${circleClass}`}>
                              {allDone ? <CheckCircle size={18} /> : idx + 1}
                            </div>
                            <span>Mod {idx + 1}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Activity Feed */}
                  <div style={{background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '24px'}}>
                    <h3 style={{margin: '0 0 16px', fontWeight: 700, fontSize: '1rem'}}>Recent Activity</h3>
                    {[
                      { color: '#10b981', text: 'Completed Lesson 1.2  -  Business Valuation Methods', time: '2 hours ago' },
                      { color: '#10b981', text: 'Completed Lesson 1.1  -  Introduction to M&A Broking', time: 'Yesterday' },
                      { color: '#1d4ed8', text: 'Enrolled in ABB Certification Programme', time: '2026-07-20' },
                      { color: '#f59e0b', text: 'Profile setup complete  -  billing address saved', time: '2026-07-20' },
                    ].map((a, i) => (
                      <div key={i} className="activity-item">
                        <div className="activity-dot" style={{background: a.color}} />
                        <div style={{flex: 1}}>
                          <div style={{fontWeight: 500}}>{a.text}</div>
                          <div style={{color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '3px'}}>{a.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  </>}
                  {dashTab === 'profile' && <>

                  {/* === PROFILE TAB === */}
                  {/* Header Banner */}
                  <div className="tab-page-header" style={{position: 'relative', zIndex: 1}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '18px', position: 'relative', zIndex: 1}}>
                      <div 
                        className="profile-avatar-ring" 
                        style={{
                          position: 'relative', 
                          cursor: 'pointer',
                          overflow: 'hidden'
                        }}
                        onClick={() => document.getElementById('avatar-file-input').click()}
                        title="Click to upload new avatar image"
                      >
                        <img 
                          src={activeLearner.photo} 
                          alt="Profile" 
                          style={{
                            width: '100%', 
                            height: '100%', 
                            borderRadius: '50%', 
                            objectFit: 'cover'
                          }} 
                        />
                        <div style={{
                          position: 'absolute',
                          inset: '3px',
                          borderRadius: '50%',
                          background: 'rgba(0, 0, 0, 0.65)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.2s',
                          color: '#fff'
                        }}
                        onMouseOver={e => e.currentTarget.style.opacity = 1}
                        onMouseOut={e => e.currentTarget.style.opacity = 0}
                        >
                          <Upload size={18} style={{marginBottom: '2px'}} />
                          <span style={{fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Edit</span>
                        </div>
                        <input
                          id="avatar-file-input"
                          type="file"
                          accept="image/*"
                          style={{display: 'none'}}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = () => {
                              setLearners(prev => prev.map(l => l.id === activeLearner.id ? { ...l, photo: reader.result } : l));
                              logAction('Updated profile avatar image', 'Learner');
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                      </div>
                      <div>
                        <h2 style={{marginBottom: '4px'}}>{activeLearner.fullName}</h2>
                        <p>{activeLearner.profession} &nbsp;·&nbsp; {activeLearner.city}, {activeLearner.state}</p>
                        <div style={{marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                          <span style={{background: 'rgba(255,255,255,.15)', borderRadius: '99px', padding: '3px 12px', fontSize: '0.75rem', fontWeight: 700}}>
                            {activeLearner.stage}
                          </span>
                          <span style={{background: 'rgba(255,255,255,.15)', borderRadius: '99px', padding: '3px 12px', fontSize: '0.75rem', fontWeight: 700}}>
                            {activeLearner.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enrollment Summary Card */}
                  <div className="profile-enroll-card">
                    <div className="profile-enroll-badge">
                      <Award size={26} />
                    </div>
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: 700, fontSize: '0.95rem', marginBottom: '2px'}}>ABB Certification Programme</div>
                      <div style={{fontSize: '0.82rem', color: 'var(--text-muted)'}}>Enrolled · {completedPercentage}% complete · {activeLearner.completedLessons.length}/{totalLessons} lessons done</div>
                    </div>
                    {activeLearner.stage === 'Certified' && (
                      <div style={{textAlign: 'right', flexShrink: 0}}>
                        <div style={{fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600}}>ABB Credential ID</div>
                        <div style={{fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem'}}>
                          {settings.certIdFormat.replace('YYYY','2026').replace('NNNN','1049')}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Personal Information */}
                  <div className="profile-section-card">
                    <div className="profile-section-header">
                      <Users size={16} style={{color: 'var(--primary)'}} />
                      <h4>Personal Information</h4>
                    </div>
                    <div className="profile-section-body">
                      <div className="profile-info-grid">
                        <div className="form-group" style={{marginBottom: 0}}>
                          <label className="form-label">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={activeLearner.fullName}
                            onChange={(e) => {
                              if (activeLearner.stage === 'Certified') {
                                alert('Name changes after certification require admin approval.');
                                return;
                              }
                              setLearners([{ ...activeLearner, fullName: e.target.value }]);
                            }}
                          />
                          {activeLearner.stage === 'Certified' && (
                            <div style={{fontSize: '0.75rem', color: 'var(--warning)', marginTop: '5px'}}>⚠ Name locked post-certification. Contact admin to change.</div>
                          )}
                        </div>
                        <div className="form-group" style={{marginBottom: 0}}>
                          <label className="form-label">Email Address</label>
                          <input type="email" className="form-control" value={activeLearner.email} readOnly style={{background: '#f8fafc', color: 'var(--text-muted)'}} />
                          <div style={{fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '5px'}}>Email cannot be changed. Contact support.</div>
                        </div>
                        <div className="form-group" style={{marginBottom: 0}}>
                          <label className="form-label">Mobile Number</label>
                          <input type="tel" className="form-control" value={activeLearner.mobile} onChange={e => setLearners([{ ...activeLearner, mobile: e.target.value }])} />
                        </div>
                        <div className="form-group" style={{marginBottom: 0}}>
                          <label className="form-label">City</label>
                          <input type="text" className="form-control" value={activeLearner.city} onChange={e => setLearners([{ ...activeLearner, city: e.target.value }])} />
                        </div>
                        <div className="form-group" style={{marginBottom: 0}}>
                          <label className="form-label">State</label>
                          <input type="text" className="form-control" value={activeLearner.state} onChange={e => setLearners([{ ...activeLearner, state: e.target.value }])} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="profile-section-card">
                    <div className="profile-section-header">
                      <FileText size={16} style={{color: 'var(--primary)'}} />
                      <h4>Professional Information</h4>
                    </div>
                    <div className="profile-section-body">
                      <div className="profile-info-grid">
                        <div className="form-group" style={{marginBottom: 0}}>
                          <label className="form-label">Profession / Job Title</label>
                          <input type="text" className="form-control" value={activeLearner.profession} onChange={e => setLearners([{ ...activeLearner, profession: e.target.value }])} />
                        </div>
                        <div className="form-group" style={{marginBottom: 0}}>
                          <label className="form-label">LinkedIn Profile URL</label>
                          <input type="url" className="form-control" placeholder="https://linkedin.com/in/yourprofile" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billing Information */}
                  <div className="profile-section-card">
                    <div className="profile-section-header">
                      <CreditCard size={16} style={{color: 'var(--primary)'}} />
                      <h4>Billing Information</h4>
                    </div>
                    <div className="profile-section-body">
                      <div className="form-group">
                        <label className="form-label">Billing Address</label>
                        <textarea className="form-control" rows="2" value={activeLearner.billingAddress} onChange={e => setLearners([{ ...activeLearner, billingAddress: e.target.value }])} />
                      </div>
                      <div className="form-group" style={{marginBottom: 0}}>
                        <label className="form-label">GSTIN (Optional — for corporate invoices)</label>
                        <input type="text" className="form-control" placeholder="e.g. 29AAAAA1111A1Z1" value={activeLearner.gstNumber} onChange={e => setLearners([{ ...activeLearner, gstNumber: e.target.value }])} />
                      </div>
                    </div>
                  </div>

                  {/* Save Button + Toast */}
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        logAction('Updated profile information', 'Learner');
                        setProfileSaved(true);
                        setTimeout(() => setProfileSaved(false), 3000);
                      }}
                      style={{padding: '11px 28px'}}
                    >
                      <Check size={16} /> Save Changes
                    </button>
                    {profileSaved && <div className="save-toast"><CheckCircle size={16} /> Profile updated successfully!</div>}
                  </div>

                  {/* Danger Zone */}
                  <div className="danger-zone-card">
                    <div>
                      <div style={{fontWeight: 700, color: '#991b1b', marginBottom: '4px'}}>⚠ Deactivate Account</div>
                      <div style={{fontSize: '0.85rem', color: '#7f1d1d'}}>This will suspend your access to all course materials. Your certificate data is preserved.</div>
                    </div>
                    <button className="btn btn-secondary" disabled style={{borderColor: '#fca5a5', color: '#dc2626', opacity: 0.5, cursor: 'not-allowed'}}>
                      Request Deactivation
                    </button>
                  </div>
                  </>}

                  {dashTab === 'exam' && <>

                  {/* ══ PHASE 0: EXAM ENTRY GATE ══ */}
                  {!examLobby && !examState.started && !examState.completed && (
                    <div className="exam-lobby-gate">
                      <div style={{fontSize: '4rem', marginBottom: '12px'}}>🎓</div>
                      <h2 style={{margin: '0 0 8px', fontSize: '1.75rem', fontWeight: 800}}>ABB Final Certification Exam</h2>
                      <p style={{color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 28px', maxWidth: '480px', lineHeight: 1.7}}>
                        You are about to enter the proctored final exam. After clicking <strong>Enter Exam Room</strong>, a 2-minute preparation window begins — read all instructions carefully before starting.
                      </p>
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px', width: '100%', maxWidth: '420px'}}>
                        {[
                          { icon: '📝', label: 'Questions', value: questionBank.length },
                          { icon: '⏱', label: 'Time Limit', value: '5 mins' },
                          { icon: '🎯', label: 'Pass Score', value: '≥80%' },
                        ].map(s => (
                          <div key={s.label} className="exam-stat-chip">
                            <div style={{fontSize: '1.8rem', marginBottom: '4px'}}>{s.icon}</div>
                            <div style={{fontWeight: 800, fontSize: '1.3rem', color: 'var(--primary)'}}>{s.value}</div>
                            <div style={{fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginTop: '2px'}}>{s.label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px', textAlign: 'center'}}>
                        Free attempts remaining: <strong style={{color: examState.freeAttemptsUsed < 2 ? 'var(--success)' : 'var(--danger)'}}>{Math.max(0, 2 - examState.freeAttemptsUsed)}</strong> of 2
                        {examState.freeAttemptsUsed >= 2 && <span style={{color: 'var(--accent)', fontWeight: 700}}> · Paid reattempt required (₹590)</span>}
                      </div>
                      <button
                        className="btn btn-primary"
                        style={{padding: '13px 48px', fontSize: '1rem', width: '100%', maxWidth: '360px'}}
                        onClick={() => {
                          setExamLobby('lobby');
                          setLobbyCountdown(120);
                          setExamStartedAt(new Date());
                          logAction('Entered Final Exam lobby', 'Learner');
                        }}
                      >
                        Enter Exam Room →
                      </button>
                    </div>
                  )}

                  {/* ══ PHASE 1: LOBBY — 2-min countdown + instructions ══ */}
                  {examLobby === 'lobby' && !examState.started && (
                    <div className="exam-lobby-card">
                      {/* Header with countdown */}
                      <div className="exam-lobby-header">
                        <div style={{flex: 1}}>
                          <div style={{fontSize: '0.75rem', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '4px'}}>Final Exam</div>
                          <div style={{fontWeight: 800, fontSize: '1.25rem', color: '#fff', marginBottom: '4px'}}>Exam Started</div>
                          <div style={{fontSize: '0.82rem', color: 'rgba(255,255,255,.6)'}}>
                            Started at: <strong style={{color: '#fbbf24'}}>{examStartedAt ? examStartedAt.toLocaleTimeString() : '—'}</strong>
                          </div>
                          <div style={{marginTop: '10px', fontSize: '0.82rem', color: 'rgba(255,255,255,.5)'}}>
                            {lobbyCountdown > 0
                              ? 'Read the instructions below carefully. Exam starts when the countdown reaches zero.'
                              : '✅ Preparation time is over. You may now start your exam.'}
                          </div>
                        </div>
                        {/* SVG circular countdown */}
                        <div style={{flexShrink: 0}}>
                          <svg viewBox="0 0 100 100" width="100" height="100">
                            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="7" />
                            <circle cx="50" cy="50" r="44" fill="none"
                              stroke={lobbyCountdown === 0 ? '#34d399' : lobbyCountdown < 30 ? '#f87171' : '#fbbf24'}
                              strokeWidth="7"
                              strokeDasharray="276"
                              strokeDashoffset={276 - (lobbyCountdown / 120) * 276}
                              strokeLinecap="round"
                              transform="rotate(-90 50 50)"
                              style={{transition: 'stroke-dashoffset 1s linear, stroke .4s'}}
                            />
                            <text x="50" y="45" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800" fontFamily="monospace">
                              {Math.floor(lobbyCountdown / 60)}:{(lobbyCountdown % 60).toString().padStart(2, '0')}
                            </text>
                            <text x="50" y="62" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="9" fontWeight="600">
                              {lobbyCountdown === 0 ? 'READY!' : 'PREP TIME'}
                            </text>
                          </svg>
                        </div>
                      </div>

                      {/* Instruction grid */}
                      <div style={{padding: '20px 24px'}}>
                        <div style={{fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '14px'}}>Exam Instructions</div>
                        <div className="exam-instructions-grid">
                          {[
                            { num: '01', title: 'Exam Duration', desc: 'You have 5 minutes to complete all questions. The exam auto-submits when time runs out.' },
                            { num: '02', title: 'Question Types', desc: 'Includes MCQ (single answer), True/False, and Multi-Select (multiple correct answers) questions.' },
                            { num: '03', title: 'Passing Threshold', desc: 'Score 80% or above to pass the assessment and qualify for your ABB Certificate.' },
                            { num: '04', title: 'Reattempts Policy', desc: 'You get 2 free reattempts included with enrolment. Additional attempts cost ₹590 (₹500 + 18% GST).' },
                            { num: '05', title: 'Browser Activity', desc: 'Do not switch tabs or close the window during the exam. All activity is logged for compliance review.' },
                            { num: '06', title: 'Certificate Issuance', desc: 'On passing, your ABB Certificate is auto-generated with a unique ABB ID for third-party credential verification.' },
                          ].map(item => (
                            <div key={item.num} className="exam-instruction-item">
                              <div className="exam-instr-num">{item.num}</div>
                              <div>
                                <div className="exam-instr-title">{item.title}</div>
                                <div className="exam-instr-desc">{item.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Attempt tracker */}
                        <div className="exam-attempt-status">
                          <div style={{display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap'}}>
                            <span style={{fontWeight: 700, fontSize: '0.875rem'}}>Attempt Tracker</span>
                            <div style={{display: 'flex', gap: '6px'}}>
                              {[0, 1].map(i => (
                                <div key={i} style={{
                                  width: '30px', height: '30px', borderRadius: '50%',
                                  background: i < examState.freeAttemptsUsed ? '#fee2e2' : '#f0fdf4',
                                  border: `2px solid ${i < examState.freeAttemptsUsed ? '#ef4444' : '#10b981'}`,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontSize: '0.75rem', fontWeight: 800,
                                  color: i < examState.freeAttemptsUsed ? '#ef4444' : '#10b981'
                                }}>
                                  {i < examState.freeAttemptsUsed ? '✗' : (i + 1)}
                                </div>
                              ))}
                            </div>
                            <span style={{fontSize: '0.78rem', color: 'var(--text-muted)'}}>
                              {2 - examState.freeAttemptsUsed > 0
                                ? `${2 - examState.freeAttemptsUsed} free attempt${2 - examState.freeAttemptsUsed !== 1 ? 's' : ''} remaining after this`
                                : 'This is your last free attempt'}
                            </span>
                          </div>
                        </div>

                        {/* Start button */}
                        <button
                          className="btn btn-primary"
                          style={{
                            width: '100%', padding: '14px', fontSize: '1.05rem', fontWeight: 800,
                            marginTop: '4px',
                            background: lobbyCountdown > 0 ? '#94a3b8' : 'var(--primary)',
                            cursor: lobbyCountdown > 0 ? 'not-allowed' : 'pointer',
                            transition: 'background .5s'
                          }}
                          disabled={lobbyCountdown > 0}
                          onClick={() => {
                            setExamLobby('exam');
                            setExamState(prev => ({
                              ...prev,
                              started: true,
                              completed: false,
                              answers: {},
                              timeLeft: 300,
                              attempts: prev.attempts + 1,
                              score: 0,
                              passed: false
                            }));
                            logAction('Started Final Exam', 'Learner');
                          }}
                        >
                          {lobbyCountdown > 0
                            ? `⏳ Start Exam available in ${lobbyCountdown}s`
                            : '🚀 Start Final Exam Now'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ══ PHASE 2: ACTIVE EXAM ══ */}
                  {examLobby === 'exam' && examState.started && !examState.completed && (
                    <div className="checkout-card" style={{borderColor: examState.timeLeft < 60 ? 'var(--danger)' : '#fcd34d'}}>
                      <div className="exam-header">
                        <div>
                          <h3 style={{margin: 0, color: '#92400e'}}>Final Exam in Progress</h3>
                          <span style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Attempt #{examState.attempts} · Answer all questions before submitting</span>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '8px 16px', borderRadius: '4px', border: `1px solid ${examState.timeLeft < 60 ? '#fca5a5' : '#fde68a'}`}}>
                          <Clock size={18} style={{color: examState.timeLeft < 60 ? 'var(--danger)' : '#d97706'}} />
                          <strong style={{fontSize: '1.2rem', fontFamily: 'monospace', color: examState.timeLeft < 60 ? 'var(--danger)' : '#92400e'}}>
                            {Math.floor(examState.timeLeft / 60)}:{(examState.timeLeft % 60).toString().padStart(2, '0')}
                          </strong>
                          {examState.timeLeft < 60 && <span style={{fontSize: '0.72rem', color: 'var(--danger)', fontWeight: 800}}>HURRY!</span>}
                        </div>
                      </div>

                      {questionBank.map((q, idx) => (
                        <div key={q.id} className="exam-question-card">
                          <div style={{display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap'}}>
                            <span className="badge badge-info">Q{idx + 1}</span>
                            <span className="badge badge-warning">{q.type}</span>
                            <span className={`badge ${q.difficulty === 'Easy' ? 'badge-success' : q.difficulty === 'Hard' ? 'badge-danger' : 'badge-warning'}`}>{q.difficulty}</span>
                          </div>
                          <p style={{fontWeight: 700, marginBottom: '12px', fontSize: '0.95rem', lineHeight: 1.55}}>{q.question}</p>
                          {q.options.map((opt, optIdx) => {
                            const selectedArray = examState.answers[q.id] || [];
                            const isSelected = selectedArray.includes(optIdx);
                            return (
                              <div key={optIdx} className={`option-item ${isSelected ? 'selected' : ''}`}
                                onClick={() => {
                                  let newSel = q.type === "Multi-Select"
                                    ? (isSelected ? selectedArray.filter(v => v !== optIdx) : [...selectedArray, optIdx])
                                    : [optIdx];
                                  setExamState(prev => ({ ...prev, answers: { ...prev.answers, [q.id]: newSel } }));
                                }}>
                                <input type={q.type === "Multi-Select" ? "checkbox" : "radio"} checked={isSelected} onChange={() => {}} />
                                <span style={{marginLeft: '10px'}}>{opt}</span>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                      <button className="btn btn-primary" onClick={() => submitExam()} style={{width: '100%', padding: '13px', fontSize: '1rem'}}>
                        Submit Assessment
                      </button>
                    </div>
                  )}

                  {/* ══ EXAM RESULTS ══ */}
                  {examState.completed && (
                    <div className="checkout-card" style={{borderColor: examState.passed ? 'var(--success)' : 'var(--danger)'}}>
                      <div style={{display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap'}}>
                        <div style={{
                          width: '90px', height: '90px', borderRadius: '50%', flexShrink: 0,
                          background: examState.passed ? 'linear-gradient(135deg,#d1fae5,#a7f3d0)' : 'linear-gradient(135deg,#fee2e2,#fca5a5)',
                          color: examState.passed ? 'var(--success)' : 'var(--danger)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1.6rem', fontWeight: 800,
                          border: `3px solid ${examState.passed ? '#10b981' : '#ef4444'}`
                        }}>
                          {examState.score}%
                        </div>
                        <div style={{flex: 1}}>
                          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap'}}>
                            <h3 style={{margin: 0}}>{examState.passed ? '🎉 Passed!' : '❌ Attempt Failed'}</h3>
                            <span className={`badge ${examState.passed ? 'badge-success' : 'badge-danger'}`}>{examState.passed ? 'PASS' : 'FAIL'}</span>
                            <span className="badge badge-info">Attempt #{examState.attempts}</span>
                          </div>
                          <p className="text-muted" style={{fontSize: '0.9rem', margin: 0}}>
                            {examState.passed
                              ? 'Excellent! You have met the 80% certification threshold. Complete the declaration below.'
                              : 'Minimum passing score is 80%. Review your materials and reattempt.'}
                          </p>
                        </div>
                      </div>

                      {settings.revealAnswers && (
                        <div style={{background: '#f8fafc', padding: '16px', borderRadius: 'var(--r-sm)', marginBottom: '20px', border: '1px solid var(--border)'}}>
                          <h5 style={{margin: '0 0 12px', fontWeight: 700}}>Answer Review</h5>
                          {questionBank.map((q, idx) => (
                            <div key={q.id} style={{fontSize: '0.85rem', marginBottom: '10px', paddingBottom: '10px', borderBottom: idx < questionBank.length - 1 ? '1px solid var(--border)' : 'none'}}>
                              <strong>Q{idx + 1}:</strong> {q.question}<br />
                              <span style={{color: 'var(--success)'}}>✓ Correct: {q.correct.map(i => q.options[i]).join(', ')}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {examState.passed ? (
                        <div style={{background: '#f0fdf4', padding: '20px', borderRadius: 'var(--r-sm)', border: '1px solid #10b981', marginBottom: '16px'}}>
                          <h4 style={{margin: '0 0 8px', color: '#065f46'}}>Declaration & Code of Conduct</h4>
                          <p style={{fontSize: '0.875rem', color: '#047857', margin: '0 0 14px'}}>
                            By checking the box, you accept the official YBB Code of Conduct & Professional Obligations as an Authorised Business Broker.
                          </p>
                          <label style={{display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer', fontWeight: 600}}>
                            <input type="checkbox" checked={activeLearner.stage === "Certified"} style={{marginTop: '3px', width: '16px', height: '16px', accentColor: '#10b981'}}
                              onChange={(e) => {
                                setLearners(prev => prev.map(l => l.id === activeLearner.id ? { ...l, stage: e.target.checked ? "Certified" : "Enrolled" } : l));
                                logAction("Accepted Code of Conduct", "Learner");
                              }} />
                            <span>I accept the YBB Code of Conduct & final declaration.</span>
                          </label>
                        </div>
                      ) : (
                        <div className="reattempt-section">
                          <div style={{fontWeight: 700, fontSize: '0.9rem', marginBottom: '12px'}}>Reattempt Policy</div>
                          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px'}}>
                            {[0, 1].map(i => (
                              <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 14px',
                                borderRadius: 'var(--r-sm)', fontSize: '0.82rem', fontWeight: 600,
                                background: i < examState.freeAttemptsUsed ? '#fee2e2' : '#f0fdf4',
                                border: `1px solid ${i < examState.freeAttemptsUsed ? '#fca5a5' : '#bbf7d0'}`,
                                color: i < examState.freeAttemptsUsed ? '#991b1b' : '#065f46'
                              }}>
                                {i < examState.freeAttemptsUsed ? '✗' : '✓'} Free Attempt #{i + 1} — {i < examState.freeAttemptsUsed ? 'Used' : 'Available'}
                              </div>
                            ))}
                            <div style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 14px', borderRadius: 'var(--r-sm)', fontSize: '0.82rem', fontWeight: 600, background: '#fff7ed', border: '1px solid #fed7aa', color: '#92400e'}}>
                              💳 Paid Attempt — ₹590 (₹500 + GST)
                            </div>
                          </div>

                          {examState.freeAttemptsUsed < 2 ? (
                            <button className="btn btn-secondary" style={{padding: '11px 28px'}}
                              onClick={() => {
                                setExamState(prev => ({ ...prev, started: false, completed: false }));
                                setExamLobby(null);
                                logAction('Free reattempt initiated', 'Learner');
                              }}>
                              <RefreshCw size={15} /> Reattempt Exam Free ({2 - examState.freeAttemptsUsed} left)
                            </button>
                          ) : (
                            <div>
                              <div style={{background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 'var(--r-sm)', padding: '14px 18px', marginBottom: '14px', fontSize: '0.875rem'}}>
                                <strong>⚠ Free attempts exhausted.</strong> Both free reattempts have been used. Pay ₹590 to unlock another attempt.
                              </div>
                              {!examReattemptPaid ? (
                                <button className="btn btn-accent" style={{padding: '11px 28px'}}
                                  onClick={() => {
                                    if (window.confirm('Proceed to pay ₹590 for a paid reattempt?')) {
                                      setExamReattemptPaid(true);
                                      const orderNo = 'ORD-RA-' + Math.floor(100000 + Math.random() * 900000);
                                      setOrders(prev => [{
                                        id: orderNo, learnerName: activeLearner.fullName,
                                        amount: 590, status: 'Success',
                                        invoiceNo: 'YBB-INV-RA-' + Math.floor(1000 + Math.random() * 9000),
                                        date: new Date().toLocaleDateString(), type: 'Exam Reattempt', discountCode: 'None'
                                      }, ...prev]);
                                      logAction('Paid ₹590 for exam reattempt. Order: ' + orderNo, 'Learner');
                                      alert('Payment of ₹590 successful! You may now reattempt the exam.');
                                    }
                                  }}>
                                  <CreditCard size={15} /> Pay ₹590 & Unlock Reattempt
                                </button>
                              ) : (
                                <button className="btn btn-primary" style={{padding: '11px 28px'}}
                                  onClick={() => {
                                    setExamState(prev => ({ ...prev, started: false, completed: false }));
                                    setExamLobby(null);
                                    setExamReattemptPaid(false);
                                    logAction('Started paid exam reattempt', 'Learner');
                                  }}>
                                  <RefreshCw size={15} /> Start Paid Reattempt
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {activeLearner.stage === "Certified" && (
                        <div className="certificate-preview-container" style={{marginTop: '24px'}}>
                          <div className="certificate-title">Authorised Business Broker</div>
                          <div className="certificate-subtitle">This certifies that</div>
                          <div className="certificate-name">{activeLearner.fullName}</div>
                          <p style={{fontFamily: 'sans-serif', color: 'var(--text-muted)', fontSize: '0.9rem'}}>Has successfully completed the comprehensive training program, practical exercises, and passed the certification examination.</p>
                          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '40px', fontFamily: 'sans-serif', fontSize: '0.8rem'}}>
                            <div>
                              <strong>ABB ID:</strong> {settings.certIdFormat.replace("YYYY","2026").replace("NNNN","1049")}<br />
                              <strong>Date:</strong> {new Date().toLocaleDateString()}<br />
                              <strong>Signatory:</strong> {settings.signatoryName}
                            </div>
                            <div style={{textAlign: 'right'}}>
                              <span style={{color: 'var(--success)', fontWeight: 600}}>VERIFIED CERTIFICATE</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  </>}

                  {dashTab === 'my-learning' && <>


                  {/* Course Player Container */}
                  <div className="course-player-container">
                    <div className="video-section">
                      <div className="video-placeholder">
                        <div className="play-overlay">
                          <Play size={48} style={{color: 'white', marginBottom: '12px'}} />
                          <span>Stream Secure Video Lesson (HLS/DRM Enforced)</span>
                          <span style={{fontSize: '0.75rem', color: '#64748b'}}>Download disabled on player interface.</span>
                        </div>
                      </div>

                      <div style={{marginTop: '20px'}}>
                        <h3>
                          {(() => {
                            let found = "";
                            modules.forEach(m => {
                              const match = m.lessons.find(l => l.id === activeLessonId);
                              if (match) found = match.title;
                            });
                            return found || "1.1 Introduction";
                          })()}
                        </h3>
                        <div style={{display: 'flex', gap: '10px', margin: '10px 0'}}>
                          <button className="btn btn-secondary" onClick={() => setWatchPercentage(100)}>
                            Simulate Watch to 100%
                          </button>
                          <button 
                            className="btn btn-primary" 
                            onClick={() => markLessonComplete(activeLessonId)}
                            disabled={activeLearner.completedLessons.includes(activeLessonId) || watchPercentage < 100}
                          >
                            {activeLearner.completedLessons.includes(activeLessonId) ? "Completed" : "Complete Lesson"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="modules-list">
                      {modules.map((mod) => (
                        <div key={mod.id}>
                          <div className="module-header">{mod.title}</div>
                          {mod.lessons.map((les) => {
                            const locked = isLessonLocked(les.id);
                            return (
                              <div 
                                key={les.id}
                                className={`lesson-item ${activeLessonId === les.id ? 'active' : ''} ${locked ? 'locked' : ''}`}
                                onClick={() => !locked && setActiveLessonId(les.id)}
                              >
                                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                  {activeLearner.completedLessons.includes(les.id) ? (
                                    <CheckCircle size={16} style={{color: 'var(--success)'}} />
                                  ) : locked ? (
                                    <Lock size={14} />
                                  ) : (
                                    <Play size={14} />
                                  )}
                                  <span>{les.title}</span>
                                </div>
                                <span style={{fontSize: '0.75rem'}}>{les.duration}</span>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                  </>}
                  {dashTab === 'assignments' && <>

                  {/* === ASSIGNMENTS TAB === */}
                  {/* Header Banner */}
                  <div className="tab-page-header" style={{position: 'relative', zIndex: 1}}>
                    <div style={{position: 'relative', zIndex: 1}}>
                      <h2>📋 Case Study Assignments</h2>
                      <p>Submit your practical deal exercises for reviewer evaluation. All {assignmentTasks.length} assignments must be approved before the exam unlocks.</p>
                    </div>
                    <div className="tab-header-stats" style={{flexShrink: 0}}>
                      {[
                        { value: assignments.filter(a => a.status === 'Approved').length, label: 'Approved' },
                        { value: assignments.filter(a => a.status === 'Under Review').length, label: 'In Review' },
                        { value: assignmentTasks.length, label: 'Required' },
                      ].map(s => (
                        <div key={s.label} className="tab-header-stat">
                          <div className="tab-header-stat-value">{s.value}</div>
                          <div className="tab-header-stat-label">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assignment Cards */}
                  <div style={{display: 'flex', flexDirection: 'column', gap: '14px'}}>
                    {assignmentTasks.map((task) => {
                      const existing = assignments.find(a => a.id === task.id);
                      const status = existing?.status || 'Not Submitted';
                      const accentClass = status === 'Approved' ? 'approved' : status === 'Under Review' ? 'review' : status === 'Resubmission Required' ? 'rejected' : 'pending';
                      return (
                        <div key={task.id} className="assignment-card">
                          <div className={`assignment-card-accent ${accentClass}`} />
                          <div className="assignment-card-body">
                            <div className="assignment-card-header">
                              <div>
                                <div style={{fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '3px'}}>
                                  Assignment {task.num}
                                </div>
                                <h4 className="assignment-card-title">{task.title}</h4>
                              </div>
                              <span className={`badge ${
                                status === 'Approved' ? 'badge-success' :
                                status === 'Under Review' ? 'badge-info' :
                                status === 'Resubmission Required' ? 'badge-danger' :
                                'badge-warning'
                              }`} style={{flexShrink: 0}}>
                                {status === 'Not Submitted' ? 'Pending' : status}
                              </span>
                            </div>

                            <p className="assignment-card-meta">📚 {task.ref} &nbsp;·&nbsp; ⏱ {task.dueNote}</p>
                            <p style={{fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '16px'}}>{task.desc}</p>

                            {/* Status flow steps */}
                            <div className="assignment-steps">
                              <span className={`assignment-step ${existing ? 'done' : 'active'}`}>
                                {existing ? '✓' : '○'} Submit File
                              </span>
                              <div className="assignment-step-arrow" />
                              <span className={`assignment-step ${status === 'Under Review' ? 'active' : status === 'Approved' || status === 'Resubmission Required' ? 'done' : ''}`}>
                                {status === 'Approved' || status === 'Resubmission Required' ? '✓' : '○'} Under Review
                              </span>
                              <div className="assignment-step-arrow" />
                              <span className={`assignment-step ${status === 'Approved' ? 'done' : ''}`}>
                                {status === 'Approved' ? '✓' : '○'} Approved
                              </span>
                            </div>

                            {/* Feedback block */}
                            {existing?.feedback && (
                              <div className="assignment-feedback">
                                <strong>💬 Reviewer Feedback</strong>
                                {existing.feedback}
                              </div>
                            )}

                            {/* Submitted file/image preview */}
                            {existing?.fileName && (
                              <div style={{marginTop: '12px', padding: '10px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '12px'}}>
                                {existing.fileData ? (
                                  existing.fileType?.startsWith('image/') ? (
                                    <a href={existing.fileData} target="_blank" rel="noopener noreferrer" title="View full image">
                                      <img src={existing.fileData} style={{width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #cbd5e1', cursor: 'zoom-in'}} alt="Preview" />
                                    </a>
                                  ) : (
                                    <a href={existing.fileData} download={existing.fileName} title="Download file" style={{width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}>
                                      <FileText size={20} />
                                    </a>
                                  )
                                ) : (
                                  <div style={{width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}>
                                    <FileText size={20} />
                                  </div>
                                )}
                                <div style={{flex: 1, minWidth: 0}}>
                                  <div style={{fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{existing.fileName}</div>
                                  <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>{existing.fileSize || 'Size: ~1.2 MB'} · Submitted on {existing.submittedDate}</div>
                                </div>
                              </div>
                            )}

                            {/* Upload row — only if not yet approved */}
                            {status !== 'Approved' && (
                              <div style={{marginTop: '16px'}}>
                                <div 
                                  style={{
                                    border: '2px dashed #cbd5e1',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    textAlign: 'center',
                                    background: '#f8fafc',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    position: 'relative'
                                  }}
                                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                                  onMouseOut={e => e.currentTarget.style.borderColor = '#cbd5e1'}
                                  onClick={() => document.getElementById(`file-input-${task.id}`).click()}
                                >
                                  <input
                                    id={`file-input-${task.id}`}
                                    type="file"
                                    accept="image/*,application/pdf,.xlsx,.xls,.docx,.doc"
                                    style={{display: 'none'}}
                                    onChange={(e) => {
                                      const file = e.target.files[0];
                                      if (!file) return;
                                      
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        setUploadVals(prev => ({
                                          ...prev,
                                          [task.id]: {
                                            name: file.name,
                                            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                                            type: file.type,
                                            data: event.target.result
                                          }
                                        }));
                                      };
                                      reader.readAsDataURL(file);
                                    }}
                                  />
                                  
                                  {uploadVals[task.id]?.name ? (
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
                                      {uploadVals[task.id].type?.startsWith('image/') ? (
                                        <img src={uploadVals[task.id].data} style={{maxHeight: '100px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}} alt="Upload preview" />
                                      ) : (
                                        <FileText size={32} style={{color: 'var(--primary)'}} />
                                      )}
                                      <div style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)'}}>{uploadVals[task.id].name}</div>
                                      <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>{uploadVals[task.id].size} · Ready to submit</div>
                                      <span style={{fontSize: '0.75rem', color: 'var(--primary)', textDecoration: 'underline'}}>Click to change file</span>
                                    </div>
                                  ) : (
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
                                      <Upload size={24} style={{color: '#64748b'}} />
                                      <div style={{fontSize: '0.85rem', fontWeight: 600, color: '#334155'}}>Click to upload file or image</div>
                                      <div style={{fontSize: '0.72rem', color: '#64748b'}}>Support PDF, Excel, Word, or Images up to 10MB</div>
                                    </div>
                                  )}
                                </div>
                                
                                {uploadVals[task.id]?.name && (
                                  <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px'}}>
                                    <button 
                                      className="btn btn-secondary" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setUploadVals(prev => ({ ...prev, [task.id]: null }));
                                      }}
                                      style={{padding: '8px 16px', fontSize: '0.85rem'}}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const fileInfo = uploadVals[task.id];
                                        if (!fileInfo) return;
                                        setAssignments(prev => {
                                          const filtered = prev.filter(a => a.id !== task.id);
                                          return [...filtered, {
                                            id: task.id,
                                            learnerName: activeLearner.fullName,
                                            title: task.title,
                                            status: 'Under Review',
                                            submittedDate: new Date().toLocaleDateString(),
                                            feedback: 'Awaiting review grading by Content Reviewer.',
                                            fileName: fileInfo.name,
                                            fileSize: fileInfo.size,
                                            fileType: fileInfo.type,
                                            fileData: fileInfo.data,
                                            attempts: (existing?.attempts || 0) + 1
                                          }];
                                        });
                                        setUploadVals(prev => ({ ...prev, [task.id]: null }));
                                        logAction(`Submitted assignment: ${task.title}`, 'Learner');
                                      }}
                                      style={{padding: '8px 20px', fontSize: '0.85rem'}}
                                    >
                                      Submit Assignment
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Submission Guidelines */}
                  <div style={{background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--r)', padding: '20px 24px'}}>
                    <h4 style={{margin: '0 0 10px', fontWeight: 700, fontSize: '0.95rem', color: '#92400e'}}>📌 Submission Guidelines</h4>
                    <ul style={{margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#78350f', lineHeight: 1.8}}>
                      <li>Use only <strong>.xlsx, .pdf, or .docx</strong> formats. Maximum file size: 10 MB.</li>
                      <li>Name your files clearly: <code style={{background: '#fef9c3', padding: '1px 5px', borderRadius: '3px'}}>assignment_yourname_modX.ext</code></li>
                      <li>Reviewers typically respond within <strong>2–3 business days</strong>.</li>
                      <li>You may resubmit up to <strong>3 times</strong> per assignment if requested.</li>
                      <li>All 3 assignments must be <strong>Approved</strong> before the Final Exam unlocks.</li>
                    </ul>
                  </div>
                  </>}

                  {dashTab === 'my-learning' && <>


                  {/* Workbook & Dynamic Resources area */}
                  <div className="checkout-card" style={{marginTop: '24px'}}>
                    <h3>Workbook & Course Resources</h3>
                    <div className="table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Resource Title</th>
                            <th>Level</th>
                            <th>Version</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resources.map(res => (
                            <tr key={res.id}>
                              <td>
                                <strong>{res.title}</strong>
                                <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{res.description}</div>
                              </td>
                              <td>{res.level}</td>
                              <td>{res.version}</td>
                              <td>
                                {res.downloadAllowed ? (
                                   res.fileData ? (
                                     <a 
                                       href={res.fileData} 
                                       download={res.fileName || `${res.title}.pdf`}
                                       className="btn btn-secondary" 
                                       style={{padding: '4px 8px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none'}} 
                                       onClick={() => {
                                         setResources(prev => prev.map(r => r.id === res.id ? { ...r, downloadCount: r.downloadCount + 1 } : r));
                                       }}
                                     >
                                       <Download size={14} /> Download ({res.downloadCount})
                                     </a>
                                   ) : (
                                     <button className="btn btn-secondary" style={{padding: '4px 8px', fontSize: '0.8rem'}} onClick={() => {
                                       setResources(prev => prev.map(r => r.id === res.id ? { ...r, downloadCount: r.downloadCount + 1 } : r));
                                       alert(`Downloading ${res.title}`);
                                     }}>
                                       <Download size={14} /> Download ({res.downloadCount})
                                     </button>
                                   )
                                 ) : (
                                   <span className="badge badge-warning">Preview Only</span>
                                 )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  </>}

                  {/* Certificate Tab Panel */}
                  {dashTab === 'certificate' && (
                    <div className="checkout-card" style={{textAlign: 'center', padding: '40px 32px'}}>
                      {activeLearner.stage === "Certified" ? (
                        <div>
                          <div style={{color: 'var(--success)', marginBottom: '16px'}}>
                            <Award size={64} style={{filter: 'drop-shadow(0 4px 6px rgba(16,185,129,0.2))'}} />
                          </div>
                          <h2>Congratulations! Your Certificate is Active</h2>
                          <p className="text-muted" style={{maxWidth: '520px', margin: '8px auto 32px', fontSize: '0.95rem'}}>
                            You have successfully completed all curriculum requirements, submitted case studies, and passed the certification exam.
                          </p>

                          <div className="certificate-preview-container" style={{
                            border: '12px double var(--primary)',
                            padding: '48px 32px',
                            background: '#fff',
                            borderRadius: '4px',
                            maxWidth: '720px',
                            margin: '0 auto 28px',
                            boxShadow: 'var(--shadow-lg)',
                            position: 'relative',
                            textAlign: 'center'
                          }}>
                            {/* Gold Badge Overlay */}
                            <div style={{
                              position: 'absolute',
                              top: '24px',
                              right: '24px',
                              width: '72px',
                              height: '72px',
                              background: '#fef3c7',
                              border: '4px solid #f59e0b',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#d97706',
                              fontWeight: 800,
                              fontSize: '0.75rem',
                              textTransform: 'uppercase',
                              transform: 'rotate(-12deg)'
                            }}>
                              YBB Official
                            </div>

                            <div className="cert-gold-title" style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', fontWeight: 800, letterSpacing: '0.02em', marginBottom: '8px'}}>
                              AUTHORISED BUSINESS BROKER
                            </div>
                            <div style={{fontFamily: 'sans-serif', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: 700, marginBottom: '24px'}}>
                              Professional Credential
                            </div>
                            <div style={{fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '12px'}}>
                              This certifies that
                            </div>
                            <div style={{fontFamily: 'Georgia, serif', fontSize: '2.5rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #cbd5e1', display: 'inline-block', padding: '0 24px 8px', marginBottom: '24px'}}>
                              {activeLearner.fullName}
                            </div>
                            <p style={{fontFamily: 'sans-serif', color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 36px'}}>
                              has satisfied all academic and practical conditions of the syllabus and is hereby declared an Authorised Business Broker (ABB) under YBB standards and ethics.
                            </p>

                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '24px', textAlign: 'left', fontSize: '0.82rem', fontFamily: 'sans-serif'}}>
                              <div>
                                <div style={{color: 'var(--text-muted)'}}>Credential ID</div>
                                <strong style={{color: '#0f172a'}}>{settings.certIdFormat.replace("YYYY", "2026").replace("NNNN", "1049")}</strong>
                                <div style={{color: 'var(--text-muted)', marginTop: '8px'}}>Date of Issue</div>
                                <strong style={{color: '#0f172a'}}>{new Date().toLocaleDateString('en-IN')}</strong>
                              </div>
                              <div style={{textAlign: 'right'}}>
                                <div style={{color: 'var(--text-muted)'}}>Authorized Signatory</div>
                                <strong style={{color: '#0f172a'}}>{settings.signatoryName}</strong>
                                <div style={{color: 'var(--success)', fontWeight: 700, marginTop: '8px'}}>STATUS: VERIFIED</div>
                              </div>
                            </div>
                          </div>

                          <div className="cert-share-row">
                            <button className="cert-share-btn linkedin" onClick={() => alert('Opening LinkedIn share...')}>
                              🔗 Share on LinkedIn
                            </button>
                            <button className="cert-share-btn" onClick={() => window.print()}>
                              <Download size={15} /> Print / Save PDF
                            </button>
                            <button className="cert-share-btn" onClick={() => { navigator.clipboard?.writeText(window.location.origin + '/verify'); alert('Verification link copied!'); }}>
                              🔗 Copy Verify Link
                            </button>
                            <button className="cert-share-btn" onClick={() => navigate('verification')}>
                              🔍 Verify Publicly
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div style={{width: '72px', height: '72px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
                            <Lock size={32} />
                          </div>
                          <h3 style={{marginBottom: '8px'}}>Your Certificate is Locked</h3>
                          <p className="text-muted" style={{maxWidth: '480px', margin: '0 auto 32px', fontSize: '0.9rem', lineHeight: 1.65}}>
                            Complete the following requirements to unlock your Authorised Business Broker credential.
                          </p>

                          {/* Requirement Checklist */}
                          <div className="cert-checklist" style={{maxWidth: '580px', margin: '0 auto 32px'}}>
                            {[{
                              label: 'Complete all 10 video modules',
                              sub: `${activeLearner.completedLessons.length} of ${totalLessons} lessons completed`,
                              pct: completedPercentage,
                              done: completedPercentage === 100,
                            }, {
                              label: `Submit ${assignmentTasks.length} case study assignments`,
                              sub: `${assignments.filter(a => a.status === 'Approved').length} of ${assignmentTasks.length} assignments approved`,
                              pct: Math.round((assignments.filter(a => a.status === 'Approved').length / Math.max(1, assignmentTasks.length)) * 100),
                              done: assignments.filter(a => a.status === 'Approved').length >= assignmentTasks.length,
                            }, {
                              label: 'Pass the final MCQ exam (≥80%)',
                              sub: examState.completed ? `Last score: ${examState.score}%` : 'Exam not yet attempted',
                              pct: examState.passed ? 100 : 0,
                              done: examState.passed,
                            }, {
                              label: 'Accept YBB Code of Conduct',
                              sub: activeLearner.stage === 'Certified' ? 'Accepted ✓' : 'Required after exam pass',
                              pct: activeLearner.stage === 'Certified' ? 100 : 0,
                              done: activeLearner.stage === 'Certified',
                            }].map((req, i) => (
                              <div key={i} className={`cert-checklist-item ${req.done ? 'completed' : ''}`}>
                                <div className={`cert-checklist-icon ${req.done ? 'done' : req.pct > 0 ? 'pending' : 'locked'}`}>
                                  {req.done ? <CheckCircle size={16} /> : req.pct > 0 ? <Clock size={16} /> : <Lock size={14} />}
                                </div>
                                <div style={{flex: 1}}>
                                  <div className="cert-checklist-label">{req.label}</div>
                                  <div className="cert-checklist-sub">{req.sub}</div>
                                </div>
                                <div>
                                  <div className="cert-progress-bar-track">
                                    <div className="cert-progress-bar-fill" style={{width: `${req.pct}%`}} />
                                  </div>
                                  <div style={{fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '3px'}}>{req.pct}%</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <button className="btn btn-primary" onClick={() => setDashTab('my-learning')} style={{marginRight: '10px'}}>
                            Continue Learning
                          </button>
                          <button className="btn btn-secondary" onClick={() => setDashTab('assignments')}>
                            View Assignments
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Support Tab Panel */}
                  {dashTab === 'support' && (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>

                      {/* Header Banner */}
                      <div className="tab-page-header" style={{position: 'relative', zIndex: 1}}>
                        <div style={{position: 'relative', zIndex: 1}}>
                          <h2>🎧 Help & Support</h2>
                          <p>Our support team typically responds within 24–48 hours on business days.</p>
                        </div>
                        <div className="tab-header-stats" style={{flexShrink: 0}}>
                          {[
                            { value: tickets.filter(t => t.status === 'Open').length, label: 'Open' },
                            { value: tickets.filter(t => t.status !== 'Open').length, label: 'Resolved' },
                          ].map(s => (
                            <div key={s.label} className="tab-header-stat">
                              <div className="tab-header-stat-value">{s.value}</div>
                              <div className="tab-header-stat-label">{s.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact Option Cards */}
                      <div style={{display: 'flex', gap: '14px', flexWrap: 'wrap'}}>
                        {[
                          { icon: '📧', bg: '#eff6ff', title: 'Email Support', desc: 'support@yoovabb.com\nResponse within 48 hours', action: () => alert('Opening email client to support@yoovabb.com') },
                          { icon: '💬', bg: '#f0fdf4', title: 'WhatsApp Support', desc: '+91 98765 43210\nMon–Fri, 10am–6pm IST', action: () => alert('Opening WhatsApp chat...') },
                          { icon: '📚', bg: '#fffbeb', title: 'Knowledge Base', desc: 'Browse FAQs, guides\nand video tutorials', action: () => navigate('faq') },
                          { icon: '🏢', bg: '#fdf4ff', title: 'Schedule a Call', desc: 'Book a 15-min session\nwith our advisors', action: () => alert('Opening Calendly scheduler...') },
                        ].map(opt => (
                          <div key={opt.title} className="contact-option-card" onClick={opt.action}>
                            <div className="contact-option-icon" style={{background: opt.bg}}>{opt.icon}</div>
                            <h4>{opt.title}</h4>
                            <p style={{whiteSpace: 'pre-line'}}>{opt.desc}</p>
                          </div>
                        ))}
                      </div>

                      {/* Ticket Submission Form */}
                      <div className="profile-section-card">
                        <div className="profile-section-header">
                          <Mail size={16} style={{color: 'var(--primary)'}} />
                          <h4>Submit a Support Ticket</h4>
                        </div>
                        <div className="profile-section-body">
                          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                            <div className="form-group" style={{marginBottom: 0}}>
                              <label className="form-label">Subject</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. Valuation template formula issue"
                                value={newTicket.subject}
                                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{marginBottom: 0}}>
                              <label className="form-label">Category</label>
                              <select
                                className="form-control"
                                value={newTicket.category}
                                onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                              >
                                <option value="Technical">🔧 Technical (Video, player issues)</option>
                                <option value="Billing">💳 Billing & GST Invoicing</option>
                                <option value="Curriculum">📚 Curriculum & Content Questions</option>
                                <option value="Exam">📝 MCQ Exam & Attempts</option>
                                <option value="Certificate">🏆 Certificate & Credentials</option>
                                <option value="Assignment">📋 Assignment Submissions</option>
                              </select>
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="form-label">Detailed Message</label>
                            <textarea
                              className="form-control"
                              rows="4"
                              placeholder="Describe your issue in detail — what happened, what you expected, and any error messages you saw..."
                              value={newTicket.message}
                              onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                            />
                          </div>

                          <div style={{display: 'flex', alignItems: 'center', gap: '14px'}}>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                if (!newTicket.subject || !newTicket.message) {
                                  alert('Please fill in both Subject and Message fields.');
                                  return;
                                }
                                setTickets(prev => [
                                  ...prev,
                                  {
                                    id: 'TK-' + Math.floor(Math.random() * 1000 + 1000),
                                    subject: newTicket.subject,
                                    category: newTicket.category,
                                    priority: 'Medium',
                                    status: 'Open',
                                    message: newTicket.message,
                                    date: new Date().toISOString().split('T')[0]
                                  }
                                ]);
                                setNewTicket({ subject: '', category: 'Billing', message: '' });
                                logAction(`Opened support ticket: ${newTicket.subject}`, 'Learner');
                              }}
                            >
                              <Mail size={15} /> Submit Ticket
                            </button>
                            <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                              Expect a reply within 1–2 business days
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Ticket History — Card based */}
                      <div>
                        <h4 style={{margin: '0 0 14px', fontWeight: 700, fontSize: '1rem'}}>Your Tickets</h4>
                        {tickets.length === 0 ? (
                          <div style={{textAlign: 'center', padding: '32px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', color: 'var(--text-muted)'}}>
                            No tickets yet. Submit your first ticket above.
                          </div>
                        ) : (
                          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            {tickets.map(tk => (
                              <div key={tk.id} className="ticket-card">
                                <div className="ticket-card-header">
                                  <div>
                                    <span className="ticket-id">{tk.id}</span>
                                    <div style={{fontWeight: 600, marginTop: '6px', fontSize: '0.925rem'}}>{tk.subject}</div>
                                  </div>
                                  <span className={`badge ${tk.status === 'Open' ? 'badge-info' : tk.status === 'Resolved' ? 'badge-success' : 'badge-warning'}`}>
                                    {tk.status}
                                  </span>
                                </div>
                                <div className="ticket-card-meta">
                                  <span className="ticket-dot" style={{background: tk.status === 'Open' ? '#3b82f6' : '#10b981'}} />
                                  <span>{tk.category}</span>
                                  <span>·</span>
                                  <span>📅 {tk.date}</span>
                                  {tk.priority && <><span>·</span><span>Priority: {tk.priority}</span></>}
                                </div>
                                {tk.message && (
                                  <div className="ticket-message-preview">
                                    💬 {tk.message}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* FAQ Quick Links */}
                      <div className="profile-section-card">
                        <div className="profile-section-header">
                          <HelpCircle size={16} style={{color: 'var(--primary)'}} />
                          <h4>Common Questions</h4>
                        </div>
                        <div className="profile-section-body">
                          <div className="support-faq-links">
                            {[
                              { q: 'How do I reset my exam attempt?', icon: '📝' },
                              { q: 'How do I download my certificate?', icon: '🏆' },
                              { q: 'What file formats are accepted?', icon: '📋' },
                              { q: 'How long does assignment review take?', icon: '⏱' },
                              { q: 'Can I change my name on the certificate?', icon: '✏️' },
                              { q: 'How do I get a GST invoice?', icon: '💳' },
                            ].map(faq => (
                              <div key={faq.q} className="support-faq-link" onClick={() => navigate('faq')}>
                                <span>{faq.icon}</span>
                                <span>{faq.q}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </>}

              {/* REVIEWER VIEW */}
              {currentRole === "Reviewer" && (
                <div className="checkout-card">
                  <h2>Reviewer Submissions Pipeline</h2>
                  <div className="table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Learner</th>
                          <th>Assignment File</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                         {assignments.map((sub) => (
                           <tr key={sub.id}>
                             <td>{sub.learnerName}</td>
                             <td>
                               <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                 {sub.fileData ? (
                                   sub.fileType?.startsWith('image/') ? (
                                     <a href={sub.fileData} target="_blank" rel="noopener noreferrer" title="View full image">
                                       <img src={sub.fileData} style={{width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #cbd5e1', cursor: 'zoom-in'}} alt="Preview" />
                                     </a>
                                   ) : (
                                     <a href={sub.fileData} download={sub.fileName} title="Download file" style={{width: '36px', height: '36px', background: '#e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}>
                                       <FileText size={18} />
                                     </a>
                                   )
                                 ) : (
                                   <div style={{width: '36px', height: '36px', background: '#e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}>
                                     <FileText size={18} />
                                   </div>
                                 )}
                                 <div>
                                   <span style={{fontFamily: 'monospace', fontSize: '0.85rem'}}>{sub.fileName}</span>
                                   {sub.fileSize && <div style={{fontSize: '0.72rem', color: 'var(--text-muted)'}}>{sub.fileSize}</div>}
                                 </div>
                               </div>
                             </td>
                             <td>
                               <span className={`badge ${
                                 sub.status === 'Approved' ? 'badge-success' : 
                                 sub.status === 'Under Review' ? 'badge-info' : 'badge-danger'
                               }`}>{sub.status}</span>
                             </td>
                            <td>
                              <div style={{display: 'flex', gap: '8px'}}>
                                <button 
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    setAssignments(prev => prev.map(s => s.id === sub.id ? { ...s, status: "Approved", feedback: "Approved! Recast sheets meet professional guidelines." } : s));
                                    logAction(`Approved assignment ${sub.id}`, "Reviewer");
                                  }}
                                  style={{padding: '4px 8px', fontSize: '0.8rem'}}
                                >
                                  Approve
                                </button>
                                <button 
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    setAssignments(prev => prev.map(s => s.id === sub.id ? { ...s, status: "Resubmission Required", feedback: "Please fix working capital normalizations and resubmit." } : s));
                                    logAction(`Requested resubmission for ${sub.id}`, "Reviewer");
                                  }}
                                  style={{padding: '4px 8px', fontSize: '0.8rem', color: 'var(--warning)', borderColor: 'var(--warning)'}}
                                >
                                  Request Resubmission
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ADMIN VIEW — redirect to dedicated admin panel */}
              {["SuperAdmin", "ContentAdmin", "SupportAdmin"].includes(currentRole) && (
                <div className="checkout-card" style={{textAlign: 'center', padding: '48px 32px', border: '1px solid var(--primary)'}}>
                  <div style={{width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
                    <Shield size={28} style={{color: '#fbbf24'}} />
                  </div>
                  <h3 style={{marginBottom: '8px', fontSize: '1.4rem'}}>LMS Admin Console</h3>
                  <p className="text-muted" style={{marginBottom: '24px', fontSize: '0.9rem', maxWidth: '360px', margin: '0 auto 24px'}}>
                    The full admin panel is available with dedicated screens for learner management, orders, content, and settings.
                  </p>
                  <button className="btn btn-primary" onClick={() => navigate('admin')} style={{padding: '12px 32px', fontSize: '1rem'}}>
                    Open Admin Panel <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {/* --- SCREEN: ADMIN CONTROLS PANEL --- */}
        {currentScreen === "admin" && (
          <>
            {/* ── ADMIN LOGIN WALL ── */}
            {!adminAuth ? (
              <div className="admin-login-page">
                <div className="admin-login-card">
                  {/* Logo / Brand */}
                  <div className="admin-login-logo">
                    <div className="admin-login-icon-wrap">
                      <Shield size={28} style={{color: '#fbbf24'}} />
                    </div>
                    <div>
                      <div style={{fontWeight: 800, fontSize: '1rem', color: '#fff', lineHeight: 1}}>YBB Admin Console</div>
                      <div style={{fontSize: '0.7rem', color: '#64748b', marginTop: '3px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.07em'}}>Restricted Access</div>
                    </div>
                  </div>

                  <h2 style={{margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)'}}>Sign in to Admin Panel</h2>
                  <p style={{margin: '0 0 28px', fontSize: '0.875rem', color: 'var(--text-muted)'}}>Enter your admin Gmail and password to continue.</p>

                  {/* Demo hint */}
                  <div className="admin-login-demo-hint">
                    <div style={{fontWeight: 700, fontSize: '0.75rem', color: '#1d4ed8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <Shield size={13} /> Demo Credentials
                    </div>
                    {ADMIN_CREDENTIALS.map(cred => (
                      <div key={cred.email} className="admin-cred-row"
                        onClick={() => { setAdminLoginEmail(cred.email); setAdminLoginPassword(cred.password); setAdminLoginError(''); }}>
                        <img src={cred.avatar} alt="" style={{width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0}} />
                        <div style={{flex: 1, minWidth: 0}}>
                          <div style={{fontWeight: 700, fontSize: '0.78rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{cred.name}</div>
                          <div style={{fontSize: '0.7rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{cred.email}</div>
                        </div>
                        <span className="badge badge-info" style={{fontSize: '0.65rem', flexShrink: 0}}>{cred.role}</span>
                      </div>
                    ))}
                    <div style={{fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '6px'}}>Click any row to auto-fill credentials.</div>
                  </div>

                  {/* Login form */}
                  <form onSubmit={handleAdminLogin} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <div className="form-group" style={{marginBottom: 0}}>
                      <label className="form-label" htmlFor="admin-email">Admin Gmail / Email</label>
                      <div style={{position: 'relative'}}>
                        <Mail size={15} style={{position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none'}} />
                        <input
                          id="admin-email"
                          type="email"
                          className="form-control"
                          style={{paddingLeft: '38px'}}
                          placeholder="admin@ybb.in"
                          value={adminLoginEmail}
                          autoComplete="email"
                          onChange={e => { setAdminLoginEmail(e.target.value); setAdminLoginError(''); }}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{marginBottom: 0}}>
                      <label className="form-label" htmlFor="admin-password">Password</label>
                      <div style={{position: 'relative'}}>
                        <Shield size={15} style={{position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none'}} />
                        <input
                          id="admin-password"
                          type={adminShowPassword ? 'text' : 'password'}
                          className="form-control"
                          style={{paddingLeft: '38px', paddingRight: '44px'}}
                          placeholder="••••••••••••"
                          value={adminLoginPassword}
                          autoComplete="current-password"
                          onChange={e => { setAdminLoginPassword(e.target.value); setAdminLoginError(''); }}
                          required
                        />
                        <button type="button"
                          style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', display: 'flex'}}
                          onClick={() => setAdminShowPassword(p => !p)}>
                          <Eye size={15} />
                        </button>
                      </div>
                    </div>

                    {adminLoginError && (
                      <div className="admin-login-error">
                        <AlertCircle size={14} style={{flexShrink: 0}} /> {adminLoginError}
                      </div>
                    )}

                    <button type="submit" className="btn btn-primary"
                      style={{padding: '13px', fontSize: '1rem', fontWeight: 700, width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}
                      disabled={adminLoginLoading}>
                      {adminLoginLoading ? (
                        <><span className="admin-login-spinner" /> Verifying credentials…</>
                      ) : (
                        <><Shield size={16} /> Sign in to Admin Panel</>
                      )}
                    </button>

                    <button type="button" className="btn btn-secondary"
                      style={{padding: '10px', fontSize: '0.875rem', width: '100%'}}
                      onClick={() => navigate('home')}>
                      ← Back to Home
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="admin-layout">

                {/* ═══ ADMIN SIDEBAR ═══ */}
                <aside className="admin-sidebar">
                  <div className="admin-sidebar-header">
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
                      <div style={{width: '42px', height: '42px', borderRadius: '10px', overflow: 'hidden', border: '2px solid rgba(251,191,36,.4)', flexShrink: 0}}>
                        {adminAuth?.avatar
                          ? <img src={adminAuth.avatar} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                          : <div style={{width: '100%', height: '100%', background: 'rgba(251,191,36,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Shield size={20} style={{color: '#fbbf24'}} /></div>
                        }
                      </div>
                      <div>
                        <div style={{fontWeight: 800, fontSize: '0.95rem', color: '#fff'}}>{adminAuth?.name || 'Admin Console'}</div>
                        <div style={{fontSize: '0.68rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '2px'}}>{adminAuth?.role || currentRole}</div>
                      </div>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
                      {[
                        { label: 'Learners', value: learners.length },
                        { label: 'Revenue', value: `₹${Math.round(orders.filter(o => o.status === 'Success').reduce((a, o) => a + o.amount, 0) / 1000)}k` },
                        { label: 'Certified', value: learners.filter(l => l.stage === 'Certified').length },
                        { label: 'Open Tickets', value: tickets.filter(t => t.status === 'Open').length },
                      ].map(s => (
                        <div key={s.label} style={{background: 'rgba(255,255,255,.05)', borderRadius: '8px', padding: '10px 12px', border: '1px solid rgba(255,255,255,.04)'}}>
                          <div style={{fontSize: '1.15rem', fontWeight: 800, color: '#fff', lineHeight: 1}}>{s.value}</div>
                          <div style={{fontSize: '0.62rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginTop: '3px'}}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <nav className="admin-sidebar-nav">
                    {[
                      { tab: 'overview',      label: 'Overview',           icon: <Home size={15} />,        roles: ['SuperAdmin', 'ContentAdmin', 'SupportAdmin'] },
                      { tab: 'learners',      label: 'Learners',           icon: <Users size={15} />,       roles: ['SuperAdmin', 'SupportAdmin'] },
                      { tab: 'orders',        label: 'Orders & Payments',  icon: <CreditCard size={15} />,  roles: ['SuperAdmin', 'SupportAdmin'] },
                      { tab: 'assignments',   label: 'Assignment Review',  icon: <FileText size={15} />,    roles: ['SuperAdmin', 'SupportAdmin'] },
                      { tab: 'content',       label: 'Course Content',     icon: <BookOpen size={15} />,    roles: ['SuperAdmin', 'ContentAdmin'] },
                      { tab: 'question-bank', label: 'Question Bank',      icon: <HelpCircle size={15} />,  roles: ['SuperAdmin', 'ContentAdmin'] },
                      { tab: 'settings',      label: 'LMS Settings',       icon: <Settings size={15} />,    roles: ['SuperAdmin'] },
                      { tab: 'audit',         label: 'Audit Log',          icon: <Shield size={15} />,      roles: ['SuperAdmin'] },
                    ].filter(item => item.roles.includes(currentRole)).map(item => (
                      <div key={item.tab} className={`admin-nav-item${adminTab === item.tab ? ' active' : ''}`} onClick={() => setAdminTab(item.tab)}>
                        {item.icon}<span>{item.label}</span>
                      </div>
                    ))}
                  </nav>

                  <div className="admin-sidebar-footer">
                    <div className="admin-nav-item" onClick={() => navigate('dashboard')}><Home size={15} /><span>Dashboard</span></div>
                    <div className="admin-nav-item" style={{color: '#f87171'}} onClick={() => { setAdminAuth(null); setCurrentRole('Visitor'); setAdminLoginEmail(''); setAdminLoginPassword(''); navigate('home'); logAction('Admin logout', adminAuth?.role || 'Admin'); }}><LogOut size={15} /><span>Exit Admin</span></div>
                  </div>
                </aside>

                {/* ═══ ADMIN CONTENT ═══ */}
                <section className="admin-content">

                  {/* ── OVERVIEW ── */}
                  {adminTab === 'overview' && (
                    <div>
                      <div className="admin-content-header">
                        <div>
                          <h2 style={{margin: 0, fontSize: '1.5rem', fontWeight: 800}}>Platform Overview</h2>
                          <p style={{margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.875rem'}}>Real-time performance metrics — {currentRole} view.</p>
                        </div>
                        <div style={{display: 'flex', gap: '10px'}}>
                          <button className="btn btn-secondary" style={{fontSize: '0.85rem'}} onClick={() => alert('Report exported.')}><Download size={14} /> Export</button>
                          {currentRole === 'SuperAdmin' && <button className="btn btn-primary" style={{fontSize: '0.85rem'}} onClick={() => setAdminTab('settings')}><Settings size={14} /> Settings</button>}
                        </div>
                      </div>

                      <div className="admin-kpi-grid">
                        {[
                          { icon: <CreditCard size={20} style={{color: '#10b981'}} />, label: 'Total Revenue', value: `₹${orders.filter(o => o.status === 'Success').reduce((a, o) => a + o.amount, 0).toLocaleString('en-IN')}`, sub: `${orders.filter(o => o.status === 'Success').length} paid orders`, color: '#10b981', bg: '#d1fae5' },
                          { icon: <Users size={20} style={{color: '#1d4ed8'}} />, label: 'Enrolled Learners', value: learners.length, sub: `${learners.filter(l => l.status === 'Active').length} currently active`, color: '#1d4ed8', bg: '#dbeafe' },
                          { icon: <Award size={20} style={{color: '#d97706'}} />, label: 'Certified ABBs', value: learners.filter(l => l.stage === 'Certified').length, sub: 'Credentials issued', color: '#d97706', bg: '#fef3c7' },
                          { icon: <Star size={20} style={{color: '#7c3aed'}} />, label: 'Avg. Completion', value: `${Math.round(learners.reduce((a, l) => a + (l.completedLessons.length / totalLessons * 100), 0) / Math.max(learners.length, 1))}%`, sub: 'Curriculum progress', color: '#7c3aed', bg: '#ede9fe' },
                          { icon: <FileText size={20} style={{color: '#ea580c'}} />, label: 'Pending Reviews', value: assignments.filter(a => a.status === 'Under Review').length, sub: `${assignments.length} total submitted`, color: '#ea580c', bg: '#fff7ed' },
                          { icon: <HelpCircle size={20} style={{color: '#0284c7'}} />, label: 'Open Tickets', value: tickets.filter(t => t.status === 'Open').length, sub: `${tickets.length} tickets total`, color: '#0284c7', bg: '#e0f2fe' },
                        ].map(k => (
                          <div key={k.label} className="admin-kpi-card" style={{position: 'relative', overflow: 'hidden', padding: '16px 20px'}}>
                            <div style={{width: '40px', height: '40px', borderRadius: '10px', background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px'}}>{k.icon}</div>
                            <div style={{fontSize: '1.8rem', fontWeight: 800, color: k.color, lineHeight: 1}}>{k.value}</div>
                            <div style={{fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-dark)', marginTop: '8px'}}>{k.label}</div>
                            <div style={{fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: '2px'}}>{k.sub}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '20px'}}>
                        <div className="checkout-card">
                          <h4 style={{margin: '0 0 16px', fontWeight: 800, fontSize: '1rem'}}>⚡ Quick Actions</h4>
                          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                            {currentRole === 'SuperAdmin' && (
                              <button className="btn btn-secondary" style={{justifyContent: 'flex-start', gap: '12px', padding: '11px 16px', fontSize: '0.85rem'}}
                                onClick={() => { setLearners(prev => prev.map(l => l.id === activeLearner.id ? {...l, stage: 'Certified'} : l)); logAction('Manual certificate issued', 'SuperAdmin'); alert('Certificate issued for Rohan Kumar.'); }}>
                                <Award size={15} style={{color: 'var(--accent)'}} /> Issue Certificate — Rohan Kumar
                              </button>
                            )}
                            {['SuperAdmin', 'SupportAdmin'].includes(currentRole) && (
                              <button className="btn btn-secondary" style={{justifyContent: 'flex-start', gap: '12px', padding: '11px 16px', fontSize: '0.85rem'}}
                                onClick={() => { setLearners(prev => prev.map(l => ({...l, completedLessons: modules.flatMap(m => m.lessons.map(ls => ls.id))}))); logAction('Progress bypassed for all learners', currentRole); alert('All learners at 100%.'); }}>
                                <CheckSquare size={15} style={{color: 'var(--success)'}} /> Bypass Videos — All Learners
                              </button>
                            )}
                            {['SuperAdmin', 'SupportAdmin'].includes(currentRole) && (
                              <button className="btn btn-secondary" style={{justifyContent: 'flex-start', gap: '12px', padding: '11px 16px', fontSize: '0.85rem'}} onClick={() => setAdminTab('orders')}>
                                <CreditCard size={15} style={{color: 'var(--info)'}} /> View Orders & Revenue
                              </button>
                            )}
                            {['SuperAdmin', 'SupportAdmin'].includes(currentRole) && (
                              <button className="btn btn-secondary" style={{justifyContent: 'flex-start', gap: '12px', padding: '11px 16px', fontSize: '0.85rem'}} onClick={() => setAdminTab('assignments')}>
                                <FileText size={15} style={{color: '#7c3aed'}} /> Review Assignments
                              </button>
                            )}
                            {['SuperAdmin', 'ContentAdmin'].includes(currentRole) && (
                              <button className="btn btn-secondary" style={{justifyContent: 'flex-start', gap: '12px', padding: '11px 16px', fontSize: '0.85rem'}} onClick={() => setAdminTab('content')}>
                                <BookOpen size={15} style={{color: 'var(--primary)'}} /> Manage Course Content
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="checkout-card">
                          <h4 style={{margin: '0 0 14px', fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px'}}><Clock size={16} style={{color: 'var(--primary)'}} /> Recent Activity Feed</h4>
                          <div style={{maxHeight: '300px', overflowY: 'auto', paddingRight: '4px'}}>
                            {auditLogs.slice(0, 15).map((log, idx) => (
                              <div key={idx} style={{display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 0', borderBottom: idx < Math.min(auditLogs.length, 15) - 1 ? '1px solid var(--border)' : 'none', fontSize: '0.82rem'}}>
                                <div style={{width: '28px', height: '28px', borderRadius: '50%', background: log.role === 'SuperAdmin' ? '#e0e7ff' : log.role === 'Learner' ? '#d1fae5' : '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'}}>
                                  {log.role === 'SuperAdmin' ? <Shield size={13} style={{color: '#1d4ed8'}} /> : log.role === 'Learner' ? <Users size={13} style={{color: '#10b981'}} /> : <Settings size={13} style={{color: '#f59e0b'}} />}
                                </div>
                                <div style={{flex: 1, minWidth: 0}}>
                                  <div style={{fontWeight: 600, color: 'var(--text-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{log.action}</div>
                                  <div style={{color: 'var(--text-muted)', marginTop: '2px', fontSize: '0.73rem'}}>{new Date(log.timestamp).toLocaleString()}</div>
                                </div>
                                <span className={`badge ${log.role === 'SuperAdmin' ? 'badge-danger' : log.role === 'Learner' ? 'badge-success' : 'badge-info'}`} style={{flexShrink: 0, fontSize: '0.68rem', padding: '3px 8px'}}>{log.role}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── LEARNERS ── */}
                  {adminTab === 'learners' && ['SuperAdmin', 'SupportAdmin'].includes(currentRole) && (
                    <div>
                      <div className="admin-content-header">
                        <div>
                          <h2 style={{margin: 0, fontSize: '1.5rem', fontWeight: 800}}>Learner Management</h2>
                          <p style={{margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.875rem'}}>Search, filter and manage all enrolled learners and their access.</p>
                        </div>
                        <button className="btn btn-secondary" style={{fontSize: '0.85rem'}} onClick={() => alert('CSV exported.')}><Download size={14} /> Export CSV</button>
                      </div>
                      <div style={{display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap'}}>
                        <div style={{position: 'relative', flex: '1 1 220px'}}>
                          <Search size={14} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)'}} />
                          <input type="text" className="form-control" placeholder="Search name or email..." style={{paddingLeft: '36px'}} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                        </div>
                        <select className="form-control" style={{width: 'auto'}} value={cohortFilter} onChange={e => setCohortFilter(e.target.value)}>
                          <option>All</option><option>Enrolled</option><option>Certified</option>
                        </select>
                      </div>
                      <div className="table-container">
                        <table className="data-table">
                          <thead><tr><th>Learner</th><th>Contact</th><th>Stage</th><th>Progress</th><th>Status</th><th>Actions</th></tr></thead>
                          <tbody>
                            {learners.filter(l => searchQuery === '' || l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || l.email.toLowerCase().includes(searchQuery.toLowerCase()))
                              .filter(l => cohortFilter === 'All' || l.stage === cohortFilter)
                              .map(l => (
                                <tr key={l.id}>
                                  <td>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                      <img src={l.photo} style={{width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)'}} alt="" />
                                      <div>
                                        <div style={{fontWeight: 700, fontSize: '0.875rem'}}>{l.fullName}</div>
                                        <div style={{fontSize: '0.73rem', color: 'var(--text-muted)'}}>{l.city}, {l.state}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td style={{fontSize: '0.82rem'}}><div>{l.email}</div><div style={{color: 'var(--text-muted)', fontSize: '0.75rem'}}>{l.mobile}</div></td>
                                  <td><span className={`badge ${l.stage === 'Certified' ? 'badge-success' : 'badge-info'}`}>{l.stage}</span></td>
                                  <td>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                      <div style={{flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden', minWidth: '70px'}}>
                                        <div style={{height: '100%', background: 'linear-gradient(90deg, #1d4ed8, #10b981)', borderRadius: '99px', width: `${Math.round(l.completedLessons.length / totalLessons * 100)}%`, transition: 'width .4s'}} />
                                      </div>
                                      <span style={{fontSize: '0.73rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap'}}>{l.completedLessons.length}/{totalLessons}</span>
                                    </div>
                                  </td>
                                  <td><span className={`badge ${l.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{l.status}</span></td>
                                  <td>
                                    <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>
                                      <button className="btn btn-secondary" style={{padding: '3px 9px', fontSize: '0.73rem'}}
                                        onClick={() => { setLearners(prev => prev.map(u => u.id === l.id ? {...u, completedLessons: modules.flatMap(m => m.lessons.map(ls => ls.id))} : u)); logAction(`Progress bypassed for ${l.fullName}`, currentRole); }}>Bypass</button>
                                      {currentRole === 'SuperAdmin' && (
                                        <button className="btn btn-secondary" style={{padding: '3px 9px', fontSize: '0.73rem', color: 'var(--accent)', borderColor: 'var(--accent)'}}
                                          onClick={() => { setLearners(prev => prev.map(u => u.id === l.id ? {...u, stage: 'Certified'} : u)); logAction(`Certified ${l.fullName}`, 'SuperAdmin'); alert('Certificate issued.'); }}>
                                          <Award size={11} /> Certify
                                        </button>
                                      )}
                                      <button className="btn btn-secondary" style={{padding: '3px 9px', fontSize: '0.73rem', color: l.status === 'Active' ? 'var(--danger)' : 'var(--success)', borderColor: l.status === 'Active' ? 'var(--danger)' : 'var(--success)'}}
                                        onClick={() => { setLearners(prev => prev.map(u => u.id === l.id ? {...u, status: u.status === 'Active' ? 'Suspended' : 'Active'} : u)); logAction(`Account toggled for ${l.fullName}`, currentRole); }}>
                                        {l.status === 'Active' ? 'Suspend' : 'Activate'}
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* ── ORDERS ── */}
                  {adminTab === 'orders' && ['SuperAdmin', 'SupportAdmin'].includes(currentRole) && (
                    <div>
                      <div className="admin-content-header">
                        <div>
                          <h2 style={{margin: 0, fontSize: '1.5rem', fontWeight: 800}}>Orders & Payments</h2>
                          <p style={{margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.875rem'}}>Full transaction ledger with invoice and refund management.</p>
                        </div>
                      </div>
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px'}}>
                        {[
                          { label: 'Total Revenue', value: `₹${orders.filter(o => o.status === 'Success').reduce((a, o) => a + o.amount, 0).toLocaleString('en-IN')}`, color: '#10b981', bg: '#d1fae5' },
                          { label: 'Successful Orders', value: orders.filter(o => o.status === 'Success').length, color: '#1d4ed8', bg: '#dbeafe' },
                          { label: 'Failed / Refunded', value: orders.filter(o => o.status !== 'Success').length, color: '#ef4444', bg: '#fee2e2' },
                        ].map(s => (
                          <div key={s.label} style={{background: s.bg, borderRadius: 'var(--r)', padding: '16px 20px', border: `1px solid ${s.color}33`}}>
                            <div style={{fontSize: '1.6rem', fontWeight: 800, color: s.color, lineHeight: 1}}>{s.value}</div>
                            <div style={{fontSize: '0.78rem', fontWeight: 700, color: s.color, opacity: .8, marginTop: '4px'}}>{s.label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{display: 'flex', gap: '8px', marginBottom: '16px'}}>
                        {['All', 'Success', 'Failed', 'Refunded'].map(f => (
                          <button key={f} className={`btn ${adminOrderFilter === f ? 'btn-primary' : 'btn-secondary'}`} style={{padding: '6px 16px', fontSize: '0.82rem'}} onClick={() => setAdminOrderFilter(f)}>{f}</button>
                        ))}
                      </div>
                      <div className="table-container">
                        <table className="data-table">
                          <thead><tr><th>Order ID</th><th>Learner</th><th>Amount</th><th>Status</th><th>Invoice</th><th>Date</th><th>Action</th></tr></thead>
                          <tbody>
                            {orders.filter(o => adminOrderFilter === 'All' || o.status === adminOrderFilter).map(ord => (
                              <tr key={ord.id}>
                                <td style={{fontFamily: 'monospace', fontWeight: 700, fontSize: '0.82rem'}}>{ord.id}</td>
                                <td style={{fontWeight: 600}}>{ord.learnerName}</td>
                                <td style={{fontWeight: 700}}>₹{ord.amount.toLocaleString('en-IN')}</td>
                                <td><span className={`badge ${ord.status === 'Success' ? 'badge-success' : ord.status === 'Refunded' ? 'badge-warning' : 'badge-danger'}`}>{ord.status}</span></td>
                                <td style={{fontFamily: 'monospace', fontSize: '0.78rem'}}>{ord.invoiceNo || '—'}</td>
                                <td style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{ord.date}</td>
                                <td>
                                  <div style={{display: 'flex', gap: '5px'}}>
                                    {ord.status === 'Success' && <button className="btn btn-secondary" style={{padding: '3px 8px', fontSize: '0.73rem', color: 'var(--danger)', borderColor: 'var(--danger)'}} onClick={() => { setOrders(prev => prev.map(o => o.id === ord.id ? {...o, status: 'Refunded'} : o)); logAction(`Refunded order ${ord.id}`, currentRole); }}>Refund</button>}
                                    {ord.invoiceNo && <button className="btn btn-secondary" style={{padding: '3px 8px', fontSize: '0.73rem'}} onClick={() => alert(`Invoice ${ord.invoiceNo} downloaded.`)}><Download size={11} /></button>}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* ── ASSIGNMENTS ── */}
                  {adminTab === 'assignments' && ['SuperAdmin', 'SupportAdmin'].includes(currentRole) && (
                    <div>
                      {/* Section 1: Submissions Pipeline */}
                      <div className="admin-content-header">
                        <div>
                          <h2 style={{margin: 0, fontSize: '1.5rem', fontWeight: 800}}>Learner Submissions Pipeline</h2>
                          <p style={{margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.875rem'}}>Review, approve, or request resubmission of learner case study submissions.</p>
                        </div>
                        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                          <span className="badge badge-info" style={{fontSize: '0.78rem', padding: '5px 12px', borderRadius: '20px'}}>{assignments.filter(a => a.status === 'Under Review').length} Pending</span>
                          <span className="badge badge-success" style={{fontSize: '0.78rem', padding: '5px 12px', borderRadius: '20px'}}>{assignments.filter(a => a.status === 'Approved').length} Approved</span>
                        </div>
                      </div>
                      
                      <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                        {assignments.length === 0 ? (
                          <div style={{textAlign: 'center', padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-muted)'}}>No submissions under review.</div>
                        ) : (
                          assignments.map(sub => (
                            <div key={sub.id} className="checkout-card" style={{padding: '16px', borderRadius: '8px', borderLeft: `4px solid ${sub.status === 'Approved' ? '#10b981' : sub.status === 'Under Review' ? '#3b82f6' : sub.status === 'Resubmission Required' ? '#f59e0b' : '#ef4444'}`, boxShadow: '0 4px 12px rgba(0,0,0,0.02)'}}>
                              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '10px'}}>
                                <div style={{display: 'flex', gap: '14px', alignItems: 'center'}}>
                                  {sub.fileData ? (
                                    sub.fileType?.startsWith('image/') ? (
                                      <a href={sub.fileData} target="_blank" rel="noopener noreferrer" title="View full image">
                                        <img src={sub.fileData} style={{width: '44px', height: '44px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #cbd5e1', cursor: 'zoom-in'}} alt="Preview" />
                                      </a>
                                    ) : (
                                      <a href={sub.fileData} download={sub.fileName} title="Download file" style={{width: '44px', height: '44px', background: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', border: '1px solid var(--border)'}}>
                                        <FileText size={20} />
                                      </a>
                                    )
                                  ) : (
                                    <div style={{width: '44px', height: '44px', background: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', border: '1px solid var(--border)'}}>
                                      <FileText size={20} />
                                    </div>
                                  )}
                                  <div>
                                    <div style={{fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-dark)'}}>{sub.title}</div>
                                    <div style={{fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '3px'}}>
                                      <span>👤 {sub.learnerName}</span>
                                      <span>📎 <span style={{fontFamily: 'monospace'}}>{sub.fileName}</span> {sub.fileSize && `(${sub.fileSize})`}</span>
                                      <span>📅 {sub.submittedDate}</span>
                                      <span>🔄 Attempt #{sub.attempts}</span>
                                    </div>
                                  </div>
                                </div>
                                <span className={`badge ${sub.status === 'Approved' ? 'badge-success' : sub.status === 'Under Review' ? 'badge-info' : sub.status === 'Resubmission Required' ? 'badge-warning' : 'badge-danger'}`} style={{fontSize: '0.72rem', padding: '4px 10px'}}>{sub.status}</span>
                              </div>
                              {sub.feedback && <div style={{background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '6px', padding: '8px 12px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px'}}>💬 <em>{sub.feedback}</em></div>}
                              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                                <button className="btn btn-secondary" style={{padding: '5px 12px', fontSize: '0.76rem', color: 'var(--success)', borderColor: 'var(--success)', display: 'inline-flex', alignItems: 'center', gap: '4px'}} onClick={() => { setAssignments(prev => prev.map(s => s.id === sub.id ? {...s, status: 'Approved', feedback: 'Approved. Recast sheets meet professional guidelines.'} : s)); logAction(`Approved assignment ${sub.id}`, currentRole); }}><Check size={12} /> Approve</button>
                                <button className="btn btn-secondary" style={{padding: '5px 12px', fontSize: '0.76rem', color: '#d97706', borderColor: '#d97706', display: 'inline-flex', alignItems: 'center', gap: '4px'}} onClick={() => { setAssignments(prev => prev.map(s => s.id === sub.id ? {...s, status: 'Resubmission Required', feedback: 'Please fix working capital normalizations and resubmit.'} : s)); logAction(`Resubmission requested for ${sub.id}`, currentRole); }}><RefreshCw size={12} /> Resubmission</button>
                                <button className="btn btn-secondary" style={{padding: '5px 12px', fontSize: '0.76rem', color: 'var(--danger)', borderColor: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: '4px'}} onClick={() => { setAssignments(prev => prev.map(s => s.id === sub.id ? {...s, status: 'Rejected', feedback: 'Submission does not meet minimum requirements.'} : s)); logAction(`Rejected ${sub.id}`, currentRole); }}><X size={12} /> Reject</button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Section 2: Manage Assignment Tasks */}
                      <div className="admin-content-header" style={{marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '20px'}}>
                        <div>
                          <h2 style={{margin: 0, fontSize: '1.5rem', fontWeight: 800}}>Manage Assignment Tasks</h2>
                          <p style={{margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.875rem'}}>Add or remove assignment tasks required for course completion.</p>
                        </div>
                        <span className="badge badge-info" style={{fontSize: '0.8rem', padding: '6px 14px'}}>{assignmentTasks.length} Tasks Required</span>
                      </div>

                      <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px'}}>
                        {assignmentTasks.map((task, idx) => (
                          <div key={task.id} className="checkout-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderRadius: '8px'}}>
                            <div>
                              <strong style={{fontSize: '0.9rem', color: 'var(--text-dark)'}}>{idx + 1}. {task.title}</strong>
                              <div style={{fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', gap: '10px'}}>
                                <span>📚 {task.ref}</span>
                                <span>⏱ {task.dueNote}</span>
                                <span>📎 <span style={{fontFamily: 'monospace'}}>{task.fileHint}</span></span>
                              </div>
                              <div style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px', maxWidth: '680px'}}>{task.desc}</div>
                            </div>
                            <button 
                              className="btn btn-secondary" 
                              style={{padding: '4px 8px', fontSize: '0.72rem', color: 'var(--danger)', borderColor: 'var(--danger)', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '3px'}}
                              onClick={() => {
                                if (window.confirm('Delete this assignment task? This will remove it from the requirements list.')) {
                                  setAssignmentTasks(prev => prev.filter(t => t.id !== task.id));
                                  logAction(`Deleted assignment task: ${task.title}`, currentRole);
                                }
                              }}
                            >
                              <Trash size={11} /> Remove
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add New Assignment Task Form */}
                      <div className="checkout-card" style={{background: '#fafbff', padding: '16px', border: '1px solid var(--border)', borderRadius: '8px'}}>
                        <h4 style={{margin: '0 0 12px', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px'}}><Plus size={14} style={{color: 'var(--primary)'}} /> Add Assignment Task</h4>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px'}}>
                          <input 
                            type="text" 
                            className="form-control" 
                            style={{fontSize: '0.78rem', padding: '5px 8px', height: '32px'}}
                            placeholder="Task Title" 
                            value={newAssignmentTitle} 
                            onChange={e => setNewAssignmentTitle(e.target.value)} 
                          />
                          <input 
                            type="text" 
                            className="form-control" 
                            style={{fontSize: '0.78rem', padding: '5px 8px', height: '32px'}}
                            placeholder="Reference Lessons (e.g. Module 6 — Lesson 21)" 
                            value={newAssignmentRef} 
                            onChange={e => setNewAssignmentRef(e.target.value)} 
                          />
                          <input 
                            type="text" 
                            className="form-control" 
                            style={{fontSize: '0.78rem', padding: '5px 8px', height: '32px'}}
                            placeholder="Due Timeline (e.g. End of Module 7)" 
                            value={newAssignmentDue} 
                            onChange={e => setNewAssignmentDue(e.target.value)} 
                          />
                          <input 
                            type="text" 
                            className="form-control" 
                            style={{fontSize: '0.78rem', padding: '5px 8px', height: '32px'}}
                            placeholder="File Name Hint (e.g. recast_work.xlsx)" 
                            value={newAssignmentHint} 
                            onChange={e => setNewAssignmentHint(e.target.value)} 
                          />
                        </div>
                        <div style={{display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px'}}>
                          <input 
                            type="text" 
                            className="form-control" 
                            style={{fontSize: '0.78rem', padding: '5px 8px', height: '32px', flex: 1}}
                            placeholder="Task Description details..." 
                            value={newAssignmentDesc} 
                            onChange={e => setNewAssignmentDesc(e.target.value)} 
                          />
                        </div>
                        <button 
                          className="btn btn-primary"
                          style={{marginTop: '12px', padding: '6px 16px', fontSize: '0.78rem'}}
                          onClick={() => {
                            if (!newAssignmentTitle || !newAssignmentDesc) {
                              alert('Title and Description are required.');
                              return;
                            }
                            const newTask = {
                              id: 'as-' + Date.now(),
                              num: assignmentTasks.length + 1,
                              title: newAssignmentTitle,
                              desc: newAssignmentDesc,
                              ref: newAssignmentRef || 'N/A',
                              dueNote: newAssignmentDue || 'N/A',
                              fileHint: newAssignmentHint || 'assignment_upload.pdf'
                            };
                            setAssignmentTasks(prev => [...prev, newTask]);
                            logAction(`Added assignment task: ${newAssignmentTitle}`, currentRole);
                            setNewAssignmentTitle("");
                            setNewAssignmentDesc("");
                            setNewAssignmentRef("");
                            setNewAssignmentDue("");
                            setNewAssignmentHint("");
                            alert('New Assignment Task added successfully.');
                          }}
                        >
                          <Plus size={14} /> Add Assignment Task
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── CONTENT ── */}
                  {adminTab === 'content' && ['SuperAdmin', 'ContentAdmin'].includes(currentRole) && (
                    <div>
                      <div className="admin-content-header">
                        <div>
                          <h2 style={{margin: 0, fontSize: '1.5rem', fontWeight: 800}}>Course Content Manager</h2>
                          <p style={{margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.875rem'}}>Add, edit, or delete modules, lessons, and downloadable files.</p>
                        </div>
                        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                          <span className="badge badge-info">{modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons</span>
                          <span className="badge badge-success">{modules.length} Modules</span>
                        </div>
                      </div>

                      {/* Add New Module Form */}
                      <div className="checkout-card" style={{border: '2px dashed var(--border)', background: '#fafbff', marginBottom: '20px'}}>
                        <h4 style={{margin: '0 0 12px', fontWeight: 800}}><Plus size={15} style={{verticalAlign: 'middle', marginRight: '6px'}} />Create New Module</h4>
                        <div style={{display: 'flex', gap: '12px'}}>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter new module title (e.g. Module 11: Integration & Post-Merger Advisory)..." 
                            value={newModuleTitle}
                            onChange={e => setNewModuleTitle(e.target.value)}
                            style={{flex: 1}}
                          />
                          <button 
                            className="btn btn-primary"
                            onClick={() => {
                              const title = newModuleTitle.trim();
                              if (!title) {
                                alert('Module title is required.');
                                return;
                              }
                              const newMod = {
                                id: modules.length + 1,
                                title,
                                lessons: []
                              };
                              setModules(prev => [...prev, newMod]);
                              logAction(`Created new module: ${title}`, currentRole);
                              setNewModuleTitle("");
                              alert('Module created successfully.');
                            }}
                          >
                            Create Module
                          </button>
                        </div>
                      </div>

                      {modules.map((mod, modIdx) => {
                        const modResources = resources.filter(r => r.moduleId === mod.id);
                        const isExpanded = expandedModuleId === mod.id;
                        return (
                          <div key={mod.id} className="checkout-card" style={{marginBottom: '16px', borderLeft: '4px solid var(--primary)', borderRadius: '8px', padding: isExpanded ? '20px' : '12px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)'}}>
                            {/* Module Header */}
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isExpanded ? '1px solid var(--border)' : 'none', paddingBottom: isExpanded ? '14px' : '0px', marginBottom: isExpanded ? '20px' : '0px', flexWrap: 'wrap', gap: '10px'}}>
                              <div 
                                style={{display: 'flex', alignItems: 'center', gap: '12px', flex: 1, cursor: 'pointer', userSelect: 'none'}}
                                onClick={() => setExpandedModuleId(prev => prev === mod.id ? null : mod.id)}
                              >
                                {isExpanded ? <ChevronDown size={18} style={{color: 'var(--text-muted)'}} /> : <ChevronRight size={18} style={{color: 'var(--text-muted)'}} />}
                                <div style={{width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0}}>{modIdx + 1}</div>
                                {editingModuleId === mod.id ? (
                                  <input 
                                    type="text" 
                                    className="form-control" 
                                    style={{fontSize: '1rem', padding: '4px 8px', fontWeight: 800, flex: 1}} 
                                    value={editModuleTitle} 
                                    onChange={e => setEditModuleTitle(e.target.value)} 
                                    onClick={e => e.stopPropagation()}
                                  />
                                ) : (
                                  <div style={{fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-dark)'}}>{mod.title}</div>
                                )}
                              </div>
                              <div style={{display: 'flex', gap: '8px'}}>
                                {editingModuleId === mod.id ? (
                                  <>
                                    <button className="btn btn-secondary" style={{padding: '5px 12px', fontSize: '0.78rem', color: 'var(--success)', borderColor: 'var(--success)'}} onClick={() => {
                                      if (!editModuleTitle.trim()) { alert('Module title is required.'); return; }
                                      setModules(prev => prev.map(m => m.id === mod.id ? {...m, title: editModuleTitle.trim()} : m));
                                      logAction(`Renamed module ${mod.id} to ${editModuleTitle.trim()}`, currentRole);
                                      setEditingModuleId(null);
                                    }}><Check size={12} /> Save</button>
                                    <button className="btn btn-secondary" style={{padding: '5px 12px', fontSize: '0.78rem'}} onClick={() => setEditingModuleId(null)}>Cancel</button>
                                  </>
                                ) : (
                                  <>
                                    <button className="btn btn-secondary" style={{padding: '5px 12px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px'}} onClick={() => { setEditingModuleId(mod.id); setEditModuleTitle(mod.title); }}><Tag size={12} /> Rename</button>
                                    <button className="btn btn-secondary" style={{padding: '5px 12px', fontSize: '0.78rem', color: 'var(--danger)', borderColor: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: '4px'}} onClick={() => { if (window.confirm(`Delete "${mod.title}"? This will delete all lessons and contents inside it.`)) { setModules(prev => prev.filter(m => m.id !== mod.id)); logAction(`Deleted module ${mod.id}: ${mod.title}`, currentRole); } }}><Trash size={12} /> Delete Module</button>
                                  </>
                                )}
                              </div>
                            </div>

                            {isExpanded && (
                              <div>
                                {/* Lessons Management inside Module */}
                                <div style={{marginBottom: '24px'}}>
                                  <h5 style={{fontWeight: 700, margin: '0 0 12px', fontSize: '0.92rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px'}}>📖 Lessons ({mod.lessons.length})</h5>
                                  {mod.lessons.length === 0 ? (
                                    <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: '0 0 16px 12px'}}>No lessons in this module yet.</p>
                                  ) : (
                                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', paddingLeft: '8px'}}>
                                      {mod.lessons.map((les, lesIdx) => (
                                        <div key={les.id} style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '8px', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                                          <div style={{flex: 1, minWidth: '200px'}}>
                                            {editingLessonId === les.id ? (
                                              <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px'}}>
                                                <input type="text" className="form-control" style={{fontSize: '0.82rem', padding: '6px 10px'}} value={editLessonTitle} onChange={e => setEditLessonTitle(e.target.value)} placeholder="Lesson Title" />
                                                <div style={{display: 'flex', gap: '8px'}}>
                                                  <input type="text" className="form-control" style={{fontSize: '0.82rem', padding: '6px 10px', width: '120px'}} value={editLessonDuration} onChange={e => setEditLessonDuration(e.target.value)} placeholder="Duration (e.g. 15 mins)" />
                                                  <input type="text" className="form-control" style={{fontSize: '0.82rem', padding: '6px 10px', flex: 1}} value={editLessonVideoUrl} onChange={e => setEditLessonVideoUrl(e.target.value)} placeholder="Video Filename/URL" />
                                                </div>
                                              </div>
                                            ) : (
                                              <>
                                                <div style={{fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)'}}>{les.title}</div>
                                                <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', gap: '12px'}}>
                                                  <span>⏱ {les.duration}</span>
                                                  <span>📹 <span style={{fontFamily: 'monospace', background: '#eef2f6', padding: '2px 6px', borderRadius: '4px'}}>{les.videoUrl}</span></span>
                                                </div>
                                              </>
                                            )}
                                          </div>
                                          
                                          <div style={{display: 'flex', gap: '8px'}}>
                                            {editingLessonId === les.id ? (
                                              <>
                                                <button className="btn btn-secondary" style={{padding: '4px 10px', fontSize: '0.75rem', color: 'var(--success)', borderColor: 'var(--success)'}} onClick={() => {
                                                  if (!editLessonTitle.trim()) { alert('Lesson title is required.'); return; }
                                                  setModules(prev => prev.map(m => m.id === mod.id ? {
                                                    ...m,
                                                    lessons: m.lessons.map(l => l.id === les.id ? { ...l, title: editLessonTitle.trim(), duration: editLessonDuration.trim() || '10 mins', videoUrl: editLessonVideoUrl.trim() || 'default.mp4' } : l)
                                                  } : m));
                                                  logAction(`Edited lesson ${les.id}: ${editLessonTitle}`, currentRole);
                                                  setEditingLessonId(null);
                                                  alert('Lesson details updated successfully.');
                                                }}><Check size={12} /> Save</button>
                                                <button className="btn btn-secondary" style={{padding: '4px 10px', fontSize: '0.75rem'}} onClick={() => setEditingLessonId(null)}>Cancel</button>
                                              </>
                                            ) : (
                                              <>
                                                <button className="btn btn-secondary" style={{padding: '4px 10px', fontSize: '0.75rem'}} onClick={() => {
                                                  setEditingLessonId(les.id);
                                                  setEditLessonTitle(les.title);
                                                  setEditLessonDuration(les.duration);
                                                  setEditLessonVideoUrl(les.videoUrl);
                                                }}>Edit</button>
                                                <button className="btn btn-secondary" style={{padding: '4px 10px', fontSize: '0.75rem', color: 'var(--danger)', borderColor: 'var(--danger)'}} onClick={() => {
                                                  if (window.confirm(`Delete lesson "${les.title}"?`)) {
                                                    setModules(prev => prev.map(m => m.id === mod.id ? { ...m, lessons: m.lessons.filter(l => l.id !== les.id) } : m));
                                                    logAction(`Deleted lesson: ${les.title}`, currentRole);
                                                  }
                                                }}>Remove</button>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Add Lesson Form */}
                                  <div style={{background: '#f8fafc', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: '6px', marginLeft: '8px', marginTop: '10px'}}>
                                    <div style={{fontWeight: 700, fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '4px'}}><Plus size={12} style={{color: 'var(--primary)'}} /> Add Lesson</div>
                                    <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center'}}>
                                      <input type="text" className="form-control" style={{fontSize: '0.78rem', padding: '5px 8px', height: '32px', flex: 2, minWidth: '140px'}} id={`nl-title-${mod.id}`} placeholder="Lesson Title" />
                                      <input type="text" className="form-control" style={{fontSize: '0.78rem', padding: '5px 8px', height: '32px', flex: 1, minWidth: '80px'}} id={`nl-dur-${mod.id}`} placeholder="Duration" />
                                      <input type="text" className="form-control" style={{fontSize: '0.78rem', padding: '5px 8px', height: '32px', flex: 2, minWidth: '140px'}} id={`nl-url-${mod.id}`} placeholder="Video Filename" />
                                      <button className="btn btn-primary" style={{padding: '5px 14px', fontSize: '0.78rem', height: '32px'}} onClick={() => {
                                        const tEl = document.getElementById(`nl-title-${mod.id}`);
                                        const dEl = document.getElementById(`nl-dur-${mod.id}`);
                                        const uEl = document.getElementById(`nl-url-${mod.id}`);
                                        if (!tEl || !tEl.value.trim()) { alert('Lesson Title is required.'); return; }
                                        const t = tEl.value.trim();
                                        const d = dEl?.value.trim() || "10 mins";
                                        const u = uEl?.value.trim() || "lesson.mp4";
                                        const newL = {
                                          id: `${mod.id}-${Date.now()}`,
                                          title: t,
                                          duration: d,
                                          videoUrl: u,
                                          summary: `Summary of ${t}`
                                        };
                                        setModules(prev => prev.map(m => m.id === mod.id ? { ...m, lessons: [...m.lessons, newL] } : m));
                                        logAction(`Added lesson "${t}" to module ${mod.id}`, currentRole);
                                        tEl.value = '';
                                        if (dEl) dEl.value = '';
                                        if (uEl) uEl.value = '';
                                        alert('Lesson added successfully.');
                                      }}>Add</button>
                                    </div>
                                  </div>
                                </div>

                                {/* Downloadable Resources for this module */}
                                <div>
                                  <h5 style={{fontWeight: 700, margin: '0 0 12px', fontSize: '0.92rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px'}}>📎 Module Resources ({modResources.length})</h5>
                                  {modResources.length > 0 && (
                                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', paddingLeft: '8px'}}>
                                      {modResources.map(r => (
                                        <div key={r.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '10px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.82rem'}}>
                                          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                            <FileText size={16} style={{color: 'var(--primary)'}} />
                                            <strong>{r.title}</strong>
                                            <span className="badge badge-info" style={{fontSize: '0.7rem', padding: '2px 6px'}}>{r.version}</span>
                                          </div>
                                          <button className="btn btn-secondary" style={{padding: '4px 10px', fontSize: '0.75rem', color: 'var(--danger)', borderColor: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: '4px'}} onClick={() => {
                                            setResources(prev => prev.filter(res => res.id !== r.id));
                                            logAction(`Removed resource ${r.title} from module ${mod.id}`, currentRole);
                                          }}><Trash size={12} /> Delete</button>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Add Resource Form for Module */}
                                  <div style={{background: '#f8fafc', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: '6px', marginLeft: '8px', marginTop: '10px'}}>
                                    <div style={{fontWeight: 700, fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '4px'}}><Plus size={12} style={{color: 'var(--primary)'}} /> Add Resource</div>
                                    <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center'}}>
                                      <input type="text" className="form-control" style={{fontSize: '0.78rem', padding: '5px 8px', height: '32px', flex: 2, minWidth: '120px'}} id={`nr-title-${mod.id}`} placeholder="Resource Title" />
                                      <input type="text" className="form-control" style={{fontSize: '0.78rem', padding: '5px 8px', height: '32px', flex: 1, minWidth: '60px'}} id={`nr-ver-${mod.id}`} placeholder="Version" />
                                      <input type="file" className="form-control" style={{fontSize: '0.78rem', padding: '3px 8px', height: '32px', flex: 2, minWidth: '120px', background: '#fff'}} id={`nr-file-${mod.id}`} />
                                      <button className="btn btn-primary" style={{padding: '5px 14px', fontSize: '0.78rem', height: '32px'}} onClick={() => {
                                        const tEl = document.getElementById(`nr-title-${mod.id}`);
                                        const vEl = document.getElementById(`nr-ver-${mod.id}`);
                                        const fileEl = document.getElementById(`nr-file-${mod.id}`);
                                        if (!tEl || !tEl.value.trim()) { alert('Resource title is required.'); return; }
                                        const t = tEl.value.trim();
                                        const v = vEl?.value.trim() || 'v1.0';
                                        const file = fileEl?.files[0];

                                        const saveResource = (fileData = null, fileName = null, fileType = null, fileSize = null) => {
                                          const newRes = {
                                            id: `res-${Date.now()}`,
                                            title: t,
                                            description: file ? `Uploaded document: ${file.name}` : `Resource associated with module ${mod.id}`,
                                            version: v,
                                            date: new Date().toISOString().split('T')[0],
                                            downloadAllowed: true,
                                            level: 'Module-level',
                                            moduleId: mod.id,
                                            downloadCount: 0,
                                            fileData,
                                            fileName,
                                            fileType,
                                            fileSize
                                          };
                                          setResources(prev => [...prev, newRes]);
                                          logAction(`Added resource "${t}" to module ${mod.id}`, currentRole);
                                          tEl.value = '';
                                          if (vEl) vEl.value = '';
                                          if (fileEl) fileEl.value = '';
                                          alert('Resource added successfully.');
                                        };

                                        if (file) {
                                          const reader = new FileReader();
                                          reader.onload = (e) => {
                                            saveResource(
                                              e.target.result,
                                              file.name,
                                              file.type,
                                              (file.size / (1024 * 1024)).toFixed(2) + ' MB'
                                            );
                                          };
                                          reader.readAsDataURL(file);
                                        } else {
                                          saveResource();
                                        }
                                      }}>Add Resource</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Course-wide Resources section */}
                      <div className="checkout-card" style={{borderColor: 'var(--accent)', marginTop: '28px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)'}}>
                        <h4 style={{margin: '0 0 16px', fontWeight: 800, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px'}}>📦 Course-wide Download Resources</h4>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px'}}>
                          {resources.filter(r => r.moduleId === null).map(r => (
                            <div key={r.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 18px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.85rem'}}>
                              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                <FileText size={18} style={{color: 'var(--primary)'}} />
                                <div>
                                  <strong>{r.title}</strong>
                                  <span className="badge badge-info" style={{fontSize: '0.72rem', padding: '2px 6px', marginLeft: '8px'}}>{r.version}</span>
                                  <span style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '12px'}}>({r.date})</span>
                                </div>
                              </div>
                              <button className="btn btn-secondary" style={{padding: '5px 12px', fontSize: '0.75rem', color: 'var(--danger)', borderColor: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: '4px'}} onClick={() => {
                                setResources(prev => prev.filter(res => res.id !== r.id));
                                logAction(`Removed course-wide resource ${r.title}`, currentRole);
                              }}><Trash size={12} /> Remove</button>
                            </div>
                          ))}
                        </div>

                        {/* Add course-wide resource */}
                        <div style={{background: '#fafbff', padding: '16px', border: '1px solid var(--border)', borderRadius: '8px'}}>
                          <div style={{fontWeight: 700, fontSize: '0.88rem', marginBottom: '12px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px'}}><Plus size={14} style={{color: 'var(--primary)'}} /> Add Course-wide Resource</div>
                          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px'}}>
                            <div>
                              <label style={{display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px'}}>Resource Title</label>
                              <input type="text" className="form-control" style={{fontSize: '0.82rem', padding: '8px'}} value={newResourceTitle} onChange={e => setNewResourceTitle(e.target.value)} placeholder="Resource Title (e.g. Official Student Guide)" />
                            </div>
                            <div>
                              <label style={{display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px'}}>Version</label>
                              <input type="text" className="form-control" style={{fontSize: '0.82rem', padding: '8px'}} value={newResourceVer} onChange={e => setNewResourceVer(e.target.value)} placeholder="Version (e.g. v2.1)" />
                            </div>
                            <div>
                              <label style={{display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px'}}>Select Document File</label>
                              <input type="file" className="form-control" style={{fontSize: '0.8rem', padding: '6px', height: 'auto', background: '#fff'}} id="nr-file-global" />
                            </div>
                          </div>
                          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <button className="btn btn-primary" style={{padding: '8px 20px', fontSize: '0.82rem'}} onClick={() => {
                              if (!newResourceTitle.trim()) { alert('Resource title is required.'); return; }
                              const fileEl = document.getElementById('nr-file-global');
                              const file = fileEl?.files[0];
                              
                              const saveResource = (fileData = null, fileName = null, fileType = null, fileSize = null) => {
                                const newRes = {
                                  id: `res-${Date.now()}`,
                                  title: newResourceTitle.trim(),
                                  description: file ? `Uploaded course resource: ${file.name}` : 'Course-wide download package',
                                  version: newResourceVer.trim() || 'v1.0',
                                  date: new Date().toISOString().split('T')[0],
                                  downloadAllowed: true,
                                  level: 'Course-wide',
                                  moduleId: null,
                                  downloadCount: 0,
                                  fileData,
                                  fileName,
                                  fileType,
                                  fileSize
                                };
                                setResources(prev => [...prev, newRes]);
                                logAction(`Created course-wide resource: ${newResourceTitle}`, currentRole);
                                setNewResourceTitle("");
                                setNewResourceVer("");
                                if (fileEl) fileEl.value = '';
                                alert('Course-wide resource added successfully.');
                              };

                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  saveResource(
                                    e.target.result,
                                    file.name,
                                    file.type,
                                    (file.size / (1024 * 1024)).toFixed(2) + ' MB'
                                  );
                                };
                                reader.readAsDataURL(file);
                              } else {
                                saveResource();
                              }
                            }}>Add Resource</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── QUESTION BANK ── */}
                  {adminTab === 'question-bank' && ['SuperAdmin', 'ContentAdmin'].includes(currentRole) && (
                    <div>
                      <div className="admin-content-header">
                        <div>
                          <h2 style={{margin: 0, fontSize: '1.5rem', fontWeight: 800}}>Question Bank</h2>
                          <p style={{margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.875rem'}}>Manage MCQ, True/False, and Multi-Select exam questions.</p>
                        </div>
                        <span className="badge badge-info" style={{fontSize: '0.85rem', padding: '6px 14px'}}>{questionBank.length} Questions</span>
                      </div>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px'}}>
                        {questionBank.map((q, qi) => (
                          <div key={q.id} className="checkout-card">
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '10px'}}>
                              <div style={{display: 'flex', gap: '6px', flexWrap: 'wrap'}}>
                                <span className="badge badge-info">Q{qi + 1}</span>
                                <span className="badge badge-warning">{q.type}</span>
                                <span className={`badge ${q.difficulty === 'Easy' ? 'badge-success' : q.difficulty === 'Hard' ? 'badge-danger' : 'badge-warning'}`}>{q.difficulty}</span>
                                <span className="badge" style={{background: '#f1f5f9', color: '#475569'}}>{q.topic}</span>
                              </div>
                              <button className="btn btn-secondary" style={{padding: '3px 8px', fontSize: '0.73rem', color: 'var(--danger)', borderColor: 'var(--danger)', flexShrink: 0}} onClick={() => { if (window.confirm('Delete this question?')) { setQuestionBank(prev => prev.filter(qb => qb.id !== q.id)); logAction(`Deleted Q${q.id}`, currentRole); } }}><Trash size={11} /> Delete</button>
                            </div>
                            <p style={{fontWeight: 600, fontSize: '0.875rem', marginBottom: '10px', lineHeight: 1.5}}>{q.question}</p>
                            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px'}}>
                              {q.options.map((opt, oi) => (
                                <div key={oi} style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', borderRadius: 'var(--r-sm)', background: q.correct.includes(oi) ? '#d1fae5' : '#f8fafc', border: `1px solid ${q.correct.includes(oi) ? '#10b981' : 'var(--border)'}`, fontSize: '0.82rem'}}>
                                  {q.correct.includes(oi) ? <CheckCircle size={12} style={{color: '#10b981', flexShrink: 0}} /> : <div style={{width: '12px', height: '12px', borderRadius: '50%', border: '1.5px solid #cbd5e1', flexShrink: 0}} />}
                                  <span>{opt}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="checkout-card" style={{border: '2px dashed var(--border)', background: '#fafbff'}}>
                        <h4 style={{margin: '0 0 16px', fontWeight: 800}}><Plus size={15} style={{verticalAlign: 'middle', marginRight: '6px'}} />Add New Question</h4>
                        
                        <div className="form-group">
                          <label className="form-label">Question Text</label>
                          <textarea 
                            className="form-control" 
                            rows="2" 
                            placeholder="Enter the question text..." 
                            value={newQuestionText}
                            onChange={e => setNewQuestionText(e.target.value)}
                          />
                        </div>
                        
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '14px'}}>
                          <div className="form-group" style={{marginBottom: 0}}>
                            <label className="form-label">Type</label>
                            <select 
                              className="form-control" 
                              value={newQuestionType}
                              onChange={e => {
                                const t = e.target.value;
                                setNewQuestionType(t);
                                setNewQuestionCorrect([]);
                                if (t === 'True-False') {
                                  setNewQuestionOptions(['True', 'False']);
                                } else {
                                  setNewQuestionOptions(['', '', '', '']);
                                }
                              }}
                            >
                              <option>MCQ</option>
                              <option>True-False</option>
                              <option>Multi-Select</option>
                            </select>
                          </div>
                          <div className="form-group" style={{marginBottom: 0}}>
                            <label className="form-label">Difficulty</label>
                            <select 
                              className="form-control" 
                              value={newQuestionDiff}
                              onChange={e => setNewQuestionDiff(e.target.value)}
                            >
                              <option>Easy</option>
                              <option>Medium</option>
                              <option>Hard</option>
                            </select>
                          </div>
                          <div className="form-group" style={{marginBottom: 0}}>
                            <label className="form-label">Topic</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="e.g. Valuation" 
                              value={newQuestionTopic}
                              onChange={e => setNewQuestionTopic(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Options Input Section */}
                        <div className="form-group" style={{marginBottom: '16px'}}>
                          <label className="form-label">Configure Options & Select Correct Answer(s)</label>
                          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            {newQuestionOptions.map((opt, oi) => {
                              const isChecked = newQuestionCorrect.includes(oi);
                              return (
                                <div key={oi} style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                  {/* Selection Checkbox/Radio */}
                                  {newQuestionType === 'Multi-Select' ? (
                                    <input 
                                      type="checkbox" 
                                      checked={isChecked}
                                      style={{width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)'}}
                                      onChange={() => {
                                        setNewQuestionCorrect(prev => 
                                          isChecked ? prev.filter(v => v !== oi) : [...prev, oi]
                                        );
                                      }}
                                    />
                                  ) : (
                                    <input 
                                      type="radio" 
                                      name="new-question-correct-radio"
                                      checked={isChecked}
                                      style={{width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)'}}
                                      onChange={() => setNewQuestionCorrect([oi])}
                                    />
                                  )}
                                  
                                  {/* Option Input Field */}
                                  <input 
                                    type="text" 
                                    className="form-control" 
                                    style={{flex: 1}}
                                    placeholder={`Option ${String.fromCharCode(65 + oi)}`} 
                                    value={opt}
                                    readOnly={newQuestionType === 'True-False'}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setNewQuestionOptions(prev => {
                                        const nextOpts = [...prev];
                                        nextOpts[oi] = val;
                                        return nextOpts;
                                      });
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <button 
                          className="btn btn-primary" 
                          onClick={() => {
                            const trimmedText = newQuestionText.trim();
                            const trimmedTopic = newQuestionTopic.trim();
                            const cleanedOptions = newQuestionOptions.map(o => o.trim()).filter(Boolean);
                            
                            if (!trimmedText) { alert('Please enter question text.'); return; }
                            if (cleanedOptions.length < 2) { alert('Please configure at least 2 options.'); return; }
                            if (newQuestionCorrect.length === 0) { alert('Please select at least one correct answer.'); return; }

                            setQuestionBank(prev => [...prev, { 
                              id: Date.now(), 
                              type: newQuestionType, 
                              question: trimmedText, 
                              options: newQuestionOptions, 
                              correct: newQuestionCorrect, 
                              difficulty: newQuestionDiff, 
                              topic: trimmedTopic || 'General'
                            }]);
                            
                            logAction(`Added question: ${trimmedText.substring(0, 40)}`, currentRole);
                            
                            // Reset state
                            setNewQuestionText("");
                            setNewQuestionTopic("");
                            setNewQuestionCorrect([]);
                            if (newQuestionType === 'True-False') {
                              setNewQuestionOptions(['True', 'False']);
                            } else {
                              setNewQuestionOptions(['', '', '', '']);
                            }
                            alert('Question added successfully.');
                          }}
                        >
                          <Plus size={14} /> Add Question
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── SETTINGS ── */}
                  {adminTab === 'settings' && currentRole === 'SuperAdmin' && (
                    <div>
                      <div className="admin-content-header">
                        <div>
                          <h2 style={{margin: 0, fontSize: '1.5rem', fontWeight: 800}}>LMS Settings</h2>
                          <p style={{margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.875rem'}}>Configure pricing, certification rules, legal text, and system toggles.</p>
                        </div>
                        <button className="btn btn-primary" style={{padding: '8px 20px', fontSize: '0.85rem'}} onClick={() => { logAction('Saved LMS settings', 'SuperAdmin'); alert('Settings saved.'); }}><Check size={14} /> Save All</button>
                      </div>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                        <div className="checkout-card" style={{padding: '16px 20px', borderRadius: '8px'}}>
                          <h4 style={{margin: '0 0 14px', fontWeight: 800, fontSize: '1rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px'}}><CreditCard size={16} style={{color: 'var(--primary)'}} /> Pricing & GST</h4>
                          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px'}}>
                            <div className="form-group" style={{margin: 0}}>
                              <label className="form-label" style={{fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)'}}>Base Course Fee (₹)</label>
                              <input type="number" className="form-control" style={{fontSize: '0.82rem', padding: '8px'}} value={settings.price} onChange={e => setSettings({...settings, price: parseInt(e.target.value) || 0})} />
                            </div>
                            <div className="form-group" style={{margin: 0}}>
                              <label className="form-label" style={{fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)'}}>GST Rate (%)</label>
                              <input type="number" className="form-control" style={{fontSize: '0.82rem', padding: '8px'}} value={settings.gstRate} onChange={e => setSettings({...settings, gstRate: parseInt(e.target.value) || 0})} />
                            </div>
                          </div>
                          <div style={{marginTop: '12px', padding: '10px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', fontSize: '0.8rem', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px'}}>
                            <span>💡 Total billed to learner: <strong>₹{(settings.price * (1 + settings.gstRate / 100)).toLocaleString('en-IN')}</strong> (incl. GST)</span>
                          </div>
                        </div>

                        <div className="checkout-card" style={{padding: '16px 20px', borderRadius: '8px'}}>
                          <h4 style={{margin: '0 0 14px', fontWeight: 800, fontSize: '1rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px'}}><Award size={16} style={{color: 'var(--accent)'}} /> Certificate Configuration</h4>
                          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px'}}>
                            <div className="form-group" style={{margin: 0}}>
                              <label className="form-label" style={{fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)'}}>ABB ID Format</label>
                              <input type="text" className="form-control" style={{fontSize: '0.82rem', padding: '8px'}} value={settings.certIdFormat} onChange={e => setSettings({...settings, certIdFormat: e.target.value})} />
                            </div>
                            <div className="form-group" style={{margin: 0}}>
                              <label className="form-label" style={{fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)'}}>Authorized Signatory</label>
                              <input type="text" className="form-control" style={{fontSize: '0.82rem', padding: '8px'}} value={settings.signatoryName} onChange={e => setSettings({...settings, signatoryName: e.target.value})} />
                            </div>
                          </div>
                        </div>

                        <div className="checkout-card" style={{padding: '16px 20px', borderRadius: '8px'}}>
                          <h4 style={{margin: '0 0 14px', fontWeight: 800, fontSize: '1rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px'}}><Settings size={16} style={{color: 'var(--text-muted)'}} /> System Toggles</h4>
                          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            {[
                              { key: 'automaticIssuance', label: 'Auto-Issue Certificate on Exam Pass', desc: 'Automatically generate certificate when a learner scores ≥80%.' },
                              { key: 'sequentialMode', label: 'Enforce Sequential Lesson Progression', desc: 'Learners must complete each lesson before unlocking the next.' },
                              { key: 'revealAnswers', label: 'Reveal Correct Answers After Exam', desc: 'Show learners the correct answers after exam submission.' },
                            ].map(t => (
                              <label key={t.key} style={{display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 14px', border: `1.5px solid ${settings[t.key] ? 'var(--primary)' : 'var(--border)'}`, borderRadius: '6px', cursor: 'pointer', background: settings[t.key] ? '#eff6ff' : '#fff', transition: 'all .15s'}}>
                                <input type="checkbox" checked={settings[t.key]} onChange={e => setSettings({...settings, [t.key]: e.target.checked})} style={{marginTop: '3px', width: '15px', height: '15px', accentColor: 'var(--primary)', flexShrink: 0}} />
                                <div>
                                  <div style={{fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-dark)'}}>{t.label}</div>
                                  <div style={{fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px'}}>{t.desc}</div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="checkout-card" style={{padding: '16px 20px', borderRadius: '8px'}}>
                          <h4 style={{margin: '0 0 14px', fontWeight: 800, fontSize: '1rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px'}}><FileText size={16} style={{color: 'var(--info)'}} /> Legal Terms Configurator</h4>
                          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px'}}>
                            <div className="form-group" style={{margin: 0}}>
                              <label className="form-label" style={{fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)'}}>Legal Version</label>
                              <input type="text" className="form-control" style={{fontSize: '0.82rem', padding: '8px'}} value={settings.legalVersion} onChange={e => setSettings({...settings, legalVersion: e.target.value})} />
                            </div>
                            <div className="form-group" style={{margin: 0}}>
                              <label className="form-label" style={{fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)'}}>Disclaimer Text</label>
                              <textarea rows="2" className="form-control" style={{fontSize: '0.82rem', padding: '8px'}} value={settings.legalText} onChange={e => setSettings({...settings, legalText: e.target.value})} />
                            </div>
                          </div>
                        </div>

                        <div className="checkout-card" style={{padding: '16px 20px', borderRadius: '8px', borderColor: 'var(--accent)'}}>
                          <h4 style={{margin: '0 0 10px', fontWeight: 800, fontSize: '1rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px'}}><Award size={16} style={{color: 'var(--accent)'}} /> Manual Certification Approval</h4>
                          <p style={{fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px'}}>Issue certification manually for any learner who has met all requirements.</p>
                          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                            {learners.map(l => (
                              <button key={l.id} className={`btn ${l.stage === 'Certified' ? 'btn-secondary' : 'btn-accent'}`} disabled={l.stage === 'Certified'} style={{padding: '6px 14px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px'}}
                                onClick={() => { setLearners(prev => prev.map(u => u.id === l.id ? {...u, stage: 'Certified'} : u)); logAction(`Manually certified ${l.fullName}`, 'SuperAdmin'); alert(`Certificate issued for ${l.fullName}.`); }}>
                                {l.stage === 'Certified' ? <><CheckCircle size={12} /> {l.fullName}</> : <><Award size={12} /> Issue — {l.fullName}</>}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── AUDIT LOG ── */}
                  {adminTab === 'audit' && currentRole === 'SuperAdmin' && (
                    <div>
                      <div className="admin-content-header">
                        <div>
                          <h2 style={{margin: 0, fontSize: '1.5rem', fontWeight: 800}}>System Audit Log</h2>
                          <p style={{margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.875rem'}}>Tamper-evident log of all platform actions by timestamp and initiator role.</p>
                        </div>
                        <button className="btn btn-secondary" style={{fontSize: '0.85rem'}} onClick={() => alert('Audit log exported.')}><Download size={14} /> Export Log</button>
                      </div>
                      <div style={{marginBottom: '16px', position: 'relative'}}>
                        <Search size={14} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)'}} />
                        <input type="text" className="form-control" placeholder="Filter by action or role..." style={{paddingLeft: '36px'}}
                          value={auditSearchQuery}
                          onChange={e => setAuditSearchQuery(e.target.value)} />
                      </div>
                      <div className="table-container">
                        <table className="data-table">
                          <thead><tr><th>Timestamp</th><th>Action</th><th>Role</th><th>IP Address</th></tr></thead>
                          <tbody>
                            {auditLogs
                              .filter(log => 
                                !auditSearchQuery ||
                                log.action.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
                                log.role.toLowerCase().includes(auditSearchQuery.toLowerCase())
                              )
                              .map((log, idx) => (
                                <tr key={idx} className="audit-row">
                                  <td style={{fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap'}}>{new Date(log.timestamp).toLocaleString()}</td>
                                  <td style={{fontSize: '0.875rem'}}>{log.action}</td>
                                  <td><span className={`badge ${log.role === 'SuperAdmin' ? 'badge-danger' : log.role === 'Learner' ? 'badge-success' : 'badge-info'}`}>{log.role}</span></td>
                                  <td style={{fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)'}}>{log.ip}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </section>
              </div>
            )}
          </>
        )}

        {/* --- SCREEN 7: CREDENTIALS VERIFICATION --- */}
        {currentScreen === "verification" && (
          <div style={{maxWidth: '650px', margin: '0 auto'}} className="checkout-card">
            <h2 style={{textAlign: 'center', marginBottom: '16px'}}>Public Credentials Verification</h2>
            <p className="text-muted" style={{textAlign: 'center', marginBottom: '24px', fontSize: '0.95rem'}}>
              Verify the validity of YBB-issued Authorised Business Broker certifications.
            </p>

            <div style={{display: 'flex', gap: '12px', marginBottom: '32px'}}>
              <input 
                type="text" 
                className="form-control" 
                defaultValue={settings.certIdFormat.replace("YYYY", "2026").replace("NNNN", "1049")} 
                placeholder="Enter unique ABB ID (e.g. YBB-ABB-YYYY-NNNN)" 
              />
              <button className="btn btn-primary" onClick={() => alert("Certificate verified: Active.")}>
                Verify Credentials
              </button>
            </div>

            <div style={{border: '1px dashed var(--accent)', padding: '24px', borderRadius: '8px', background: '#fffbeb'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #cbd5e1', paddingBottom: '12px', marginBottom: '12px'}}>
                <strong>Credential ID:</strong>
                <span style={{fontFamily: 'monospace', fontWeight: 700}}>
                  {settings.certIdFormat.replace("YYYY", "2026").replace("NNNN", "1049")}
                </span>
              </div>
              <div style={{display: 'flex', justifycontent: 'space-between', borderBottom: '1px solid #cbd5e1', paddingBottom: '12px', marginBottom: '12px'}}>
                <span>Learner:</span>
                <strong>{activeLearner.fullName}</strong>
              </div>
              <div style={{display: 'flex', justifycontent: 'space-between', borderBottom: '1px solid #cbd5e1', paddingBottom: '12px', marginBottom: '12px'}}>
                <span>Programme:</span>
                <strong>Authorised Business Broker Certification</strong>
              </div>
              <div style={{display: 'flex', justifycontent: 'space-between', borderBottom: '1px solid #cbd5e1', paddingBottom: '12px', marginBottom: '12px'}}>
                <span>Status:</span>
                <span className={`badge ${activeLearner.stage === "Certified" ? 'badge-success' : 'badge-warning'}`}>
                  {activeLearner.stage === "Certified" ? "Active / Valid" : "Verification Pending / Approval Needed"}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={{background: '#0f172a', color: '#94a3b8', borderTop: '4px solid var(--accent)', marginTop: 'auto'}}>
        <div style={{maxWidth: '1320px', margin: '0 auto', padding: '40px 28px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px'}}>
          <div>
            <div style={{fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: '8px'}}>Yoova Business Broking</div>
            <div style={{fontSize: '0.85rem', lineHeight: 1.7}}>The Authorised Business Broker (ABB) certification programme — India's professional standard for M&amp;A transaction advisory.</div>
          </div>
          <div>
            <div style={{fontWeight: 700, color: '#fff', marginBottom: '10px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '.06em'}}>Programme</div>
            {['Curriculum', 'Exam Overview', 'Certificate Verification', 'Alumni Testimonials'].map(link => (
              <div key={link} style={{fontSize: '0.85rem', marginBottom: '6px', cursor: 'pointer', transition: 'color .2s'}} onMouseOver={e => e.target.style.color='#fff'} onMouseOut={e => e.target.style.color=''}>{link}</div>
            ))}
          </div>
          <div>
            <div style={{fontWeight: 700, color: '#fff', marginBottom: '10px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '.06em'}}>Support</div>
            {['Contact Us', 'FAQ', 'Refund Policy', 'Privacy Policy'].map(link => (
              <div key={link} style={{fontSize: '0.85rem', marginBottom: '6px', cursor: 'pointer', transition: 'color .2s'}} onMouseOver={e => e.target.style.color='#fff'} onMouseOut={e => e.target.style.color=''}>{link}</div>
            ))}
          </div>
          <div>
            <div style={{fontWeight: 700, color: '#fff', marginBottom: '10px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '.06em'}}>Legal</div>
            <div style={{fontSize: '0.82rem', lineHeight: 1.7}}>The ABB Certificate is a private professional credential issued by YBB. It is not a statutory licence or government endorsement.</div>
          </div>
        </div>
        <div style={{borderTop: '1px solid #1e293b', textAlign: 'center', padding: '16px 28px', fontSize: '0.8rem'}}>
          &copy; 2026 Yoova Business Broking (YBB). All rights reserved. &nbsp;|&nbsp; ABB Certification Platform MVP v1.0
        </div>
      </footer>

      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: toast.type === 'error' ? '#fee2e2' : toast.type === 'warning' ? '#fef3c7' : toast.type === 'info' ? '#e0f2fe' : '#d1fae5',
          border: `1.5px solid ${toast.type === 'error' ? '#f87171' : toast.type === 'warning' ? '#f59e0b' : toast.type === 'info' ? '#38bdf8' : '#34d399'}`,
          color: toast.type === 'error' ? '#991b1b' : toast.type === 'warning' ? '#92400e' : toast.type === 'info' ? '#0369a1' : '#065f46',
          padding: '14px 22px',
          borderRadius: '8px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem',
          fontWeight: 700,
          animation: 'slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          maxWidth: '380px',
          wordBreak: 'break-word'
        }}>
          <span style={{fontSize: '1.2rem', lineHeight: 1}}>
            {toast.type === 'error' ? '❌' : toast.type === 'warning' ? '⚠️' : toast.type === 'info' ? 'ℹ️' : '✅'}
          </span>
          <div>{toast.message}</div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(120%) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default App;



