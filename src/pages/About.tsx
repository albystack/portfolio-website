import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';


interface PdfFile {
  name: string;
  label: string;
  lastUpdated: string;
  group: 'transcript' | 'other';
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
}


const pdfFiles: PdfFile[] = [
    { name: '', label: 'Year 13 Mocks', lastUpdated: '03/02/2025', group: 'transcript' },
    { name: '', label: 'Year 12 Mocks', lastUpdated: '20/06/2024', group: 'transcript' },
    { name: 'personal-statement', label: 'Personal Statement', lastUpdated: '9/9/2024', group: 'other' },
    { name: '', label: 'Resume', lastUpdated: '08/10/2024', group: 'other' }
  ];

// IDs of current projects
const currentProjectIds = [
  "hft-execution",         // Optimal Execution & Market Making Simulator (Most impactful for quant roles)
  "statistical-arbitrage", // Statistical Arbitrage & Bayesian Alpha Models (Essential for hedge funds & prop firms)
  "pathfinding-maze",      // A-Level NEA (Since it's already in progress, makes sense to include)
  "ml-alpha-research"      // Machine Learning for Alpha Generation (Adds ML & quant trading depth)
];

const AboutSection = () => (
  <section className="space-y-4">
    <h1 className="text-4xl font-bold">About Me</h1>
    <p className="text-lg leading-relaxed">
      As a Year 13 student and aspiring quantitative developer, I am deeply passionate about leveraging mathematics, technology, and finance to develop innovative solutions to complex problems. My academic pursuits and personal projects enable me to apply my skills in real-world scenarios. I dedicate my time to learning, researching, optimizing trading strategies, playing chess, swimming competitively, and building cutting-edge projects.
    </p>
  </section>
);

const ProjectsSection = ({ projects, loading, error }: { projects: Project[], loading: boolean, error: string | null }) => (
  <section className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Current Projects</h2>
      <Link to="/projects" className="text-sm hover:text-[var(--color-primary)] transition-colors">
        View all projects →
      </Link>
    </div>
    {loading ? (
      <p>Loading projects...</p>
    ) : error ? (
      <p className="text-red-500">Error: {error}</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full p-6 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-colors group cursor-pointer"
            onClick={() => window.location.href = `/projects/${project.id}`}
          >
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors">{project.title}</h2>
              <p className="mb-4 text-sm/relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-auto">
                {project.githubLink && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.githubLink, '_blank', 'noopener noreferrer');
                    }}
                    className="text-sm hover:text-[var(--color-primary)] transition-colors"
                  >
                    GitHub →
                  </button>
                )}
                {project.demoLink && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.demoLink, '_blank', 'noopener noreferrer');
                    }}
                    className="text-sm hover:text-[var(--color-primary)] transition-colors"
                  >
                    Live Demo →
                  </button>
                )}
                <span 
                  className="text-sm text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                >
                  View Details →
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    )}
  </section>
);

const DocumentsSection = () => {
  const renderPdfGroup = (group: 'transcript' | 'other') => (
    <div className="flex flex-col">
      <h3 className="font-semibold mb-2">{group === 'transcript' ? 'Transcripts' : 'Professional'}</h3>
      {pdfFiles
        .filter(pdf => pdf.group === group)
        .map(pdf => {
        const staticUrl = `assets/PDF/${pdf.name}.pdf`;
          return (
            <div key={pdf.name} className="mb-2">
              <a
                href={staticUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline"
              >
                {pdf.label}
              </a>
              <span className="text-xs opacity-75">
                &#160; Last updated: {pdf.lastUpdated}
              </span>
            </div>
          );
        })}
    </div>
  );

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Documents</h2>
      <div className="flex justify-between flex-wrap gap-8">
        {renderPdfGroup('transcript')}
        {renderPdfGroup('other')}
      </div>
    </section>
  );
};

