const shell = require('shelljs');
const chalk = require('chalk');

function warning(msg) {
    console.log(chalk.yellow(`⚠ ${msg}`));
}
const res = shell.exec('git status', { silent: true });
if (!res.stdout.includes('nothing to commit') || res.stdout.includes('use "git push"')) {
    return warning('检测到未提交的代码，请先将代码提交并push到远程后再发布');
}
let { stdout } = shell.exec('git symbolic-ref --short -q HEAD');
stdout = stdout.replace(/\s|[\r\n]/g, '');
if (stdout === 'master' || stdout === 'develop') {
    shell.exec('npm publish --registry http://npm.shandiantech.com');
} else {
    warning(`只能在develop或master分支发布,当前分支：${stdout}`);
}
