# 💸 SmartSplit – Bill Tracker & Expense Splitter

SmartSplit is a real-world problem-solving web application designed to simplify expense tracking and bill splitting among roommates, friends, or any shared-living group. Say goodbye to manual tracking and awkward payment reminders—SmartSplit makes shared finance management transparent, fair, and easy to manage.

> “No more awkward money talks or forgotten dues — just smart, simple splitting.”

---

## 🌟 Features

- 🔄 **Split bills among group members**
- 💰 **Track total paid, owed, and pending**
- 📊 **Transaction history with monthly filters**
- 🧾 **Add, edit, delete shared expenses**
- 🔔 **Send reminders for dues**
- 👥 **Group and member management**
- 📱 **Mobile-first responsive UI**
- 🔒 **Data privacy-first (no third-party access)**

---

## 📸 UI Preview

> Figma-based design system with 6 responsive screens

![SmartSplit UI](./assets/smartsplit-preview.png)

---

## 🧠 Use Case

**Scenario: Shared Flat**

Pranay, Riya, and Akash live together in a rented apartment:
- Pranay pays ₹1000 for groceries
- Riya pays ₹600 for internet
- Each adds the expense to SmartSplit
- The app auto-splits and calculates:
  - Who owes whom
  - Transaction summary
  - Clear settlement steps

---

## 🔧 Tech Stack

| Layer        | Technology             |
|--------------|------------------------|
| Frontend     | React.js, Tailwind CSS |
| State Mgmt   | Context API / Zustand  |
| UI Design    | Figma + Lucide Icons   |
| Data Storage | Firebase / Supabase    |
| Animations   | Framer Motion (planned)|
| Deployment   | Vercel / Netlify       |

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js ≥ 18.x
- npm or yarn

### 📥 Clone the Repository
```bash
git clone https://github.com/pranay-bhatkar/Bill-splliter
cd Bill-splliter

npm install
# or
yarn install

npm run dev
# or
yarn dev

SmartSplit/
│
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Pages (React Router / Next.js)
│   ├── assets/              # Icons, illustrations
│   ├── context/             # Global state (users, transactions)
│   ├── utils/               # Helper functions
│   └── styles/              # Tailwind and global styles
│
├── .env                     # Environment variables
├── README.md
└── package.json


```


🛣 Roadmap
 Add expenses with custom split

 Transaction history and filtering

 Reminders and settlement tracking

 Export monthly PDF reports

 PWA support (offline usage)

 QR-based “Settle with UPI” option

 AI Insights (e.g., monthly spend trends)


 🎯 Why This Project?
Millions of people live in shared spaces—hostels, PGs, apartments—but most still track shared expenses manually or on WhatsApp. SmartSplit is a modern, privacy-first solution tailored to these real, everyday needs.


🛡 License
This project is licensed under the MIT License.


🤝 Contribution Guidelines
Fork this repo

Create a new branch: feature/your-feature

Make your changes and commit

Push and submit a pull request

All contributions, suggestions, and fixes are welcome!

📬 Contact
Author: Pranay Bhatkar
Email: pranaybhatkar81@gmail.com


---

### ✅ What's Included:
- Responsive design documentation
- All sections a real-world GitHub repo needs
- Deployment-ready structure

Would you like me to also generate:
- A `LICENSE` file (MIT)?
- A `.gitignore` file?
- Live deployment on Vercel or Netlify (step-by-step)?
Let me know and I’ll prepare it!