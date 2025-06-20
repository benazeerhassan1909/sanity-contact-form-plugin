// watch-and-push.js
import chokidar from 'chokidar';
import { execSync } from 'child_process';

chokidar.watch(['./dist', './src'], {ignored: /node_modules/}).on('all', () => {
  console.log('Changes detected - pushing via yalc...')
  execSync('yalc push', {stdio: 'inherit'})
})
