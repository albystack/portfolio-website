import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import MarkdownRenderer from '../components/MarkdownRenderer';

interface Project {
  id: string;
  title: string;
  content: string;
  description: string;
  demoLink?: string;
  githubLink?: string;
  tags: string[];
}

export default function ProjectView() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchProject = async () => {
    try {
      const projectUrl = `/content/projects/${id}.md`;
      const metaUrl = `/content/projects.json`;

      console.log("Fetching:", projectUrl);
      console.log("Fetching metadata:", metaUrl);

      const response = await fetch(projectUrl);
      if (!response.ok) throw new Error(`Project markdown not found: ${response.status}`);

      const content = await response.text();

      const metaResponse = await fetch(metaUrl);
      if (!metaResponse.ok) throw new Error(`Failed to fetch project metadata: ${metaResponse.status}`);

      const projects = await metaResponse.json();
      const projectMeta = projects.find((p: Project) => p.id.toLowerCase() === id?.toLowerCase());

      if (!projectMeta) throw new Error('Project metadata not found');

      setProject({ ...projectMeta, content });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch project');
      setLoading(false);
    }
  };

  if (id) fetchProject();
}, [id]);



  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg">Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] space-y-4">
        <p className="text-lg text-red-500">Error: {error || 'Project not found'}</p>
        <a href="/projects" className="text-sm hover:text-[var(--color-primary)] transition-colors">
          ← Back to Projects
        </a>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="space-y-4">
        <a href="/projects" className="text-sm hover:text-[var(--color-primary)] transition-colors">
          ← Back to Projects
        </a>
        <h1 className="text-4xl font-bold">{project.title}</h1>
        
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

        <div className="flex gap-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-[var(--color-primary)] transition-colors"
            >
              GitHub →
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-[var(--color-primary)] transition-colors"
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>

      <MarkdownRenderer 
        content={project.content}
        className="mt-8"
      />
    </motion.article>
  );
} 