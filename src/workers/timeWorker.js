let isRunning = false; // Flag para verificar worker
let isPaused = false;
let timerId = null;
let endDate = null;
let secondsLeft = null;

self.onmessage = function (event) {
  const data = event.data;

  // Mensagem de controle de pausa/retomada
  if (data.type === "PAUSE") {
    isPaused = true;
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    // Salva o tempo restante no momento do pause
    if (endDate) {
      const nowDate = Date.now();
      secondsLeft = Math.ceil((endDate - nowDate) / 1000);
    }
    return;
  }
  if (data.type === "RESUME") {
    if (isPaused && secondsLeft !== null) {
      isPaused = false;
      // Recalcula o endDate usando o tempo restante salvo
      endDate = Date.now() + secondsLeft * 1000;
      count();
    }
    return;
  }

  // Iniciar nova contagem
  if (isRunning) return;
  isRunning = true;

  const state = data;
  const { activeTask, secondsRemaining } = state;
  secondsLeft = secondsRemaining;
  endDate = activeTask.startDate + secondsRemaining * 1000;

  count();
};

function count() {
  if (isPaused || !endDate) return;
  const nowDate = Date.now();
  const countDownSeconds = Math.ceil((endDate - nowDate) / 1000);

  secondsLeft = countDownSeconds;
  self.postMessage(countDownSeconds);

  if (countDownSeconds > 0) {
    timerId = setTimeout(count, 1000);
  } else {
    isRunning = false;
    timerId = null;
    endDate = null;
    secondsLeft = null;
  }
}
