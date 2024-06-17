import { Button } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex-col">
        <h1>404</h1>
        <Button type='outline' onClick={() => navigate('/home') }>返回首页</Button>
      </div>
    </>
  )
};