import request from "./api/request";
import { useCallback, useEffect } from "react";
import { message } from "antd";
import PubSub from "pubsub-js";

export default function App() {
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    PubSub.subscribe('toast', (eventName, data) => {
      messageApi.open(data);
    })
  }, []);

  const sendAction1 = useCallback(async () => {
    const [error, response] = await request.post('/data', {});
    console.log(error, response);



  }, []);

  const sendAction2 = useCallback(async () => {
    const [error, response] = await request.get(
      // "http://localhost:8000/api/data"
      "/data"
    );
    console.log(error, response);
  }, []);

  return (
    <>
      {contextHolder}

      <div>
        <h1>App</h1>
        <button onClick={sendAction1}>按钮1</button>

        <button onClick={sendAction2}>按钮2</button>
      </div>

    </>
  );
}
