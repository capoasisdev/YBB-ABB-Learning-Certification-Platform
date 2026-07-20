import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Award, CheckCircle, Lock, Play, Download, Upload, AlertCircle, Home,
  HelpCircle, Shield, Settings, Users, CreditCard, Clock, FileText, Check, X, ArrowRight, RefreshCw, LogOut, CheckSquare, Search, Eye, Filter, Trash, Plus, Tag, HelpCircle as FaqIcon, Mail, Target, Award as CertIcon, Star
} from 'lucide-react';

// --- MOCK DATABASE / DEFAULT STATES ---
const INITIAL_MODULES = [
  {
    id: 1,
    title: "Module 1: Foundations of Business Broking",
    lessons: [
      { id: "1-1", title: "1.1 Introduction to the M&A Brokerage Profession", duration: "12 mins", summary: "Overview of buy-side, sell-side, and transaction advisory roles.", videoUrl: "lesson11.mp4" },
      { id: "1-2", title: "1.2 Regulatory Context & YBB Professional Standard", duration: "18 mins", summary: "Understanding the boundary of professional certifications vs state licenses.", videoUrl: "lesson12.mp4" },
      { id: "1-3", title: "1.3 Anatomy of a Business Sale Transaction", duration: "15 mins", summary: "Step-by-step breakdown of the deal lifecycle from listing to close.", videoUrl: "lesson13.mp4" },
      { id: "1-4", title: "1.4 Introduction to Key Financial Terminology", duration: "14 mins", summary: "EBITDA, SDE, Net Working Capital, and deal multiples explained.", videoUrl: "lesson14.mp4" },
      { id: "1-5", title: "1.5 Code of Conduct & Client Representation Ethics", duration: "20 mins", summary: "Fiduciary duties, confidentiality obligations, and conflict of interest rules.", videoUrl: "lesson15.mp4" }
    ]
  },
  {
    id: 2,
    title: "Module 2: Business Valuation & Financial Analysis",
    lessons: [
      { id: "2-1", title: "2.1 Recasting Profit & Loss Statements", duration: "22 mins", summary: "Adjusting owner-operator add-backs to calculate Seller's Discretionary Earnings (SDE).", videoUrl: "lesson21.mp4" },
      { id: "2-2", title: "2.2 Valuation Methodologies: Multiple of Earnings", duration: "25 mins", summary: "Applying industry-specific valuation multiples based on risk profile.", videoUrl: "lesson22.mp4" },
      { id: "2-3", title: "2.3 Asset-Based & Liquidation Valuation", duration: "19 mins", summary: "Balance-sheet driven valuations for asset-heavy and distressed businesses.", videoUrl: "lesson23.mp4" },
      { id: "2-4", title: "2.4 Market Comparables & Precedent Transactions", duration: "21 mins", summary: "Using transaction databases and deal comps to benchmark asking prices.", videoUrl: "lesson24.mp4" },
      { id: "2-5", title: "2.5 Valuation Report Structuring & Presentation", duration: "18 mins", summary: "How to present valuation findings to business owners and buyers professionally.", videoUrl: "lesson25.mp4" }
    ]
  },
  {
    id: 3,
    title: "Module 3: Marketing a Business for Sale",
    lessons: [
      { id: "3-1", title: "3.1 Blind Profile & Teaser Document Creation", duration: "16 mins", summary: "Crafting compelling anonymous teasers that attract qualified buyer enquiries.", videoUrl: "lesson31.mp4" },
      { id: "3-2", title: "3.2 Confidential Information Memorandum (CIM)", duration: "28 mins", summary: "Full structure and content of a professional CIM package.", videoUrl: "lesson32.mp4" },
      { id: "3-3", title: "3.3 Buyer Sourcing & Targeted Outreach", duration: "17 mins", summary: "Strategic approaches to identify and approach financial and strategic buyers.", videoUrl: "lesson33.mp4" },
      { id: "3-4", title: "3.4 Digital Listings & Platform Syndication", duration: "14 mins", summary: "Using online marketplaces and proprietary buyer databases for deal exposure.", videoUrl: "lesson34.mp4" },
      { id: "3-5", title: "3.5 Managing Buyer Enquiries & NDA Execution", duration: "20 mins", summary: "Screening buyers, enforcing NDAs, and releasing confidential information appropriately.", videoUrl: "lesson35.mp4" }
    ]
  },
  {
    id: 4,
    title: "Module 4: Buyer Qualification & Management",
    lessons: [
      { id: "4-1", title: "4.1 Buyer Categories: Financial vs Strategic", duration: "15 mins", summary: "How private equity, family offices, and strategic acquirers differ in intent and approach.", videoUrl: "lesson41.mp4" },
      { id: "4-2", title: "4.2 Buyer Qualification Criteria & Scripts", duration: "18 mins", summary: "Evaluating financial capacity, operational fit, and deal readiness.", videoUrl: "lesson42.mp4" },
      { id: "4-3", title: "4.3 Buyer Financing: Bank Loans & Seller Notes", duration: "22 mins", summary: "How buyers finance acquisitions through banks, SBA-equivalents, and seller financing.", videoUrl: "lesson43.mp4" },
      { id: "4-4", title: "4.4 Conducting Business Presentations & Site Visits", duration: "17 mins", summary: "Facilitating seller-buyer meetings while maintaining confidentiality and control.", videoUrl: "lesson44.mp4" },
      { id: "4-5", title: "4.5 Letter of Intent (LOI): Drafting & Negotiation", duration: "24 mins", summary: "Key LOI components: price, structure, exclusivity, contingencies, and closing timelines.", videoUrl: "lesson45.mp4" }
    ]
  },
  {
    id: 5,
    title: "Module 5: Due Diligence Process",
    lessons: [
      { id: "5-1", title: "5.1 Due Diligence Overview & Deal Room Setup", duration: "16 mins", summary: "Organising a virtual data room with financial, legal, and operational documents.", videoUrl: "lesson51.mp4" },
      { id: "5-2", title: "5.2 Financial Due Diligence Checklist", duration: "25 mins", summary: "Reviewing tax returns, P&L statements, accounts receivable, and EBITDA adjustments.", videoUrl: "lesson52.mp4" },
      { id: "5-3", title: "5.3 Operational & HR Due Diligence", duration: "18 mins", summary: "Staff contracts, vendor agreements, IP rights, and operational continuity checks.", videoUrl: "lesson53.mp4" },
      { id: "5-4", title: "5.4 Legal & Compliance Due Diligence", duration: "20 mins", summary: "Licences, litigation risk, regulatory compliance, and pending liabilities.", videoUrl: "lesson54.mp4" },
      { id: "5-5", title: "5.5 Managing Buyer Concerns During Due Diligence", duration: "15 mins", summary: "Keeping deals from falling apart when issues are discovered post-LOI.", videoUrl: "lesson55.mp4" }
    ]
  },
  {
    id: 6,
    title: "Module 6: Deal Structuring & Negotiation",
    lessons: [
      { id: "6-1", title: "6.1 Asset Sale vs. Share Sale: Tax & Liability Implications", duration: "22 mins", summary: "Choosing the right deal structure for seller tax efficiency and buyer protection.", videoUrl: "lesson61.mp4" },
      { id: "6-2", title: "6.2 Earn-Outs, Seller Financing & Deferred Consideration", duration: "20 mins", summary: "Structuring performance-linked payments and bridging valuation gaps.", videoUrl: "lesson62.mp4" },
      { id: "6-3", title: "6.3 Negotiation Frameworks & Tactics", duration: "18 mins", summary: "Principled negotiation, BATNA analysis, and closing concessions strategically.", videoUrl: "lesson63.mp4" },
      { id: "6-4", title: "6.4 Representations, Warranties & Indemnities", duration: "24 mins", summary: "Key legal protections for both parties in a business sale agreement.", videoUrl: "lesson64.mp4" },
      { id: "6-5", title: "6.5 Post-LOI Exclusivity & Preventing Deal Leakage", duration: "14 mins", summary: "Managing deal momentum and preventing buyers from backing out post-exclusivity.", videoUrl: "lesson65.mp4" }
    ]
  },
  {
    id: 7,
    title: "Module 7: Closing the Transaction",
    lessons: [
      { id: "7-1", title: "7.1 Sale & Purchase Agreement (SPA) Overview", duration: "25 mins", summary: "Key clauses, conditions precedent, and closing mechanics in the SPA.", videoUrl: "lesson71.mp4" },
      { id: "7-2", title: "7.2 Working with Lawyers, CAs, and Advisors", duration: "15 mins", summary: "Coordinating a professional advisory team through the closing process.", videoUrl: "lesson72.mp4" },
      { id: "7-3", title: "7.3 Funds Flow, Escrow & Settlement", duration: "19 mins", summary: "Payment mechanics, escrow releases, and funds-flow waterfalls.", videoUrl: "lesson73.mp4" },
      { id: "7-4", title: "7.4 Transition & Handover Planning", duration: "17 mins", summary: "Staff, customer, and vendor communication during business ownership transfer.", videoUrl: "lesson74.mp4" },
      { id: "7-5", title: "7.5 Post-Close Integration & Broker Obligations", duration: "13 mins", summary: "Retention support, referral obligations, and relationship maintenance post-close.", videoUrl: "lesson75.mp4" }
    ]
  },
  {
    id: 8,
    title: "Module 8: Client Management & Professional Practice",
    lessons: [
      { id: "8-1", title: "8.1 Listing Agreement & Engagement Terms", duration: "16 mins", summary: "Drafting and presenting listing agreements, exclusivity, and commission structures.", videoUrl: "lesson81.mp4" },
      { id: "8-2", title: "8.2 Managing Seller Expectations", duration: "18 mins", summary: "Educating sellers on realistic valuations, timelines, and deal certainty.", videoUrl: "lesson82.mp4" },
      { id: "8-3", title: "8.3 CRM & Pipeline Management", duration: "14 mins", summary: "Maintaining an organised deal pipeline using CRM tools and activity tracking.", videoUrl: "lesson83.mp4" },
      { id: "8-4", title: "8.4 Business Development & Referral Networks", duration: "20 mins", summary: "Building referral relationships with accountants, lawyers, and wealth managers.", videoUrl: "lesson84.mp4" },
      { id: "8-5", title: "8.5 Professional Practice Standards & Compliance", duration: "17 mins", summary: "Maintaining records, compliance checklists, and YBB professional standards.", videoUrl: "lesson85.mp4" }
    ]
  },
  {
    id: 9,
    title: "Module 9: Industry Sectors & Specialisation",
    lessons: [
      { id: "9-1", title: "9.1 Retail & Food-Service Business Transactions", duration: "18 mins", summary: "Lease assignments, goodwill valuation, and inventory deals in retail and F&B.", videoUrl: "lesson91.mp4" },
      { id: "9-2", title: "9.2 Manufacturing & Industrial Business Sales", duration: "21 mins", summary: "Asset-heavy transactions, plant valuation, and environmental due diligence.", videoUrl: "lesson92.mp4" },
      { id: "9-3", title: "9.3 Professional Services & Technology Companies", duration: "19 mins", summary: "Recurring revenue models, client retention risk, and IP valuation in services/tech.", videoUrl: "lesson93.mp4" },
      { id: "9-4", title: "9.4 Healthcare & Education Businesses", duration: "17 mins", summary: "Regulatory licences, patient/student databases, and sector-specific compliance.", videoUrl: "lesson94.mp4" },
      { id: "9-5", title: "9.5 E-Commerce & Digital Asset Transactions", duration: "22 mins", summary: "Valuing DTC brands, Amazon stores, SaaS products, and domain assets.", videoUrl: "lesson95.mp4" }
    ]
  },
  {
    id: 10,
    title: "Module 10: Certification Readiness & Capstone",
    lessons: [
      { id: "10-1", title: "10.1 ABB Exam Strategy & Question Patterns", duration: "14 mins", summary: "Exam structure, MCQ patterns, and time management strategies for the final assessment.", videoUrl: "lesson101.mp4" },
      { id: "10-2", title: "10.2 Case Study: End-to-End Deal Simulation", duration: "30 mins", summary: "Full transaction walkthrough: valuation to SPA signing using a realistic case study.", videoUrl: "lesson102.mp4" },
      { id: "10-3", title: "10.3 Certificate, ABB ID & Credential Verification", duration: "10 mins", summary: "How your unique ABB ID is generated, certificate issued, and verified by third parties.", videoUrl: "lesson103.mp4" },
      { id: "10-4", title: "10.4 Continuing Professional Development (CPD)", duration: "12 mins", summary: "Staying current with M&A trends, annual renewal, and YBB community membership.", videoUrl: "lesson104.mp4" },
      { id: "10-5", title: "10.5 YBB Code of Conduct & Professional Obligations", duration: "16 mins", summary: "Final declaration, professional obligations, and ethical standards of an ABB holder.", videoUrl: "lesson105.mp4" }
    ]
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

// --- HISTORY API ROUTER ---
// Maps internal screen names Ã¢â€ â€™ URL paths (clean, no hash)
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
  const [currentRole, setCurrentRole] = useState("Visitor"); 
  const [currentScreen, setCurrentScreen] = useState(pathToScreen); 
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [cohortFilter, setCohortFilter] = useState("All"); 

  // Coupon / Pricing state
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // System Configurations
  const [settings, setSettings] = useState({
    price: 15000,
    gstRate: 18,
    automaticIssuance: false,
    sequentialMode: true,
    certIdFormat: "YBB-ABB-YYYY-NNNN",
    signatoryName: "Yoova Executive Director",
    legalVersion: "1.0",
    legalText: "Disclaimers: The Authorised Business Broker (ABB) Certificate is professional credentials issued by Yoova Business Broking. It is not a statutory or government license, nor does it guarantee transaction flow, employment, or specific income outcomes.",
    revealAnswers: false
  });

  // User database simulation
  const [learners, setLearners] = useState([
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
  ]);
  const activeLearner = learners[0]; 

  // Recover Account
  const [recoveryEmail, setRecoveryEmail] = useState("");

  // Databases
  const [modules, setModules] = useState(INITIAL_MODULES);
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [questionBank, setQuestionBank] = useState(INITIAL_QUESTIONS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Active Lesson
  const [activeLessonId, setActiveLessonId] = useState("1-3");
  const [watchPercentage, setWatchPercentage] = useState(0);

  // Assignment submissions
  const [assignments, setAssignments] = useState([
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
  ]);
  const [newAssignmentFile, setNewAssignmentFile] = useState("");
  const [uploadVals, setUploadVals] = useState({ 'as-1': '', 'as-2': '', 'as-3': '' });

  // Exam States
  const [examState, setExamState] = useState({
    started: false,
    completed: false,
    answers: {}, 
    timeLeft: 300,
    attempts: 0,
    score: 0,
    passed: false
  });
  const examTimer = useRef(null);

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

  // System Audit Logs
  const [auditLogs, setAuditLogs] = useState([
    { timestamp: "2026-07-20T10:00:00Z", action: "User Registration", role: "Visitor", ip: "192.168.1.45" },
    { timestamp: "2026-07-20T11:15:00Z", action: "Admin Configured GST details", role: "SuperAdmin", ip: "192.168.1.1" }
  ]);

  const logAction = (action, role) => {
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

  // Sync back-button / forward-button Ã¢â€ â€™ screen state
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
      passed: passed
    }));

    logAction(`Submitted Exam. Score: ${percentage}%. Result: ${passed ? 'PASSED' : 'FAILED'}`, "Learner");
    
    if (passed && settings.automaticIssuance) {
      setLearners(prev => prev.map(l => l.id === activeLearner.id ? { ...l, stage: "Certified" } : l));
      logAction("Certificate automatically generated on passing exam", "System");
    }
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
                  { step: "4", title: "Timed MCQ Final Examination", desc: "Score Ã¢â€°Â¥80% on a 50-question timed assessment covering all 10 modules." },
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
                  <strong style={{fontSize: '1.2rem', color: 'var(--primary)'}}>{faqOpenIndex === idx ? 'ÃƒÂ¢Ã‹â€ ’' : '+'}</strong>
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
                      if (item.tab === 'exam' && !examState.started) {
                        setExamState(prev => ({ ...prev, started: true }));
                      }
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
                    <div className="dash-nav-item" style={{color: '#fbbf24'}}>
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
                      <div className="profile-avatar-ring">
                        <img src={activeLearner.photo} alt="Profile" />
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
                  {(() => {
                    const [saved, setSaved] = React.useState(false);
                    return (
                      <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            logAction('Updated profile information', 'Learner');
                            setSaved(true);
                            setTimeout(() => setSaved(false), 3000);
                          }}
                          style={{padding: '11px 28px'}}
                        >
                          <Check size={16} /> Save Changes
                        </button>
                        {saved && <div className="save-toast"><CheckCircle size={16} /> Profile updated successfully!</div>}
                      </div>
                    );
                  })()}

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


                  {/* MCQ TIMED EXAMINATION PANEL */}
                  {examState.started && !examState.completed && (
                    <div className="checkout-card" style={{borderColor: '#fcd34d'}}>
                      <div className="exam-header">
                        <div>
                          <h3 style={{margin: 0, color: '#92400e'}}>Final Exam in Progress</h3>
                          <span style={{fontSize: '0.85rem'}}>Attempt #{examState.attempts}</span>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '8px 16px', borderRadius: '4px', border: '1px solid #fde68a'}}>
                          <Clock size={18} className="text-warning" />
                          <strong style={{fontSize: '1.2rem', fontFamily: 'monospace'}}>
                            {Math.floor(examState.timeLeft / 60)}:{(examState.timeLeft % 60).toString().padStart(2, '0')}
                          </strong>
                        </div>
                      </div>

                      {questionBank.map((q, idx) => (
                        <div key={q.id} className="exam-question-card">
                          <p style={{fontWeight: 700, marginBottom: '12px'}}>
                            Question {idx + 1} ({q.type} - {q.difficulty}): {q.question}
                          </p>
                          {q.options.map((opt, optIdx) => {
                            const selectedArray = examState.answers[q.id] || [];
                            const isSelected = selectedArray.includes(optIdx);
                            return (
                              <div 
                                key={optIdx} 
                                onClick={() => {
                                  let newSel = [];
                                  if (q.type === "Multi-Select") {
                                    newSel = isSelected ? selectedArray.filter(v => v !== optIdx) : [...selectedArray, optIdx];
                                  } else {
                                    newSel = [optIdx];
                                  }
                                  setExamState(prev => ({
                                    ...prev,
                                    answers: { ...prev.answers, [q.id]: newSel } }));
                                }}
                                className={`option-item ${isSelected ? 'selected' : ''}`}
                              >
                                <input 
                                  type={q.type === "Multi-Select" ? "checkbox" : "radio"}
                                  checked={isSelected}
                                  onChange={() => {}} 
                                />
                                <span style={{marginLeft: '10px'}}>{opt}</span>
                              </div>
                            );
                          })}
                        </div>
                      ))}

                      <button className="btn btn-primary" onClick={() => submitExam()} style={{width: '100%'}}>
                        Submit Assessment
                      </button>
                    </div>
                  )}

                  {/* Exam results review */}
                  {examState.completed && (
                    <div className="checkout-card" style={{borderColor: examState.passed ? 'var(--success)' : 'var(--danger)'}}>
                      <h3>Assessment Results</h3>
                      <div style={{display: 'flex', gap: '20px', alignItems: 'center', margin: '20px 0'}}>
                        <div style={{
                          width: '80px', height: '80px', borderRadius: '50%', 
                          background: examState.passed ? '#d1fae5' : '#fee2e2',
                          color: examState.passed ? 'var(--success)' : 'var(--danger)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800
                        }}>
                          {examState.score}%
                        </div>
                        <div>
                          <h4>{examState.passed ? "Passed!" : "Attempt Failed"}</h4>
                          <p className="text-muted" style={{fontSize: '0.9rem'}}>
                            {examState.passed 
                              ? "Excellent! You satisfied the certification evaluation threshold of 80%."
                              : "The minimum passing score is 80%. Please review course materials and reattempt."}
                          </p>
                        </div>
                      </div>

                      {settings.revealAnswers && (
                        <div style={{background: '#f8fafc', padding: '16px', borderRadius: '6px', marginBottom: '16px'}}>
                          <h5>Answers Review:</h5>
                          {questionBank.map((q, idx) => (
                            <div key={q.id} style={{fontSize: '0.85rem', marginBottom: '8px'}}>
                              <strong>Q{idx+1}:</strong> {q.question} <br />
                              <span style={{color: 'var(--success)'}}>Correct: {q.correct.map(idx => q.options[idx]).join(', ')}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {examState.passed ? (
                        <div style={{background: '#f8fafc', padding: '16px', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '16px'}}>
                          <h4>Declaration and Code of Conduct</h4>
                          <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>
                            By checking the box below, you accept the official YBB Code of Conduct & Professional Obligations.
                          </p>
                          <label style={{display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', marginTop: '12px', fontWeight: 600}}>
                            <input 
                              type="checkbox" 
                              checked={activeLearner.stage === "Certified"}
                              onChange={(e) => {
                                setLearners(prev => prev.map(l => l.id === activeLearner.id ? { ...l, stage: e.target.checked ? "Certified" : "Enrolled" } : l));
                                logAction("Accepted Code of Conduct", "Learner");
                              }} 
                            />
                            <span>I accept the YBB Code of Conduct & final declaration.</span>
                          </label>
                        </div>
                      ) : (
                        <button className="btn btn-secondary" onClick={() => setExamState({ ...examState, started: true })}>
                          Reattempt Exam
                        </button>
                      )}

                      {/* Display Certificate download options */}
                      {activeLearner.stage === "Certified" && (
                        <div className="certificate-preview-container" style={{marginTop: '20px'}}>
                          <div className="certificate-title">Authorised Business Broker</div>
                          <div className="certificate-subtitle">This certifies that</div>
                          <div className="certificate-name">{activeLearner.fullName}</div>
                          <p style={{fontFamily: 'sans-serif', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                            Has successfully completed the comprehensive training program, practical exercises, and passed the certification examination.
                          </p>
                          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '40px', fontFamily: 'sans-serif', fontSize: '0.8rem'}}>
                            <div>
                              <strong>ABB ID:</strong> {settings.certIdFormat.replace("YYYY", "2026").replace("NNNN", "1049")}<br />
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
                      <p>Submit your practical deal exercises for reviewer evaluation. All 3 assignments must be approved before the exam unlocks.</p>
                    </div>
                    <div className="tab-header-stats" style={{flexShrink: 0}}>
                      {[
                        { value: assignments.filter(a => a.status === 'Approved').length, label: 'Approved' },
                        { value: assignments.filter(a => a.status === 'Under Review').length, label: 'In Review' },
                        { value: 3, label: 'Required' },
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
                    {[
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
                      },
                    ].map((task) => {
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
                                {existing.fileName && <div style={{marginTop: '5px', fontFamily: 'monospace', fontSize: '0.8rem'}}>📎 {existing.fileName}</div>}
                              </div>
                            )}

                            {/* Upload row — only if not yet approved */}
                            {status !== 'Approved' && (
                              <div className="assignment-upload-row">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={`e.g. ${task.fileHint}`}
                                  value={uploadVals[task.id] || ''}
                                  onChange={e => setUploadVals(prev => ({ ...prev, [task.id]: e.target.value }))}
                                  style={{maxWidth: '340px'}}
                                />
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    const val = uploadVals[task.id];
                                    if (!val) { alert('Please enter a filename'); return; }
                                    setAssignments(prev => {
                                      const filtered = prev.filter(a => a.id !== task.id);
                                      return [...filtered, {
                                        id: task.id,
                                        learnerName: activeLearner.fullName,
                                        title: task.title,
                                        status: 'Under Review',
                                        submittedDate: new Date().toLocaleDateString(),
                                        feedback: 'Awaiting review grading by Content Reviewer.',
                                        fileName: val,
                                        attempts: (existing?.attempts || 0) + 1
                                      }];
                                    });
                                    setUploadVals(prev => ({ ...prev, [task.id]: '' }));
                                    logAction(`Submitted assignment: ${task.title}`, 'Learner');
                                  }}
                                  style={{flexShrink: 0}}
                                >
                                  <Upload size={15} /> {existing ? 'Resubmit' : 'Submit'}
                                </button>
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
                                  <button className="btn btn-secondary" style={{padding: '4px 8px', fontSize: '0.8rem'}} onClick={() => {
                                    setResources(prev => prev.map(r => r.id === res.id ? { ...r, downloadCount: r.downloadCount + 1 } : r));
                                    alert(`Downloading ${res.title}`);
                                  }}>
                                    <Download size={14} /> Download ({res.downloadCount})
                                  </button>
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
                              label: 'Submit 3 case study assignments',
                              sub: `${assignments.filter(a => a.status === 'Approved').length} of 3 assignments approved`,
                              pct: Math.round((assignments.filter(a => a.status === 'Approved').length / 3) * 100),
                              done: assignments.filter(a => a.status === 'Approved').length >= 3,
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
                            <td><span style={{fontFamily: 'monospace'}}>{sub.fileName}</span></td>
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

              {/* ADMIN VIEW */}
              {["SuperAdmin", "ContentAdmin", "SupportAdmin"].includes(currentRole) && (
                <div className="checkout-card" style={{border: '1px solid var(--primary)'}}>
                  <h2>LMS Management System Console ({currentRole})</h2>

                  <div className="grid-3" style={{gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', margin: '20px 0'}}>
                    <div style={{background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
                      <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>TOTAL REVENUE</div>
                      <div style={{fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)'}}>
                        ₹{(orders.filter(o => o.status === "Success").reduce((acc, o) => acc + o.amount, 0)).toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div style={{background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
                      <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>ACTIVE ENROLMENTS</div>
                      <div style={{fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)'}}>{learners.length} Learners</div>
                    </div>
                    <div style={{background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
                      <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>EXAM PASS RATE</div>
                      <div style={{fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)'}}>100%</div>
                    </div>
                    <div style={{background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)'}}>
                      <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>CERTIFICATES ISSUED</div>
                      <div style={{fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)'}}>
                        {learners.filter(l => l.stage === "Certified").length} Active
                      </div>
                    </div>
                  </div>

                  {/* Super Admin settings */}
                  {currentRole === "SuperAdmin" && (
                    <div style={{background: '#eff6ff', padding: '20px', borderRadius: '8px', border: '1px solid #bfdbfe', marginBottom: '24px'}}>
                      <h4>LMS Business Rules settings</h4>
                      <div className="grid-3" style={{gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px', marginBottom: '0'}}>
                        <div className="form-group">
                          <label className="form-label">Base Course Fee (ÃƒÂ¢ - )</label>
                          <input 
                            type="number" 
                            className="form-control" 
                            value={settings.price}
                            onChange={(e) => setSettings({ ...settings, price: parseInt(e.target.value) || 0 })} 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">GST Rate (%)</label>
                          <input 
                            type="number" 
                            className="form-control" 
                            value={settings.gstRate} 
                            onChange={(e) => setSettings({ ...settings, gstRate: parseInt(e.target.value) || 0 })} 
                          />
                        </div>
                      </div>

                      <div className="grid-3" style={{gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '0', marginBottom: '20px'}}>
                        <div className="form-group">
                          <label className="form-label">ABB ID Certificate Format</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={settings.certIdFormat}
                            onChange={(e) => setSettings({ ...settings, certIdFormat: e.target.value })} 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Authorized Signatory Name</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={settings.signatoryName}
                            onChange={(e) => setSettings({ ...settings, signatoryName: e.target.value })} 
                          />
                        </div>
                      </div>

                      <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
                        <label style={{display: 'flex', gap: '8px', alignItems: 'center', fontWeight: 600}}>
                          <input 
                            type="checkbox" 
                            checked={settings.automaticIssuance}
                            onChange={(e) => setSettings({ ...settings, automaticIssuance: e.target.checked })} 
                          />
                          <span>Enable Automatic Certificate Issuance on Exam Pass</span>
                        </label>
                        <label style={{display: 'flex', gap: '8px', alignItems: 'center', fontWeight: 600}}>
                          <input 
                            type="checkbox" 
                            checked={settings.sequentialMode}
                            onChange={(e) => setSettings({ ...settings, sequentialMode: e.target.checked })} 
                          />
                          <span>Enforce Sequential Lesson Progression</span>
                        </label>
                        <label style={{display: 'flex', gap: '8px', alignItems: 'center', fontWeight: 600}}>
                          <input 
                            type="checkbox" 
                            checked={settings.revealAnswers}
                            onChange={(e) => setSettings({ ...settings, revealAnswers: e.target.checked })} 
                          />
                          <span>Reveal Correct Answers to Students</span>
                        </label>
                      </div>

                      <div style={{marginTop: '20px', borderTop: '1px solid #cbd5e1', paddingTop: '16px'}}>
                        <h5>Legal Terms & Disclaimers Configurator</h5>
                        <div className="form-group">
                          <label className="form-label">Legal Version</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={settings.legalVersion} 
                            onChange={(e) => setSettings({ ...settings, legalVersion: e.target.value })} 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Disclaimers Text</label>
                          <textarea 
                            rows="2" 
                            className="form-control" 
                            value={settings.legalText}
                            onChange={(e) => setSettings({ ...settings, legalText: e.target.value })} 
                          />
                        </div>
                      </div>

                      <div style={{marginTop: '20px', borderTop: '1px solid #cbd5e1', paddingTop: '16px'}}>
                        <h5>Manual Certification Approvals</h5>
                        <button 
                          className="btn btn-accent"
                          onClick={() => {
                            setLearners(prev => prev.map(l => l.id === activeLearner.id ? { ...l, stage: "Certified" } : l));
                            logAction("Manually approved certification for Rohan Kumar", "SuperAdmin");
                            alert("Certificate issued successfully.");
                          }}
                        >
                          Approve & Issue Certificate for Rohan Kumar
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Payment & Orders Manager tab */}
                  {(currentRole === "SuperAdmin" || currentRole === "SupportAdmin") && (
                    <div style={{background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '24px'}}>
                      <h4>YBB Orders & Payments Records</h4>
                      <div className="table-container">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Learner Name</th>
                              <th>Billed Amount</th>
                              <th>Status</th>
                              <th>Invoice No</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map(ord => (
                              <tr key={ord.id}>
                                <td>{ord.id}</td>
                                <td>{ord.learnerName}</td>
                                <td>₹{ord.amount.toLocaleString('en-IN')}</td>
                                <td><span className={`badge ${ord.status === "Success" ? 'badge-success' : 'badge-danger'}`}>{ord.status}</span></td>
                                <td>{ord.invoiceNo || "N/A"}</td>
                                <td>
                                  {ord.status === "Success" && (
                                    <button className="btn btn-secondary" style={{padding: '2px 6px', fontSize: '0.75rem', color: 'var(--danger)', borderColor: 'var(--danger)'}} onClick={() => {
                                      setOrders(prev => prev.map(o => o.id === ord.id ? { ...o, status: "Refunded" } : o));
                                      logAction(`Refunded order ${ord.id}`, currentRole);
                                    }}>
                                      Refund Order
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Content Admin Curriculum Configurator */}
                  {currentRole === "ContentAdmin" && (
                    <div style={{background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '24px'}}>
                      <h4>Course Curriculum Manager</h4>
                      {modules.map(mod => (
                        <div key={mod.id} style={{borderBottom: '1px solid #cbd5e1', paddingBottom: '12px', marginBottom: '12px'}}>
                          <strong>{mod.title}</strong>
                          <button 
                            className="btn btn-secondary"
                            style={{float: 'right', padding: '2px 6px', fontSize: '0.75rem'}}
                            onClick={() => {
                              const newTitle = prompt("Enter new title for module:", mod.title);
                              if (newTitle) setModules(prev => prev.map(m => m.id === mod.id ? { ...m, title: newTitle } : m));
                            }}
                          >
                            Rename
                          </button>
                          <div style={{paddingLeft: '20px', marginTop: '8px'}}>
                            {mod.lessons.map(les => (
                              <div key={les.id} style={{fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', padding: '4px 0'}}>
                                <span>{les.title} ({les.duration})</span>
                                <span style={{color: 'var(--primary)', cursor: 'pointer'}} onClick={() => {
                                  const url = prompt("Enter video stream URL:", les.videoUrl);
                                  if (url) logAction(`Replaced video for lesson ${les.id}`, "ContentAdmin");
                                }}>Replace Video</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Learner Overrides & Cohort progress view */}
                  {["SuperAdmin", "SupportAdmin"].includes(currentRole) && (
                    <div style={{background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '24px'}}>
                      <h4>Learner Cohort & Access Controls</h4>
                      <div style={{display: 'flex', gap: '10px', marginBottom: '16px'}}>
                        <input 
                          type="text" 
                          placeholder="Search learners by name or email..." 
                          className="form-control"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                        <select 
                          className="form-control" 
                          value={cohortFilter}
                          onChange={(e) => setCohortFilter(e.target.value)}
                        >
                          <option>All</option>
                          <option>Enrolled</option>
                          <option>Certified</option>
                        </select>
                        <button className="btn btn-secondary" onClick={() => alert("CSV Progress Report Exported successfully.")}>
                          Export CSV
                        </button>
                      </div>

                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Learner Name</th>
                            <th>Status</th>
                            <th>Curriculum Progress</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {learners
                            .filter(l => searchQuery === "" || l.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
                            .filter(l => cohortFilter === "All" || l.stage === cohortFilter)
                            .map(l => (
                              <tr key={l.id}>
                                <td>{l.fullName}</td>
                                <td>
                                  <span className={`badge ${l.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                                    {l.status}
                                  </span>
                                </td>
                                <td>{l.completedLessons.length} / {totalLessons} completed</td>
                                <td>
                                  <div style={{display: 'flex', gap: '8px'}}>
                                    <button 
                                      className="btn btn-secondary"
                                      onClick={() => {
                                        setLearners(prev => prev.map(u => u.id === l.id ? { ...u, completedLessons: modules.flatMap(m => m.lessons.map(ls => ls.id)) } : u));
                                        logAction(`Forced progress bypass for ${l.fullName}`, currentRole);
                                        alert("Progress bypassed to 100%");
                                      }}
                                      style={{padding: '4px 8px', fontSize: '0.8rem'}}
                                    >
                                      Bypass Videos
                                    </button>
                                    <button 
                                      className="btn btn-secondary"
                                      onClick={() => {
                                        setLearners(prev => prev.map(u => u.id === l.id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
                                        logAction(`Changed learner account status for ${l.fullName}`, currentRole);
                                      }}
                                      style={{padding: '4px 8px', fontSize: '0.8rem', color: 'var(--danger)', borderColor: 'var(--danger)'}}
                                    >
                                      {l.status === 'Active' ? 'Suspend' : 'Activate'}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Audit Logs */}
                  {currentRole === "SuperAdmin" && (
                    <div>
                      <h4>System Audit Log</h4>
                      <div className="table-container">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>Timestamp</th>
                              <th>Action</th>
                              <th>Initiator</th>
                            </tr>
                          </thead>
                          <tbody>
                            {auditLogs.map((log, idx) => (
                              <tr key={idx}>
                                <td style={{fontFamily: 'monospace', fontSize: '0.8rem'}}>{log.timestamp}</td>
                                <td>{log.action}</td>
                                <td><span className="badge badge-info">{log.role}</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
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
            <div style={{fontSize: '0.85rem', lineHeight: 1.7}}>The Authorised Business Broker (ABB) certification programme ÃƒÂ¢₹¬ -  India's professional standard for M&amp;A transaction advisory.</div>
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
    </div>
  );
}

export default App;



