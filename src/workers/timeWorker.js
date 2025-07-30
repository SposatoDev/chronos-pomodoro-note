isRunning = false; // Flag para verificar worker

self.onmessage = function (event) {
  if (isRunning) return; // Se isRunning for true

  isRunning = true;

  const state = event.data;
  const { activeTask, secondsRemaining } = state;
  const endDate = activeTask.startDate + secondsRemaining * 1000;

  function count() {
    const nowDate = Date.now();
    const countDownSeconds = Math.ceil((endDate - nowDate) / 1000);

    self.postMessage(countDownSeconds);

    setTimeout(count, 1000); // Função do JavaScript que executa uma função (callback) depois de determinado tempo
  }

  count();
};
