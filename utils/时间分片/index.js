const btn = document.querySelector("button");
const datas = new Array(100000).fill(0).map((_, index) => index);

btn.onclick = () => {
  // 分片中执行的任务
  const taskHandler = (i) => {
    const div = document.createElement("div");
    div.innerText = i;
    document.body.appendChild(div);
  };
  perFormChunk(datas, taskHandler);
};

/**
 * 时间分片
 * @returns
 */
const perFormChunk = (datas, taskHandler) => {
  if (datas.length === 0) return;
  let i = 0;
  /**
   * 下一个分片的执行时机
   */
  const _run = () => {
    if (i >= datas.length) return;
    // 一个渲染帧（16.6毫秒）中，空闲时开启分片任务
    requestIdleCallback((idle) => {
      while (idle.timeRemaining() > 0 && i < datas.length) {
        taskHandler(datas[i], i);
        i++;
      }
      _run();
    });
  };
  _run();
};
