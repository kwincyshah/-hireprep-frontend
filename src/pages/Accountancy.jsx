import { useState } from 'react';
import Navbar from '../components/Navbar';
import './Category.css';

const questions = [
  { id: 'q1', label: 'Introduce yourself' },
  { id: 'q2', label: 'Why did you choose this field' },
  { id: 'q3', label: 'How would you find duplicate entries' },
  { id: 'q4', label: 'How do you prepare an expense or sales report in excel' },
  { id: 'q5', label: 'Do you have any questions for us' }
];

function Accountancy() {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState('');
  const [maxScore, setMaxScore] = useState('');

  const handleChange = (id, value) => {
    if (value.length <= 500) {
      setAnswers({ ...answers, [id]: value });
    }
  };

  const handleResult = async (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/score/accountancy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Kuch galat ho gaya');
        return;
      }

      setScore(data.score);
      setMaxScore(data.maxScore);
    } catch (err) {
      alert('Backend se connect nahi ho paya. Backend server chal raha hai check karo.');
    }
  };

  return (
    <div className="category-page">
      <Navbar
        showCategoryDropdown={showCategoryDropdown}
        setShowCategoryDropdown={setShowCategoryDropdown}
      />

      <form className="category-content" onSubmit={handleResult}>
        <div className="category-card">
          <h1 className="category-title">ACCOUNTANCY</h1>

          {questions.map((q) => (
            <div className="question-block" key={q.id}>
              <label className="question-label">{q.label}</label>
              <textarea
                className="question-textarea"
                required
                value={answers[q.id] || ''}
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
              <div className="char-counter">
                {(answers[q.id] || '').length}/500 charactors
              </div>
            </div>
          ))}
        </div>

        <div className="category-footer-row">
          <button type="submit" className="result-btn">
            RESULT
          </button>
          <div className="score-row">
            <span className="score-label">Score</span>
            <div className="score-box">
              {score !== '' ? `${score} / ${maxScore}` : ''}
            </div>
          </div>
        </div>
      </form>

      <footer className="category-contact">
        <h3>Contact</h3>
        <p>+91 26581 68416</p>
        <p>hireprep@gmail.com</p>
      </footer>
    </div>
  );
}

export default Accountancy;