const WorkExperienceSection = () => (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold">Work Experience</h2>
    
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Freelance Software Developer</h3>
      <h4 className="text-lg">Self-Employed</h4>
      <p className="text-sm opacity-75">2023 - Present</p>
      <p className="mt-2">
        Developed websites and automation scripts for small businesses and individuals, focusing on improving operational efficiency
        through technology-driven solutions. Worked with JavaScript, Python, and React to build customized applications.
      </p>
    </div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Intern at Local FinTech Startup</h3>
      <h4 className="text-lg">Quantitative Research Intern</h4>
      <p className="text-sm opacity-75">Summer 2024</p>
      <p className="mt-2">
        Assisted in developing algorithmic trading models, data analysis pipelines, and backtesting strategies. Gained experience
        with Python, Pandas, and financial data APIs to analyze market trends and optimize trading signals.
      </p>
    </div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Amazon Work Experience</h3>
      <h4 className="text-lg">Cloud & AI Intern</h4>
      <p className="text-sm opacity-75">2024</p>
      <p className="mt-2">
        Gained hands-on experience with AWS cloud solutions and AI technologies. Explored how businesses utilize cloud-based
        solutions and deepened understanding of generative AI applications in modern enterprises.
      </p>
    </div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Fujitsu Work Experience</h3>
      <h4 className="text-lg">Cybersecurity Intern</h4>
      <p className="text-sm opacity-75">2024</p>
      <p className="mt-2">
        Developed insights into the prevalence of cyber threats and gained experience in cybersecurity frameworks. 
        Worked on recommending security measures to mitigate risks and improve corporate data protection strategies.
      </p>
    </div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Founder - Codelab</h3>
      <h4 className="text-lg">EdTech App Developer</h4>
      <p className="text-sm opacity-75">2021 - 2022</p>
      <p className="mt-2">
        Built an interactive coding education app to help students learn programming fundamentals. Implemented gamified learning
        experiences and interactive coding exercises to engage young learners.
      </p>
    </div>
  </section>
);

const EducationSection = () => (
  <section className="space-y-4">
    <h2 className="text-2xl font-bold">Education</h2>
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Ellesmere College</h3>
      <p className="text-sm opacity-75">2023 - 2025</p>
      <h4 className="text-lg">Studying Maths, Further Maths, Physics and Computer Science. Also took an EPQ</h4>
      <h4 className="text-lg">Predicted A*A*A*A*A*</h4>
    </div>
  </section>
);


const SkillsSection = () => {
  const skills = [
    { name: 'Python', icon: 'logos:python' },
    { name: 'C++', icon: 'logos:c-plusplus' },
    { name: 'HTML', icon: 'logos:html-5' },
    { name: 'CSS', icon: 'logos:css-3' },
    { name: 'JavaScript', icon: 'logos:javascript' },
    { name: 'TypeScript', icon: 'logos:typescript-icon' },
    { name: 'React', icon: 'logos:react' },
    { name: 'Firebase', icon: 'logos:firebase' },
    { name: 'Git', icon: 'logos:git-icon' },
    { name: 'Node.js', icon: 'logos:nodejs-icon' },
    { name: 'Docker', icon: 'logos:docker-icon' },
    { name: '', icon: 'logos:pandas' },
    { name: 'NumPy', icon: 'logos:numpy' },
    { name: 'TensorFlow', icon: 'logos:tensorflow' },
    { name: 'SQL', icon: 'logos:postgresql' },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Skills</h2>
      <div className="flex flex-wrap gap-4">
        {skills.map(skill => (
          <div key={skill.name} className="flex items-center space-x-2">
            <Icon icon={skill.icon} className="text-2xl" />
            <span className="text-lg font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function About() {
  const [currentProjects, setCurrentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/content/projects.json`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const allProjects = await response.json();
        const filteredProjects = allProjects.filter((project: Project) => 
          currentProjectIds.includes(project.id)
        );
        setCurrentProjects(filteredProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-12 pb-12"
    >
      <AboutSection />
      <DocumentsSection />
      <EducationSection />
      <WorkExperienceSection />
      <ProjectsSection projects={currentProjects} loading={loading} error={error} />
      <SkillsSection />
    </motion.div>
  );
} 

