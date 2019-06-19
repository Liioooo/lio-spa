import {Command, flags} from '@oclif/command';
import * as Parser from '@oclif/parser';
import * as path from 'path';
import * as fs from 'fs';
import * as child_process from 'child_process';

export default class New extends Command {
  static description = 'Creates a new workspace and an initial Lio-SPA app.';

  static examples = [
    `$ lio-spa new myNewApp
Creates a new workspace and an initial Lio-SPA app in ./myNewApp.
`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    noInitGit: flags.boolean({
        default: false
    })
  };

  static args: Parser.args.IArg[] = [
      {
        name: 'projectName',
        required: true,
      }
  ];

  async run() {
    const {args, flags} = this.parse(New);

    const workingDir = path.join(process.cwd(), args.projectName);

    if (fs.existsSync(workingDir)) {
      this.error('A directory with this name already exists!', {exit: 1});
    }

    this.log(`Creating new project in ${workingDir}`);

    this.copyDirectory(path.join(__dirname, '..', '..', 'project-template'), workingDir, args.projectName);

    this.log('Running npm install...');
    child_process.exec(`cd ${workingDir} && npm install`, (error, stdout, stderr) => {
      this.log(stdout);
      this.log(stderr);

        if (!flags.noInitGit) {
            this.log('Initializing git-repository...');
            child_process.exec(`cd ${workingDir} && git init && git add . && git commit -m "initial commit"`, (errorGit, stdoutGit, stderrGit) => {
                this.log(stdoutGit);
                this.log(stderrGit);
            });
        }

    });
  }

  copyDirectory(src: string, dest: string, projectName: string) {
    fs.mkdirSync(dest);
    const files = fs.readdirSync(src);
    for (const file of files) {
      if (fs.lstatSync(path.join(src, file)).isDirectory()) {
        this.copyDirectory(path.join(src, file), path.join(dest, file), projectName);
      } else {
        this.copyFile(path.join(src, file), path.join(dest, file), projectName);
      }
    }
  }

  copyFile(src: string, dest: string, projectName: string) {
    if (src.endsWith('package.json') || src.endsWith('index.html')) {
      let file = fs.readFileSync(src, 'utf8');
      file = file.replace('###template-name###', projectName);
      fs.writeFileSync(dest, file);
    } else {
        fs.copyFileSync(src, dest);
    }
    this.log(`Created file: ${dest}`);
  }
}
