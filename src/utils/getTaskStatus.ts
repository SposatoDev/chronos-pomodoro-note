import type { Taskmodel } from "../models/TaskModel";

export function getTaskStatus(
  task: Taskmodel,
  activeTask: Taskmodel | null,
  isPaused: boolean
) {
  if (task.completeDate) return "Completa";
  if (task.interruptDate) return "Interrompida";
  if (task.id === activeTask?.id) {
    if (isPaused) return "Pausado";
    return "Em progresso";
  }
  return "Abandonada";
}
