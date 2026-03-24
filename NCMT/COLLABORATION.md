# Team Collaboration Guide

## 🤝 Working Together on This Project

### Option 1: Shared Firebase Project (Recommended)

**Best for:** Small teams working on the same data

#### Setup:
1. **Team Lead:** Share the `.env.local` file contents privately (Slack, Discord, email)
2. **Team Members:**
   - Copy `.env.template` to `.env.local`
   - Paste the values provided by team lead
   - Run `npm install` and `npm run dev`

#### Pros:
- ✅ Everyone works on same database
- ✅ See each other's changes in real-time
- ✅ Quick setup - no Firebase account needed
- ✅ Single source of truth

#### Cons:
- ⚠️ Share Firebase quota
- ⚠️ Changes affect everyone

---

### Option 2: Individual Firebase Projects

**Best for:** Independent development/testing

#### Setup:
1. Each team member creates their own Firebase project
2. Follow [SETUP.md](./SETUP.md) guide
3. Use your own database

#### Pros:
- ✅ Independent development
- ✅ Own Firebase quota
- ✅ Can't break teammates' data

#### Cons:
- ⚠️ More setup required
- ⚠️ Data not shared

---

## 🔐 Security Rules

**IMPORTANT:** Never commit `.env.local` to Git!

Already protected:
- ✅ `.env.local` is in `.gitignore`
- ✅ Use `.env.template` as reference

---

## 📝 Git Workflow

### Before Pushing:
```bash
# Check what you're committing
git status

# Make sure .env.local is NOT listed
# If it appears, it should be in red (untracked)
```

### Safe to Commit:
- ✅ `.env.template` (template only)
- ✅ `.env.example` (template only)
- ✅ All source code files

### Never Commit:
- ❌ `.env.local` (has your real keys)
- ❌ `.env` (environment files)
- ❌ `node_modules/`
- ❌ `.next/`

---

## 🆘 Getting Help

**If your teammate can't get Firebase working:**

1. Check they created `.env.local` (not `.env.template`)
2. Check they restarted dev server after creating `.env.local`
3. Check Firebase security rules are published
4. Share your `.env.local` contents privately (if using shared project)

---

## 📊 Monitoring Usage

**Team Lead:** Monitor Firebase usage at:
```
https://console.firebase.google.com/project/YOUR_PROJECT_ID/usage
```

Free tier limits:
- 50,000 reads/day
- 20,000 writes/day
- 1 GB storage

Typical usage for this project: ~0.1% of limits during development.
