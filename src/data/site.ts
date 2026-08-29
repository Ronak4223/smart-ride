// Content ported verbatim from the original Smart Ride index.html.

export interface FaqItem { q: string; a: string }

export const FAQS: FaqItem[] = [
    { q:'What is a Smart Ride subscription?', a:'It\u2019s a fixed monthly plan that gives you a scheduled pickup and drop for a set route, instead of booking and paying for a ride every single day.' },
    { q:'How does monthly billing work?', a:'You\u2019re billed once a month for your chosen plan. The price is fixed up front, so there are no surprise fares at the end of the ride.' },
    { q:'Can I choose my pickup and drop locations?', a:'Yes. You set your pickup and drop points when you build your schedule, and can update them any time from the app.' },
    { q:'Can I change my schedule?', a:'Yes, you can adjust your days, pickup time and drop time. Plus and Pro plans include free rescheduling.' },
    { q:'What happens if I miss my ride?', a:'Your driver will wait for a short grace period. If you miss the pickup window, that ride is marked used, but you can reschedule future rides from the app.' },
    { q:'Can I cancel my subscription?', a:'Yes, subscriptions can be cancelled at any time from your account. Cancellation takes effect at the end of your current billing cycle.' },
    { q:'Can I pause my subscription?', a:'Yes. You can pause your plan for travel, holidays or any other reason, and resume it whenever you\u2019re ready.' },
    { q:'Are drivers verified?', a:'Every Smart Ride driver goes through background verification and document checks before joining the fleet.' },
    { q:'Can I track my ride?', a:'Yes, live tracking is available on Plus, Pro and Corporate plans directly from the Smart Ride app.' },
    { q:'Do you offer corporate subscriptions?', a:'Yes. Corporate plans include centralized billing, employee route management and dedicated support for teams.' },
    { q:'Can I change vehicles?', a:'Yes, you can upgrade or change your vehicle category when you renew your plan, subject to availability on your route.' },
    { q:'What happens if my driver is late?', a:'You\u2019ll be notified in the app with an updated ETA. Repeated delays are covered by our on-time reliability support.' }
  ];

