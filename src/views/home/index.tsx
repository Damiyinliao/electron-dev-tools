import { css } from "@emotion/css";

export default function Home() {

  const styles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%
  `
  return (
    <div className={styles}>
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
    </div>
  );
}