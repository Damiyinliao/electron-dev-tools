// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// import { contextBridge } from 'electron';

// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector: string, text: string) => {
//     const element = document.getElementById(selector);
//     if (element) element.innerText = text;
//   };

//   for (const dependency of ['chrome', 'node', 'electron']) {
//     replaceText(`${dependency}-version`, process.versions[dependency]);
//   }
// });



// contextBridge.exposeInMainWorld('electron', {
//   versions: {
//     chrome: process.versions.chrome,
//     node: process.versions.node,
//     electron: process.versions.electron,
//   },
// });

