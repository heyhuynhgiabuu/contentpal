import { createRoot, createSignal } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import type { OutputItem, Project, SourceDoc } from '@/types';

function createProjectStore() {
  const [projects, setProjects] = createStore<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = createSignal<string | null>(null);

  const currentProject = () => projects.find((p) => p.id === currentProjectId());

  const createProject = (name: string, source: SourceDoc): Project => {
    const project: Project = {
      id: crypto.randomUUID(),
      name,
      source,
      outputs: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setProjects(produce((p) => p.push(project)));
    setCurrentProjectId(project.id);
    return project;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((p) => p.id === id, { ...updates, updatedAt: Date.now() });
  };

  const addOutput = (projectId: string, output: OutputItem) => {
    setProjects(
      (p) => p.id === projectId,
      'outputs',
      produce((outputs) => outputs.push(output))
    );
  };

  const updateOutput = (projectId: string, outputId: string, updates: Partial<OutputItem>) => {
    setProjects(
      (p) => p.id === projectId,
      'outputs',
      (o) => o.id === outputId,
      updates
    );
  };

  const deleteProject = (id: string) => {
    setProjects((p) => p.filter((proj) => proj.id !== id));
    if (currentProjectId() === id) {
      setCurrentProjectId(null);
    }
  };

  return {
    projects,
    currentProjectId,
    currentProject,
    setCurrentProjectId,
    createProject,
    updateProject,
    addOutput,
    updateOutput,
    deleteProject,
  };
}

export const projectStore = createRoot(createProjectStore);
