📘 Influence Playbook – Make It Your Own

An interactive, personal playbook designed to consolidate and apply key influence concepts from the course.
This project transforms theoretical tools—persuasion tactics, negotiation levers, structure-based influence, and meta-skills—into a hands-on, customizable system you can use in future work, leadership, and decision-making contexts.

👉 Live Demo:
https://rsm-oujia.github.io/decision_making_final/

🎯 Purpose

The goal of this final project is to build a highly personalized “influence cheat sheet”—a device that helps my future self remember, apply, and practice the most important tools from the second half of the course.

Instead of passively summarizing readings and slides, this project re-packages them into a functional web app where I:

Browse and study influence levers

Build my own customized influence strategy

Translate ideas into concrete actions

Practice daily habits

Test understanding with micro-quizzes

🧩 Features
1. Influence Lever Library

Includes tactics from:

Lincoln’s 12 influence tools (Ethos / Logos / Pathos, Allocentrism, Exchange, Might…)

LBJ case tools (Agenda control, Publicity machine, Patronage levers)

Modern organizational influence (psychological safety, peer leadership, managing up)

Each card contains:

Summary

Prompts for application

Option to add to my personal playbook

2. Playbook Builder

A personalized dashboard where I can:

Select tactics meaningful to my goals

Set priority levels

Pair them with Cialdini principles

Add specific implementation notes

Mark progress/completion

Data is stored locally in the browser.

3. Daily Practice

A lightweight checklist habit system:

Add small, concrete, observable actions

Inspired by the “Seven Habits of the Influential”

Helps translate strategy into consistent behavior

4. Course Guides Integration

Embedded reference modules from lectures:

Seven Habits of the Influential

Tit-for-Tat and repeated game strategy

Soft / Smart / Hard influence styles

Made-to-Stick communication checklist

These modules help reinforce key frameworks while keeping them accessible.

5. Micro-Quiz

A 3-question quiz to test intuition and memory of core concepts.

🛠️ Tech Stack

React + TypeScript (Vite)

Fully custom lightweight UI components (Card, Button, Tabs, etc.)

No external UI libraries (built to maximize portability)

Client-side state stored via localStorage

Deployed using GitHub Actions + GitHub Pages

🚀 Deployment

This site is automatically built and deployed with GitHub Actions using:

npm run build to generate static assets

actions/upload-pages-artifact to package /dist

actions/deploy-pages to publish to GitHub Pages

Configured via .github/workflows/deploy.yml.
