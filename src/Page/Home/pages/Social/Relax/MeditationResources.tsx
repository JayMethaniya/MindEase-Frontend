import React from 'react';

interface Resource {
  type: string;
  title: string;
  link: string;
  gifLink: string;
}

const MeditationResources: React.FC = () => {
  const resources: Resource[] = [
    {
      type: 'article',
      title: 'Mindfulness Meditation: Benefits and Techniques',
      link: 'https://greatergood.berkeley.edu/article/item/five_ways_mindfulness_meditation_is_good_for_your_health',
      gifLink: 'https://skyogafoundation.org/assets/images/silence.gif',
    },
    {
      type: 'article',
      title: '16 Benefits of Yoga That Are Supported by Science',
      link: 'https://www.healthline.com/nutrition/13-benefits-of-yoga',
      gifLink: 'https://media2.giphy.com/media/lSodnhEO8lphSsxEUy/giphy.gif',
    },
    {
      type: 'article',
      title: 'Beginner Yoga Poses for Relaxation',
      link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1470658/',
      gifLink: 'https://media2.giphy.com/media/0YLKvc5TheGFh0GJXk/giphy.gif',
    },
    {
      type: 'article',
      title: 'Meditation for Slowing Thoughts',
      link: 'https://www.youtube.com/watch?v=79r4jlECyTs',
      gifLink: 'https://media4.giphy.com/media/Mb42X7rqa0H7YlJsiz/source.gif',
    },
    {
      type: 'article',
      title: 'Yoga Poses for Relaxation',
      link: 'https://www.yogajournal.com/poses/yoga-by-benefit/calm/yoga-poses-for-relaxation/',
      gifLink: 'https://ub24news.com/wp-content/uploads/2019/06/source-min.gif',
    },
    {
      type: 'article',
      title: '8 Simple Exercises for Stress Relief',
      link: 'https://www.everydayhealth.com/exercise-photos/exercises-that-relieve-stress.aspx',
      gifLink: 'https://d2f8l4t0zpiyim.cloudfront.net/000_clients/61768/page/61768yYxIEAka.gif',
    },
    {
      type: 'article',
      title: 'How Yoga Boosts Your Mental Health',
      link: 'https://www.houstonmethodist.org/blog/articles/2021/sep/the-benefits-of-yoga-how-it-boosts-your-mental-health/',
      gifLink: 'https://media4.giphy.com/media/KDICL3psaxnoeUghMt/giphy.gif',
    },
    {
      type: 'article',
      title: 'How Meditation Strengthens Mental Health',
      link: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response/',
      gifLink: 'https://media1.giphy.com/media/19ukzJdtWrkV2dy2eE/source.gif',
    },
    {
      type: 'article',
      title: 'Does Daily Meditation Really Help Mental Health?',
      link: 'https://www.outlookindia.com/healths/world-mental-health-day-how-does-daily-meditation-really-help-us--news-219648',
      gifLink: 'https://media2.giphy.com/media/GD32HNX7JduZBfHIdZ/giphy.gif',
    },
  ];

  return (
    <div className="p-6 ">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Meditation, Yoga, Exercises and More...
      </h2>
      
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {resources.map(resource => (
          <a
            key={resource.link}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-[#f3e3d0] shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img 
              src={resource.gifLink} 
              alt={resource.title} 
              className="w-full h-[300px] object-contain"
            />
            <div className="p-4">
              <h4 className="text-xl font-bold text-[#1e3245] group-hover:text-[#101e2c] transition-colors">
                {resource.title}
              </h4>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MeditationResources;