export const PRD_SECTIONS: FaqItem[] = [
    { q:'Context', a:'<p>The Monthly Pickup &amp; Drop Service Platform is a subscription-based transportation solution designed for daily commuters such as office employees, students, and working professionals. Unlike on-demand ride services, this platform offers fixed pickup and drop locations, timings, and the same driver and vehicle for a defined subscription period (monthly, quarterly, or yearly). The system ensures reliability, safety, and predictable commuting costs through long-term service contracts.</p>' },
    { q:'Problem Statement', a:'<p>Daily commuters face multiple challenges such as:</p><ul><li>Inconsistent availability of daily cabs</li><li>Frequent driver and vehicle changes</li><li>Surge pricing and cost uncertainty</li><li>Safety concerns, especially for regular travellers</li><li>Time wasted in booking rides every day</li></ul><p>There is a need for a stable, affordable, and dependable commuting solution that provides consistent service with minimal daily effort.</p>' },
    { q:'Primary Objectives', a:'<ul><li>Provide reliable and fixed daily pickup &amp; drop services</li><li>Ensure consistency with the same driver and vehicle</li><li>Offer predictable pricing through subscription plans</li><li>Reduce daily ride booking dependency</li></ul>' },
    { q:'Secondary Objectives', a:'<ul><li>Improve commuter safety and trust</li><li>Enable recurring revenue through subscriptions</li><li>Simplify transport management for users and drivers</li><li>Support long-term driver engagement</li></ul>' },
    { q:'Scope of Work — In-Scope', a:'<ul><li>User registration and subscription management</li><li>Fixed route and schedule allocation</li><li>Driver and vehicle assignment</li><li>Online payment and invoicing</li><li>Notifications and alerts</li><li>Admin monitoring and support</li></ul>' },
    { q:'Scope of Work — Out of Scope', a:'<ul><li>On-demand ride booking</li><li>Inter-city travel service</li><li>Real-time fare negotiation</li></ul>' },
    { q:'Functional Requirements — User Module', a:'<ul><li>Signup/Login via mobile or email</li><li>Profile management with pickup &amp; drop details</li><li>Subscription plan selection (monthly/quarterly/yearly)</li><li>Fixed schedule and driver visibility</li><li>Online payments and invoice history</li><li>Service notifications and reminders</li></ul>' },
    { q:'Functional Requirements — Driver Module', a:'<ul><li>Driver onboarding and verification</li><li>Assigned route and user list</li><li>Daily attendance tracking</li><li>Earnings and payout summary</li></ul>' },
    { q:'Functional Requirements — Admin Module', a:'<ul><li>User and driver management</li><li>Subscription and pricing control</li><li>Driver-route assignment</li><li>Complaint and feedback management</li><li>Analytics dashboard</li></ul>' },
    { q:'Non-Functional Requirements', a:'<ul><li><b>Performance:</b> Fast response time (&lt;3 seconds)</li><li><b>Security:</b> Secure authentication and encrypted payments</li><li><b>Usability:</b> Mobile-responsive and user-friendly UI</li><li><b>Availability:</b> 99.5% system uptime</li><li><b>Scalability:</b> Ability to support multiple cities and users</li></ul>' },
    { q:'Technology Stack (Suggested)', a:'<ul><li><b>Frontend:</b> HTML5, CSS3, JavaScript, React.js / Next.js, Bootstrap / Tailwind CSS</li><li><b>Backend:</b> Node.js / Django / Spring Boot</li><li><b>Database:</b> MongoDB / PostgreSQL</li><li><b>Integrations:</b> Payment Gateway (Razorpay / Stripe), SMS &amp; Email Notifications, Maps API (Google Maps)</li><li><b>APIs:</b> REST APIs</li><li><b>Deployment:</b> AWS / Vercel / Netlify</li></ul>' },
    { q:'User Flow (High-Level)', a:'<ol><li>User registers/logs in</li><li>Enters pickup &amp; drop details</li><li>Selects subscription plan</li><li>Makes online payment</li><li>System assigns driver &amp; vehicle</li><li>Daily pickup &amp; drop service begins</li><li>Subscription renewal or cancellation</li></ol>' },
    { q:'Data Requirements — Core Entities', a:'<ul><li>Name, contact details</li><li>Pickup &amp; drop locations</li><li>Subscription history</li></ul>' },
    { q:'Data Requirements — Driver Data', a:'<ul><li>Personal details and documents</li><li>Vehicle information</li><li>Assigned routes and schedule</li></ul>' },
    { q:'Data Requirements — Transaction Data', a:'<ul><li>Payment records</li><li>Subscription status</li><li>Invoices and receipts</li></ul>' },
    { q:'Key Performance Indicators (KPIs)', a:'<ul><li>Number of active subscriptions</li><li>Monthly recurring revenue (MRR)</li><li>User retention rate</li><li>Driver utilization rate</li><li>Average complaint resolution time</li></ul>' },
    { q:'Assumptions', a:'<ul><li>Users prefer fixed schedules over flexible rides</li><li>Drivers are available for long-term contracts</li><li>Regular commuters will adopt subscription-based travel</li></ul>' },
    { q:'Constraints', a:'<ul><li>City-wise transport regulations</li><li>Driver availability during peak hours</li><li>Traffic and route dependencies</li></ul>' },
    { q:'Deliverables and Submission', a:'<ul><li>Functional web application</li><li>Admin dashboard</li><li>PRD &amp; technical documentation</li><li>Deployment-ready build</li></ul>' },
    { q:'Expected Impact', a:'<ul><li>Reduced commuting stress for daily travelers</li><li>Increased safety and reliability</li><li>Predictable transportation cost</li><li>Scalable subscription-based revenue model</li><li>Stable income opportunities for drivers</li></ul>' }
  ];

export const BLOG = [
    { cat:'Commuting', date:'12 Jul 2026', icon:'tips', title:'5 Ways to Make Your Daily Commute Better', excerpt:'Small changes to how you plan your ride can save real time every single week.', photoShot:'hero' },
    { cat:'Mobility', date:'28 Jun 2026', icon:'trend', title:'Why Monthly Ride Subscriptions Are Changing Urban Mobility', excerpt:'Fixed pricing and scheduled rides are reshaping how cities think about daily transport.', photoShot:'side' },
    { cat:'Guide', date:'14 Jun 2026', icon:'plan', title:'How to Choose the Right Daily Commute Plan', excerpt:'A quick guide to matching your route, schedule and vehicle needs to the right plan.', photoShot:'rear' }
  ];

