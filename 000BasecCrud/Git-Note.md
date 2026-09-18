# Git & GitHub Complete Workflow Cheatsheet

---

## 1. Initial Git Identity Setup (One-Time Setup)

Yeh commands computer par ek hi baar chalani hoti hain. Yeh aapki global profile set karti hain.

```bash
# Global username set karein (Main account handle)
    git config --global user.name "skgitstor"

# Global anonymous noreply email set karein (Privacy ke liye)
    git config --global user.email "ID+skgitstor@users.noreply.github.com"

# Default branch ka naam 'main' set karein (Recommended standard)
    git config --global init.defaultBranch main

# Line-ending issues se bachne ke liye (Windows ke liye true, Linux/Mac ke liye input) [Optional]
    git config --global core.autocrlf true

# Verify karein ki sab sahi set hua ya nahi
    git config --global --list

```

---

## 2. Multi-Account / Practice Repo Setup (Local Override)

Jab practice account (`djgitstor`) ke liye kaam karna ho, toh global settings ko chhede bina sirf us repo ke andar identity badli jaati hai.

> **Rule:** Yeh commands hamesha `git init` karne ke **BAAD** project folder ke andar run karein.

```bash
# Project folder ke andar navigate karein
    cd my-practice-folder

# Git initialize karein
    git init

# Sirf is folder ke liye username badlein (Global par asar nahi padega)
    git config user.name "djgitstor"

# Sirf is folder ke liye practice noreply email badlein
    git config user.email "ID+djgitstor@users.noreply.github.com"

# Verify karein ki is folder me local identity override ho gayi
    git config --local --list

```

---

## 3. Daily Project Workflows (Most Frequent)

### Flow A: Naya Project Local Machine Se Shuru Karna

```bash
# Naya folder bana kar usme jayein
    mkdir my-project
    cd my-project

# Git tracking shuru karein
    git init

# Kisi file ko staging area me bhejein
    git add README.md

# Saari nayi ya modified files ko ek saath stage karein
    git add .

# Changes ka snapshot (commit) save karein
    git commit -m "feat: initial commit"

# Current branch ka naam 'main' ensure karein
    git branch -M main

# Local project ko remote GitHub repository se link karein
    git remote add origin [https://github.com/skgitstor/my-project.git](https://github.com/skgitstor/my-project.git)

# Code ko GitHub par upload karein (-u flag upstream link karta hai)
    git push -u origin main

```

---

### Flow B: Existing Repository Ko Clone Karke Kaam Karna

```bash
# GitHub se poora project computer par download karein
    git clone [https://github.com/skgitstor/my-project.git](https://github.com/skgitstor/my-project.git)

# Cloned folder ke andar jayein
    cd my-project

# Changes karne ke baad status check karein
    git status

# Changes stage karein
    git add .

# Commit karein
    git commit -m "fix: update layout structure"

# Direct push karein (upstream pehle se set hota hai)
    git push

```

---

### Flow C: Remote Changes Download Karna (Pull)

```bash
# GitHub par hue naye changes ko local folder me update karein
    git pull origin main

```

---

## 4. Inspection & Undoing (Daily Utilities)

```bash
# Kaunsi files modify hui hain aur kaunsi staged hain, check karein
    git status

# Commits ki history aur Author identity check karein
    git log --oneline

# Ek line me clear visual commit graph dekhne ke liye [Optional]
    git log --oneline --graph --all

# Unstaged file ke changes ko cancel karke purani state me laane ke liye
    git restore filename.js

# Staged file ko wapas unstage karne ke liye
    git restore --staged filename.js

# Aakhri commit message ko edit karne ke liye (agar galat message likh diya ho) [Optional]
    git commit --amend -m "updated correct commit message"

```

---

## 5. Branching & Team Workflows (Intermediate / Advanced)

Jab kisi naye feature par kaam karna ho bina main code ko distrub kiye:

```bash
# Saari local branches ki list check karein
    git branch

# Nayi branch banayein aur turant us par switch karein
    git checkout -b feature-login
# (Modern Git alternative): git switch -c feature-login

# Apni feature branch me normal commit karein
    git add .
    git commit -m "add login logic"

# Feature branch ko GitHub par push karein
    git push -u origin feature-login

# Wapas main branch par switch karein
    git checkout main
# (Modern Git alternative): git switch main

# Feature branch ka code main branch me merge karein
    git merge feature-login

# Kaam khatam hone ke baad local feature branch delete karein [Optional]
    git branch -d feature-login

# GitHub se remote feature branch delete karein [Optional]
    git push origin --delete feature-login

```

---

## 6. Temporary Work Stashing (Industrial Utility)

Bina commit kiye adhoore kaam ko temporary hide karke branch switch karne ke liye:

```bash
# Adhoore kaam ko temporary memory me safe save karein
    git stash

# Kisi doosri branch par jakar zaroori fix karein, fir wapas aakar stash restore karein
    git stash pop

# Stash list check karein [Optional]
    git stash list

```

---

## 7. Key Best Practices

* **`.gitignore` File:** `node_modules/`, `.env` (API keys/passwords), aur OS temporary files ko hamesha commit hone se pehle `.gitignore` me daal kar rakhein.
* **Commit Messages:** Short, clear aur meaningful likhein (e.g., `feat: setup navbar`, `fix: router params issue`).
* **Remote Check:** Kisi repo me remote link check karne ke liye run karein: `git remote -v`.

```

```