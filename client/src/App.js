import { useEffect, useMemo, useState } from 'react';
import './App.css';

const HABITS_KEY = 'daily-habit-tracker-habits';
const COMPLETIONS_KEY = 'daily-habit-tracker-completions';
const PROFILE_KEY = 'daily-habit-tracker-profile';

const todayKey = () => new Date().toISOString().slice(0, 10);
const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function parseDateKey(key) {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function buildConsecutiveStreak(keys) {
  if (!keys.length) return 0;
  let best = 0;
  let current = 0;
  let previous = null;

  keys.forEach((key) => {
    const date = parseDateKey(key);
    if (!previous) {
      current = 1;
    } else {
      const delta = (date - previous) / 86400000;
      current = delta === 1 ? current + 1 : 1;
    }
    best = Math.max(best, current);
    previous = date;
  });
  return best;
}

function App() {
  const [userName, setUserName] = useState('');
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [completions, setCompletions] = useState({});
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const storedHabits = JSON.parse(localStorage.getItem(HABITS_KEY) || '[]');
      const storedCompletions = JSON.parse(localStorage.getItem(COMPLETIONS_KEY) || '{}');
      const storedName = localStorage.getItem(PROFILE_KEY) || '';

      setHabits(Array.isArray(storedHabits) ? storedHabits : []);
      setCompletions(storedCompletions && typeof storedCompletions === 'object' ? storedCompletions : {});
      setUserName(storedName);
    } catch {
      setHabits([]);
      setCompletions({});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions));
  }, [completions]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem(PROFILE_KEY, userName);
    }
  }, [userName]);

  const setTemporaryError = (message) => {
    setError(message);
    window.clearTimeout(window.errorTimeout);
    window.errorTimeout = window.setTimeout(() => setError(''), 3500);
  };

  const addHabit = () => {
    if (!newHabit.trim()) {
      setTemporaryError('Enter a habit to continue.');
      return;
    }

    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`;
    setHabits((prev) => [...prev, { id, title: newHabit.trim(), createdAt: todayKey() }]);
    setNewHabit('');
  };

  const startEdit = (habit) => {
    setEditId(habit.id);
    setEditText(habit.title);
  };

  const saveEdit = (habitId) => {
    if (!editText.trim()) {
      setTemporaryError('Habit name cannot be empty.');
      return;
    }

    setHabits((prev) => prev.map((habit) => (habit.id === habitId ? { ...habit, title: editText.trim() } : habit)));
    setEditId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  const deleteHabit = (habitId) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
    setCompletions((prev) => {
      const next = {};
      Object.entries(prev).forEach(([date, day]) => {
        const filtered = Object.fromEntries(Object.entries(day).filter(([id]) => id !== habitId));
        if (Object.keys(filtered).length) next[date] = filtered;
      });
      return next;
    });
    if (editId === habitId) {
      cancelEdit();
    }
  };

  const toggleCompletion = (habitId, date = todayKey()) => {
    setCompletions((prev) => {
      const day = { ...(prev[date] || {}) };
      day[habitId] = !day[habitId];
      if (!day[habitId]) {
        delete day[habitId];
      }

      const next = { ...prev };
      if (Object.keys(day).length) {
        next[date] = day;
      } else {
        delete next[date];
      }
      return next;
    });
  };

  const totalCompletions = useMemo(
    () => Object.values(completions).reduce((sum, day) => sum + Object.values(day).filter(Boolean).length, 0),
    [completions]
  );

  const completedToday = useMemo(() => Object.values(completions[todayKey()] || {}).filter(Boolean).length, [completions]);
  const completedAllToday = habits.length > 0 && completedToday === habits.length;

  const habitStreak = (habitId) => {
    let streak = 0;
    const date = new Date();

    while (true) {
      const key = new Date(date.getFullYear(), date.getMonth(), date.getDate() - streak).toISOString().slice(0, 10);
      if (completions[key]?.[habitId]) {
        streak += 1;
      } else {
        break;
      }
      if (streak > 365) break;
    }

    return streak;
  };

  const habitBestStreak = useMemo(
    () => habits.reduce((best, habit) => Math.max(best, habitStreak(habit.id)), 0),
    [habits, completions]
  );

  const allDoneDays = useMemo(() => {
    if (!habits.length) return [];
    return Object.keys(completions)
      .filter((date) => Object.values(completions[date] || {}).filter(Boolean).length === habits.length)
      .sort();
  }, [completions, habits.length]);

  const consecutiveGoalStreak = useMemo(() => buildConsecutiveStreak(allDoneDays), [allDoneDays]);

  const activeGoalStreak = useMemo(() => {
    if (!allDoneDays.length) return 0;
    let streak = 0;
    let date = new Date();

    while (true) {
      const key = date.toISOString().slice(0, 10);
      if (allDoneDays.includes(key)) {
        streak += 1;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }, [allDoneDays]);

  const level = 1 + Math.floor(totalCompletions / 7);
  const points = totalCompletions;

  const badges = useMemo(() => {
    const earned = [];
    if (points >= 20) earned.push('Commitment starter');
    if (points >= 50) earned.push('Habit builder');
    if (habits.length >= 5) earned.push('Routine architect');
    if (consecutiveGoalStreak >= 7) earned.push('7-day finishing streak');
    if (consecutiveGoalStreak >= 30) earned.push('Monthly mastery');
    if (habitBestStreak >= 14) earned.push('Fortnight focus');
    return earned;
  }, [points, habits.length, consecutiveGoalStreak, habitBestStreak]);

  const weeklySummary = useMemo(() => {
    return Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      const key = date.toISOString().slice(0, 10);
      const done = Object.values(completions[key] || {}).filter(Boolean).length;
      return {
        key,
        label: dayLabels[date.getDay()],
        done,
        total: habits.length,
      };
    });
  }, [completions, habits.length]);

  return (
    <div className="App">
      <div className="page-shell">
        <header className="topbar">
          <div>
            <p className="eyebrow">Daily Habit Tracker</p>
            <h1>Build consistency with clear rituals</h1>
          </div>
          <div className="profile-card">
            <span className="profile-badge">{userName ? userName.slice(0, 2).toUpperCase() : 'HI'}</span>
            <div>
              <p className="profile-label">Welcome back</p>
              <input
                className="name-field"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
          </div>
        </header>

        <section className="hero-card">
          <div>
            <p className="section-tag">Focus, track, and improve</p>
            <h2>Stay consistent with habits that matter.</h2>
            <p className="hero-copy">
              Add habits, mark them complete, and track progress with daily streaks and a smooth weekly overview.
            </p>
          </div>
          <div className="hero-metrics">
            <div className="metric-card">
              <span>Active score</span>
              <strong>{points}</strong>
            </div>
            <div className="metric-card">
              <span>Current level</span>
              <strong>{level}</strong>
            </div>
            <div className="metric-card">
              <span>Daily goal streak</span>
              <strong>{activeGoalStreak} days</strong>
            </div>
          </div>
        </section>

        <div className="grid-layout">
          <section className="summary-card">
            <div className="summary-header">
              <div>
                <p className="section-tag">Today</p>
                <h2>Today's snapshot</h2>
              </div>
              <span className={`status-pill ${completedAllToday ? 'complete' : 'pending'}`}>
                {completedAllToday ? 'All habits done' : 'In progress'}
              </span>
            </div>
            <div className="summary-list">
              <div>
                <span>Total habits</span>
                <strong>{habits.length}</strong>
              </div>
              <div>
                <span>Completed today</span>
                <strong>{completedToday}</strong>
              </div>
              <div>
                <span>Best habit streak</span>
                <strong>{habitBestStreak}</strong>
              </div>
              <div>
                <span>Best goal streak</span>
                <strong>{consecutiveGoalStreak}</strong>
              </div>
            </div>
            <div className="badge-row">
              {badges.length ? (
                badges.map((badge) => <span key={badge} className="badge">{badge}</span>)
              ) : (
                <span className="empty-badge">No badges earned yet</span>) }
            </div>
          </section>

          <section className="habit-card">
            <div className="section-heading">
              <div>
                <p className="section-tag">Habits</p>
                <h2>Your routine</h2>
              </div>
              <button className="secondary" onClick={addHabit}>Add habit</button>
            </div>

            <div className="habit-input-wrapper">
              <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Type a new habit, e.g. Read for 20 minutes"
                onKeyDown={(e) => e.key === 'Enter' && addHabit()}
              />
            </div>

            <ul className="habit-list">
              {habits.length ? (
                habits.map((habit) => {
                  const doneToday = !!(completions[todayKey()]?.[habit.id]);
                  const streak = habitStreak(habit.id);

                  return (
                    <li key={habit.id} className={doneToday ? 'habit-row done' : 'habit-row'}>
                      <div className="habit-main">
                        <button className={`toggle ${doneToday ? 'active' : ''}`} onClick={() => toggleCompletion(habit.id)}>
                          {doneToday ? '✓' : ''}
                        </button>
                        <div>
                          {editId === habit.id ? (
                            <div className="inline-edit">
                              <input
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && saveEdit(habit.id)}
                              />
                              <div className="edit-actions">
                                <button className="text-button" onClick={() => saveEdit(habit.id)}>Save</button>
                                <button className="text-button" onClick={cancelEdit}>Cancel</button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <p>{habit.title}</p>
                              <span className="habit-meta">{streak}-day streak</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="habit-actions">
                        <button className="text-button" onClick={() => startEdit(habit)}>Edit</button>
                        <button className="text-button danger" onClick={() => deleteHabit(habit.id)}>Delete</button>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="empty-state">
                  <p>Start by adding a habit. The tracker saves your progress locally.</p>
                </li>
              )}
            </ul>
          </section>

          <section className="analytics-card">
            <div className="section-heading">
              <div>
                <p className="section-tag">Weekly view</p>
                <h2>Progress chart</h2>
              </div>
            </div>
            <div className="chart">
              {weeklySummary.map((item) => {
                const ratio = item.total ? Math.round((item.done / item.total) * 100) : 0;
                return (
                  <div key={item.key} className="chart-row">
                    <div className="chart-label">
                      <span>{item.label}</span>
                      <small>{item.key}</small>
                    </div>
                    <div className="chart-track">
                      <div className="chart-fill" style={{ width: `${ratio}%` }} />
                    </div>
                    <strong>{item.done}/{item.total}</strong>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {error && <div className="toast-error">{error}</div>}
    </div>
  );
}

export default App;