export const DRIVERS = [
    { name:'Arjun Mehta', exp:'8 Years Experience', rating:'4.9', trips:'2,400+', langs:'Hindi, English' },
    { name:'Vikram Nair', exp:'6 Years Experience', rating:'4.8', trips:'1,950+', langs:'Hindi, English, Malayalam' },
    { name:'Sana Malik', exp:'5 Years Experience', rating:'4.9', trips:'1,600+', langs:'Hindi, English, Urdu' },
    { name:'Karan Bhatt', exp:'9 Years Experience', rating:'4.7', trips:'3,100+', langs:'Hindi, English, Punjabi' }
  ];

export const ROUTES = [
    { from:'Panipat', to:'Delhi', time:'~65 min', plans:'3 plans', price:'₹3,499' },
    { from:'Panipat', to:'Gurugram', time:'~80 min', plans:'3 plans', price:'₹3,999' },
    { from:'Panipat', to:'Chandigarh', time:'~2h 10m', plans:'2 plans', price:'₹5,499' },
    { from:'City Center', to:'Industrial Area', time:'~25 min', plans:'4 plans', price:'₹2,299' },
    { from:'Home', to:'Office', time:'~30 min', plans:'4 plans', price:'₹2,499' },
    { from:'Home', to:'College', time:'~22 min', plans:'3 plans', price:'₹2,199' }
  ];

export const TESTIMONIALS = [
    { name:'Priya Sharma', role:'Software Engineer · Gurugram', quote:'Smart Ride completely changed my daily commute. I don\u2019t have to worry about booking a cab every morning.' },
    { name:'Rohan Kapoor', role:'Marketing Manager · Delhi', quote:'Knowing exactly what I\u2019ll pay every month makes budgeting so much easier.' },
    { name:'Ananya Verma', role:'College Student · Panipat', quote:'The drivers are punctual and professional. It\u2019s become part of my routine.' }
  ];

export const COMPARE_ROWS: string[][] = [
    ['Monthly rides', '20', '40', 'Unlimited', 'Custom'],
    ['Pickup scheduling', '__CHECK__', '__CHECK__', '__CHECK__', '__CHECK__'],
    ['Vehicle category', 'Standard', 'Premium', 'Premium', 'Mixed fleet'],
    ['Live tracking', '__CROSS__', '__CHECK__', '__CHECK__', '__CHECK__'],
    ['Rescheduling', 'Limited', 'Free', 'Free', 'Free'],
    ['Driver preference', '__CROSS__', '__CROSS__', '__CHECK__', '__CHECK__'],
    ['Priority support', '__CROSS__', '__CROSS__', '__CHECK__', '__CHECK__'],
    ['Emergency support', '__CHECK__', '__CHECK__', '__CHECK__', '__CHECK__'],
    ['Extra stops', '__CROSS__', 'Limited', '__CHECK__', '__CHECK__'],
    ['Corporate billing', '__CROSS__', '__CROSS__', '__CROSS__', '__CHECK__']
  ];

/** Short contextual explanation shown when a comparison row is focused. */
export const COMPARE_NOTES: Record<string, string> = {
  'Monthly rides': 'One ride is a single pickup or drop leg, counted against your plan each month.',
  'Pickup scheduling': 'Set your pickup and drop times once; the same slot repeats every working day.',
  'Vehicle category': 'The class of vehicle assigned to your route for the whole subscription period.',
  'Live tracking': 'Follow your assigned vehicle in real time from the app on the day of travel.',
  'Rescheduling': 'Move a ride to a different time or skip a day without losing the ride.',
  'Driver preference': 'Request and keep the same driver on your route wherever availability allows.',
  'Priority support': 'Your requests move to the front of the support queue with faster response times.',
  'Emergency support': '24/7 emergency assistance and an in-app SOS during every active ride.',
  'Extra stops': 'Add an additional pickup or drop point along your existing route.',
  'Corporate billing': 'Centralized invoicing, employee route management and consolidated monthly billing.',
};


export function initials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase();
}
