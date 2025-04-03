import { Link } from 'react-router-dom';
import quiz1Image from '../../../../../assets/images/AnxietyQuiz-min.png';
import quiz2Image from '../../../../../assets/images/DepressionQuiz-min.png';
import quiz3Image from '../../../../../assets/images/OCDQuiz-min.png';
import quiz4Image from '../../../../../assets/images/ADHDQuiz-min.png';

const quizzes = [
  { id: 1, title: 'Anxiety Test', desc: 'Determine if you have Anxiety.', img: quiz1Image, link: '/quiz/1' },
  { id: 2, title: 'Depression Test', desc: 'Detect early signs of Depression.', img: quiz2Image, link: '/quiz/2' },
  { id: 3, title: 'OCD Test', desc: 'Determine if you have OCD.', img: quiz3Image, link: '/quiz/3' },
  { id: 4, title: 'ADHD Test', desc: 'Find out if you have ADHD.', img: quiz4Image, link: '/quiz/4' },
];

const Quiz = () => {
  return (
    <div className="w-full max-w-full px-4 py-8 h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1e3245] mb-4">Take A Mental Health Test</h1>
        <p className="text-lg text-gray-600 mb-6">Please answer honestly for accurate results.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {quizzes.map(({ id, title, desc, img }) => (
            <div key={id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img src={img} alt={title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-700 text-sm mb-4">{desc}</p>
                <Link to={`/quiz/${id}`} className="inline-block bg-[#1e3245] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#152330] transition">Take Quiz</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-yellow-100 text-yellow-900 p-4 rounded-lg">
          <p className="text-sm">NOTE: These quizzes are not a substitute for professional advice. If you have concerns about your mental health, please consult a healthcare professional.</p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
