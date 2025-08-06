export function FormatTaskType(type: string) {
  if (type === "workTime") return "Foco";
  if (type === "shortBreakTime") return "Descanso";
  else return "Descanso longo";
}
